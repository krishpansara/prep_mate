import mongoose, { Document, Schema, Model } from 'mongoose';

export type GoalType = 'faang' | 'startup' | 'switch' | 'upskill';
export type LevelType = 'beginner' | 'intermediate' | 'advanced';

export interface IOnboarding extends Document {
  userId: mongoose.Types.ObjectId;
  goal: GoalType;
  level: LevelType;
  topics: string[]; // slugs e.g. ['dsa', 'system-design']
  createdAt: Date;
  updatedAt: Date;
}

const onboardingSchema = new Schema<IOnboarding>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    goal: {
      type: String,
      enum: ['faang', 'startup', 'switch', 'upskill'],
      required: true,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    topics: [{ type: String }],
  },
  { timestamps: true }
);

export const Onboarding: Model<IOnboarding> = mongoose.model<IOnboarding>(
  'Onboarding',
  onboardingSchema
);
