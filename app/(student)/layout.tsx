import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login?callbackUrl=%2Fmeus-cursos');
  }

  return <div className="min-h-screen bg-surface">{children}</div>;
}
