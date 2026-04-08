import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITopic extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const topicSchema = new Schema<ITopic>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'category' },
    color: { type: String, default: '#0053db' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

topicSchema.index({ order: 1 });

export const Topic: Model<ITopic> = mongoose.model<ITopic>('Topic', topicSchema);
