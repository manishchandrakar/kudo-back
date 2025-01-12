import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // The user who liked the Kudo
      required: true,
    },
    kudo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kudo', // The Kudo that was liked
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Like', likeSchema);
