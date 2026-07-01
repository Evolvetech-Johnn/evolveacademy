'use client';

import { useEffect, useState } from 'react';
import {
  FunnelChart,
  Funnel,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';

interface DashboardData {
  metrics: {
    activeStudents: number;
    newStudentsThisMonth: number;
    churnRate: string;
    monthlyRecurringRevenue: number;
    totalStudents: number;
  };
  funnel: { name: string; value: number; color: string }[];
  alerts: {
    inactiveStudents: any[];
    expiringSubscriptions: any[];
    expiredSubscriptions: any[];
    birthdayStudents: any[];
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const metrics = data?.metrics || {
    activeStudents: 0,
    newStudentsThisMonth: 0,
    churnRate: '0',
    monthlyRecurringRevenue: 0,
    totalStudents: 0
  };
  const funnel = data?.funnel || [];
  const alerts = data?.alerts || {
    inactiveStudents: [],
    expiringSubscriptions: [],
    expiredSubscriptions: [],
    birthdayStudents: []
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Visão geral do seu negócio</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Alunos Ativos</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{metrics.activeStudents}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Novos este mês</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{metrics.newStudentsThisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Taxa de Churn</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{metrics.churnRate}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Receita MRR</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">R$ {metrics.monthlyRecurringRevenue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* CRM Funnel & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Funil de CRM</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel data={funnel} dataKey="value">
                  <LabelList position="right" fill="#0f172a" stroke="none" dataKey="name" />
                  {funnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6 overflow-y-auto max-h-[400px]">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Alertas
          </h2>
          <div className="space-y-3">
            {alerts.expiringSubscriptions.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="text-sm font-semibold text-amber-800 mb-1">Assinaturas vencendo em breve ({alerts.expiringSubscriptions.length})</h3>
                {alerts.expiringSubscriptions.slice(0, 3).map(sub => (
                  <p key={sub.id} className="text-xs text-amber-700">{sub.studentName} - {sub.daysLeft} dias restantes</p>
                ))}
              </div>
            )}
            {alerts.inactiveStudents.length > 0 && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="text-sm font-semibold text-orange-800 mb-1">Alunos inativos ({alerts.inactiveStudents.length})</h3>
                {alerts.inactiveStudents.slice(0, 3).map(s => (
                  <p key={s.id} className="text-xs text-orange-700">{s.name} - {s.daysSince} dias sem comparecer</p>
                ))}
              </div>
            )}
            {alerts.expiredSubscriptions.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-sm font-semibold text-red-800 mb-1">Assinaturas vencidas ({alerts.expiredSubscriptions.length})</h3>
                {alerts.expiredSubscriptions.slice(0, 3).map(sub => (
                  <p key={sub.id} className="text-xs text-red-700">{sub.studentName} - vencido há {sub.daysExpired} dias</p>
                ))}
              </div>
            )}
            {alerts.expiringSubscriptions.length === 0 && alerts.inactiveStudents.length === 0 && alerts.expiredSubscriptions.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Nenhum alerta no momento</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
