import { Suspense } from 'react';
import Image from 'next/image';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="p-8 w-full max-w-md border border-gray-100 rounded-xl bg-surface">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Evolveacademy" width={64} height={64} className="mx-auto mb-4" priority />
          <h1 className="text-2xl font-bold text-base">Evolveacademy</h1>
          <p className="text-text mt-2">Entre na sua conta</p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
