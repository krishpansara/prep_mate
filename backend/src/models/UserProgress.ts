import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  completedConcepts: mongoose.Types.ObjectId[];
  progressPercent: number; // 0–100
  lastSessionNote?: string;
  updatedAt: Date;
}

const userProgressSchema = new Schema<IUserProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    completedConcepts: [{ type: Schema.Types.ObjectId, ref: 'Concept' }],
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    lastSessionNote: { type: String },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

// One progress record per (user, topic) pair
userProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

export const UserProgress: Model<IUserProgress> = mongoose.model<IUserProgress>(
  'UserProgress',
  userProgressSchema
);
