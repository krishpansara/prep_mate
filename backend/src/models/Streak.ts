import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IStreak extends Document {
  userId: mongoose.Types.ObjectId;
  currentDays: number;
  longestDays: number;
  lastActiveAt: Date;
  updatedAt: Date;
}

const streakSchema = new Schema<IStreak>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    currentDays: { type: Number, default: 0 },
    longestDays: { type: Number, default: 0 },
    lastActiveAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export const Streak: Model<IStreak> = mongoose.model<IStreak>('Streak', streakSchema);
