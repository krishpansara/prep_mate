import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export type Role = 'LEARNER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'PENDING';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  avatarUrl?: string;
  status: UserStatus;
  emailVerified: boolean;
  verifyToken?: string;
  resetToken?: string;
  resetTokenExp?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['LEARNER', 'ADMIN'], default: 'LEARNER' },
    avatarUrl: { type: String },
    status: { type: String, enum: ['ACTIVE', 'BLOCKED', 'PENDING'], default: 'ACTIVE' },
    emailVerified: { type: Boolean, default: false },
    verifyToken: { type: String, select: false },
    resetToken: { type: String, select: false },
    resetTokenExp: { type: Date, select: false },
  },
  { timestamps: true }
);

// Never expose passwordHash / tokens in JSON
userSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(_doc: unknown, ret: Record<string, any>) {
    delete ret['passwordHash'];
    delete ret['verifyToken'];
    delete ret['resetToken'];
    delete ret['resetTokenExp'];
    return ret;
  },
});

userSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.passwordHash);
};

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
