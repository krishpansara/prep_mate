import mongoose, { Document, Schema, Model } from 'mongoose';
import { Difficulty } from './Concept';

export interface IQuestion extends Document {
  _id: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  title: string;
  problemStatement: string;
  constraints?: string;
  example?: string;
  solution?: string;
  hint?: string;
  difficulty: Difficulty;
  concepts: string[]; // tag strings
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    title: { type: String, required: true, trim: true },
    problemStatement: { type: String, required: true },
    constraints: { type: String },
    example: { type: String },
    solution: { type: String },
    hint: { type: String },
    difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], default: 'MEDIUM' },
    concepts: [{ type: String }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

questionSchema.index({ topicId: 1, published: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ concepts: 1 });

export const Question: Model<IQuestion> = mongoose.model<IQuestion>('Question', questionSchema);
