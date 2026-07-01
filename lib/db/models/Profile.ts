import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  phone?: string;
  birthDate?: Date;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

const ProfileSchema: Schema<IProfile> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    address: {
      type: String,
    },
    emergencyContact: {
      type: String,
    },
    emergencyPhone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
