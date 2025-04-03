import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IGoal extends Document {
  title: string;
  description: string;
  userId: Types.ObjectId;
  stake: number;
  deadline?: Date;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema<IGoal> = new Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'User ID is required'] 
  },
  stake: { 
    type: Number, 
    required: [true, 'Stake amount is required'],
    min: [0, 'Stake amount cannot be negative'] 
  },
  deadline: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field on save
GoalSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Goal: Model<IGoal> = mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);
export default Goal; 