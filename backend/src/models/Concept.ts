import mongoose, { Document, Schema, Model } from 'mongoose';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface IConcept extends Document {
  _id: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  summary: string;
  body: string; // Markdown
  difficulty: Difficulty;
  hasCode: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const conceptSchema = new Schema<IConcept>(
  {
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    summary: { type: String, required: true },
    body: { type: String, required: true },
    difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], default: 'MEDIUM' },
    hasCode: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

conceptSchema.index({ topicId: 1, published: 1 });

export const Concept: Model<IConcept> = mongoose.model<IConcept>('Concept', conceptSchema);
