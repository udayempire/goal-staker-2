import mongoose, { Document, Model, Schema } from 'mongoose';

export type TransactionType = 'stake' | 'reward' | 'penalty';

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  goalId?: mongoose.Types.ObjectId;
  amount: number;
  type: TransactionType;
  transactionDate: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  goalId: { type: Schema.Types.ObjectId, ref: 'Goal' },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['stake', 'reward', 'penalty'], required: true },
  transactionDate: { type: Date, default: Date.now },
});

const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default Transaction;
