import mongoose, { Schema } from 'mongoose';

const CommitmentSchema = new Schema(
  {
    commitment_id: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    commitment: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Commitment || mongoose.model('Commitment', CommitmentSchema);

