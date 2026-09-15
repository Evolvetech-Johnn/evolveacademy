export type UserRole = 'owner' | 'professor' | 'student';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar: string | null;
  created_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number | null;
  is_published: boolean;
  created_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  position: number;
  title: string;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  module_id: string;
  position: number;
  slug: string;
  title: string;
  objetivo: string;
  conceito: string;
  aprofundamento: string;
  exemplo_pratico: string;
  contraexemplo: string;
  erro_comum: string;
  exercicio: string;
  para_ir_alem: string;
  is_free_preview: boolean;
  created_at: string;
}

export type EnrollmentStatus = 'active' | 'cancelled';

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: EnrollmentStatus;
  enrolled_at: string;
}
