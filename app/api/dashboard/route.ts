import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import dbConnect from '@/lib/db/mongoose';
import { Student, Subscription, Plan, Lead } from '@/lib/db/models';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'owner' && session.user.role !== 'professor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // --- Metrics ---

    // Total students
    const totalStudents = await Student.countDocuments();

    // Active students
    const activeStudents = await Student.countDocuments({ status: 'active' });

    // New students this month
    const newStudentsThisMonth = await Student.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Churn (students who became inactive/at_risk this month)
    const churnedThisMonth = await Student.countDocuments({
      $or: [{ status: 'inactive' }, { status: 'at_risk' }],
      updatedAt: { $gte: startOfMonth }
    });

    // Churn rate
    const churnRate = totalStudents > 0 ? ((churnedThisMonth / totalStudents) * 100).toFixed(1) : '0';

    // Revenue (active subscriptions this month)
    const activeSubscriptions = await Subscription.find({
      status: 'active',
      startDate: { $lte: now },
      endDate: { $gte: now }
    }).populate('planId');

    const monthlyRecurringRevenue = activeSubscriptions.reduce((sum, sub) => {
      // Calculate MRR based on plan price
      const plan = sub.planId as any;
      return sum + (plan ? plan.price : 0);
    }, 0);

    // --- CRM Funnel ---
    const funnelCounts = {
      lead: await Lead.countDocuments({ status: 'lead' }),
      contacted: await Lead.countDocuments({ status: 'contacted' }),
      interested: await Lead.countDocuments({ status: 'interested' }),
      enrolled: await Lead.countDocuments({ status: 'enrolled' }),
      lost: await Lead.countDocuments({ status: 'lost' })
    };

    // --- Alerts ---

    // Inactive students (no attendance in last 30 days)
    const inactiveAlertStudents = await Student.find({
      status: 'active',
      $or: [
        { lastAttendance: { $lt: thirtyDaysAgo } },
        { lastAttendance: { $exists: false } }
      ]
    }).populate('userId').limit(10);

    // Expiring subscriptions (next 7 days)
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expiringSubscriptions = await Subscription.find({
      status: 'active',
      endDate: { $gte: now, $lte: nextWeek }
    }).populate('studentId').populate('planId').limit(10);

    // Expired subscriptions
    const expiredSubscriptions = await Subscription.find({
      status: { $in: ['expired', 'active'] },
      endDate: { $lt: now }
    }).populate('studentId').populate('planId').limit(10);

    // Birthday this month
    const birthdayStudents: Array<{ id: string; name: string }> = []; // We'll add this when Profile schema has birthDate

    return NextResponse.json({
      metrics: {
        activeStudents,
        newStudentsThisMonth,
        churnRate,
        monthlyRecurringRevenue,
        totalStudents
      },
      funnel: [
        { name: 'Leads', value: funnelCounts.lead, color: '#3b82f6' },
        { name: 'Contatados', value: funnelCounts.contacted, color: '#60a5fa' },
        { name: 'Interessados', value: funnelCounts.interested, color: '#93c5fd' },
        { name: 'Matriculados', value: funnelCounts.enrolled, color: '#22c55e' },
        { name: 'Perdidos', value: funnelCounts.lost, color: '#ef4444' }
      ],
      alerts: {
        inactiveStudents: inactiveAlertStudents.map(s => ({
          id: s._id,
          name: (s.userId as any).name,
          email: (s.userId as any).email,
          lastAttendance: s.lastAttendance,
          daysSince: s.lastAttendance ? Math.floor((now.getTime() - new Date(s.lastAttendance).getTime()) / (1000 * 60 * 60 * 24)) : 'Nunca'
        })),
        expiringSubscriptions: expiringSubscriptions.map(s => ({
          id: s._id,
          studentName: (s.studentId as any)?.userId?.name || 'Aluno',
          planName: (s.planId as any)?.name || 'Plano',
          endDate: s.endDate,
          daysLeft: Math.ceil((new Date(s.endDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        })),
        expiredSubscriptions: expiredSubscriptions.map(s => ({
          id: s._id,
          studentName: (s.studentId as any)?.userId?.name || 'Aluno',
          planName: (s.planId as any)?.name || 'Plano',
          endDate: s.endDate,
          daysExpired: Math.floor((now.getTime() - new Date(s.endDate).getTime()) / (1000 * 60 * 60 * 24))
        })),
        birthdayStudents
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
