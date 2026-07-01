import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';
import dbConnect from '@/lib/db/mongoose';
import { User, Profile, HealthRecord, Student } from '@/lib/db/models';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'owner' && session.user.role !== 'professor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const students = await Student.find({})
      .populate({
        path: 'userId',
        select: 'name email avatar',
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'owner' && session.user.role !== 'professor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const data = await request.json();

    const user = await User.create({
      email: data.email,
      password: data.password,
      name: data.name,
      role: 'student',
      avatar: data.avatar,
    });

    await Profile.create({
      userId: user._id,
      phone: data.phone,
      birthDate: data.birthDate,
      address: data.address,
      emergencyContact: data.emergencyContact,
      emergencyPhone: data.emergencyPhone,
    });

    await HealthRecord.create({
      userId: user._id,
      comorbidities: data.comorbidities,
      medications: data.medications,
      physicalRestrictions: data.physicalRestrictions,
      injuries: data.injuries,
      consentGiven: data.consentGiven,
    });

    await Student.create({
      userId: user._id,
      startDate: data.startDate,
      status: 'active',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
