import mongoose from 'mongoose';

const kudoSchema = new mongoose.Schema(
  {
    giver: {
      type: String,
      required: true,
    },
    
    badge: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Kudo', kudoSchema);
