import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IMilestone extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  subtitle: string;
  createdAt: Date;
}

const milestoneSchema = new Schema<IMilestone>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

milestoneSchema.index({ userId: 1, createdAt: -1 });

export const Milestone: Model<IMilestone> = mongoose.model<IMilestone>(
  'Milestone',
  milestoneSchema
);
