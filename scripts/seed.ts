import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Recreate all the schemas for seeding
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['owner', 'professor', 'student'], default: 'student' },
  avatar: String,
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  phone: String,
  birthDate: Date,
  address: String,
  emergencyContact: String,
  emergencyPhone: String,
}, { timestamps: true });
const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

const StudentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  startDate: { type: Date, default: Date.now },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  status: { type: String, enum: ['active', 'inactive', 'at_risk', 'locked'], default: 'active' },
  riskReason: String,
  lastAttendance: Date,
}, { timestamps: true });
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  durationDays: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);

const SubscriptionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
  amountPaid: { type: Number, required: true },
}, { timestamps: true });
const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  status: { type: String, enum: ['lead', 'contacted', 'interested', 'enrolled', 'lost'], default: 'lead' },
  source: String,
  notes: String,
  convertedToStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
}, { timestamps: true });
const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing test data (optional, uncomment if you want to reset)
    // await User.deleteMany({});
    // await Profile.deleteMany({});
    // await Student.deleteMany({});
    // await Plan.deleteMany({});
    // await Subscription.deleteMany({});
    // await Lead.deleteMany({});

    const existingOwner = await User.findOne({ role: 'owner' });
    if (existingOwner) {
      console.log('Owner user already exists');
    } else {
      const owner = await User.create({
        email: 'admin@evolveacademy.com',
        password: 'admin123',
        name: 'Administrador',
        role: 'owner',
      });
      console.log('Owner user created successfully!');
      console.log('Email:', owner.email);
      console.log('Password: admin123');
      console.log('⚠️  Change this password immediately after first login!');
    }

    // Create sample plans
    const existingPlans = await Plan.countDocuments();
    if (existingPlans === 0) {
      await Plan.create([
        { name: 'Mensal', description: 'Plano mensal', price: 99.90, durationDays: 30 },
        { name: 'Trimestral', description: 'Plano trimestral com desconto', price: 269.70, durationDays: 90 },
        { name: 'Anual', description: 'Plano anual com super desconto', price: 999.00, durationDays: 365 }
      ]);
      console.log('Sample plans created!');
    }

    // Create sample leads
    const existingLeads = await Lead.countDocuments();
    if (existingLeads === 0) {
      await Lead.create([
        { name: 'João Silva', email: 'joao@email.com', phone: '(11) 98765-4321', status: 'lead', source: 'Instagram' },
        { name: 'Maria Oliveira', phone: '(11) 91234-5678', status: 'contacted', source: 'Indicação' },
        { name: 'Pedro Santos', email: 'pedro@email.com', status: 'interested', source: 'Google' },
        { name: 'Ana Costa', status: 'enrolled', source: 'Facebook' },
        { name: 'Carlos Pereira', status: 'lost', source: 'Instagram' }
      ]);
      console.log('Sample leads created!');
    }

    // Create sample student
    const existingStudents = await Student.countDocuments();
    if (existingStudents === 0) {
      const samplePlan = await Plan.findOne();
      if (samplePlan) {
        const sampleUser = await User.create({
          email: 'aluno@teste.com',
          password: '123456',
          name: 'Aluno Teste',
          role: 'student'
        });
        const sampleStudent = await Student.create({
          userId: sampleUser._id,
          planId: samplePlan._id,
          status: 'active',
          lastAttendance: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        });
        const sampleProfile = await Profile.create({ userId: sampleUser._id, phone: '(11) 99999-9999' });
        const now = new Date();
        const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        await Subscription.create({
          studentId: sampleStudent._id,
          planId: samplePlan._id,
          startDate: now,
          endDate: endDate,
          status: 'active',
          amountPaid: samplePlan.price
        });
        console.log('Sample student created!');
      }
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
