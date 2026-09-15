import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ path: '.env.local' });

async function seed() {
  const { supabase } = await import('../lib/supabase');

  try {
    const { data: existingOwner } = await supabase.from('users').select('id').eq('role', 'owner').maybeSingle();

    if (existingOwner) {
      console.log('Owner user already exists');
    } else {
      const password = await bcrypt.hash('admin123', 10);
      const { data: owner, error } = await supabase
        .from('users')
        .insert({ email: 'admin@evolveacademy.com', password, name: 'Administrador', role: 'owner' })
        .select()
        .single();

      if (error) throw error;

      console.log('Owner user created successfully!');
      console.log('Email:', owner.email);
      console.log('Password: admin123');
      console.log('⚠️  Change this password immediately after first login!');
    }

    console.log('Seeding complete! Run "npm run seed:course" next to populate the courses.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
