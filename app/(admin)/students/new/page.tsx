'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const medicationSchema = z.object({
  name: z.string().min(1, 'Nome do medicamento é obrigatório'),
  notes: z.string().optional(),
});

const studentSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  avatar: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  comorbidities: z.string().optional(),
  medications: z.array(medicationSchema).optional(),
  physicalRestrictions: z.string().optional(),
  injuries: z.string().optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: 'É necessário o consentimento do aluno',
  }),
});

type StudentFormData = z.infer<typeof studentSchema>;

export default function NewStudentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      medications: [],
      consentGiven: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medications',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: base64 }),
        });
        const data = await res.json();
        setValue('avatar', data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: StudentFormData) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/admin/students');
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/students" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para alunos
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Novo Aluno</h1>
        <p className="text-slate-600 mt-1">Cadastre um novo aluno na academia</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Dados Pessoais</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Foto do Aluno</label>
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <Image src={imagePreview} alt="Preview" width={96} height={96} className="object-cover" />
                      ) : (
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="btn-secondary cursor-pointer inline-block"
                      >
                        Escolher arquivo
                      </label>
                      <p className="text-xs text-slate-500 mt-2">PNG, JPG até 5MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo *</label>
                  <input type="text" {...register('name')} className="input-field" placeholder="Nome do aluno" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                  <input type="email" {...register('email')} className="input-field" placeholder="email@exemplo.com" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Senha *</label>
                  <input type="password" {...register('password')} className="input-field" placeholder="••••••••" />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                  <input type="tel" {...register('phone')} className="input-field" placeholder="(00) 00000-0000" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data de Nascimento</label>
                  <input type="date" {...register('birthDate')} className="input-field" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data de Início *</label>
                  <input type="date" {...register('startDate')} className="input-field" />
                  {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Endereço</label>
                  <input type="text" {...register('address')} className="input-field" placeholder="Rua, Número, Bairro, Cidade" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contato de Emergência</label>
                  <input type="text" {...register('emergencyContact')} className="input-field" placeholder="Nome do contato" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone de Emergência</label>
                  <input type="tel" {...register('emergencyPhone')} className="input-field" placeholder="(00) 00000-0000" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Ficha de Saúde (Anamnese)</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Comorbidades / Condições de Saúde</label>
                  <textarea
                    {...register('comorbidities')}
                    className="input-field min-h-[100px]"
                    placeholder="Descreva qualquer condição de saúde pré-existente (ex: diabetes, hipertensão, etc.)"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-slate-700">Medicações Controladas</label>
                    <button
                      type="button"
                      onClick={() => append({ name: '', notes: '' })}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Adicionar medicamento
                    </button>
                  </div>

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Nome do Medicamento</label>
                            <input
                              type="text"
                              {...register(`medications.${index}.name` as const)}
                              className="input-field text-sm"
                              placeholder="Ex: Paracetamol"
                            />
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-slate-700 mb-1">Observações</label>
                              <input
                                type="text"
                                {...register(`medications.${index}.notes` as const)}
                                className="input-field text-sm"
                                placeholder="Dosagem, horário, etc."
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Restrições Físicas</label>
                  <textarea
                    {...register('physicalRestrictions')}
                    className="input-field min-h-[80px]"
                    placeholder="Descreva qualquer restrição física (ex: não pode agachar, problema no joelho, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lesões Anteriores / Atuais</label>
                  <textarea
                    {...register('injuries')}
                    className="input-field min-h-[80px]"
                    placeholder="Descreva lesões passadas ou atuais"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('consentGiven')}
                      className="mt-1 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                    />
                    <span className="text-sm text-slate-700">
                      Declaro que o aluno concorda com o armazenamento destes dados de saúde para fins de acompanhamento
                      durante os treinos, em conformidade com a LGPD.
                    </span>
                  </label>
                  {errors.consentGiven && (
                    <p className="text-red-500 text-sm mt-2">{errors.consentGiven.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Ações</h3>
              <div className="space-y-3">
                <button type="submit" disabled={isLoading} className="btn-primary w-full">
                  {isLoading ? 'Cadastrando...' : 'Cadastrar Aluno'}
                </button>
                <Link href="/admin/students" className="btn-secondary w-full text-center">
                  Cancelar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
