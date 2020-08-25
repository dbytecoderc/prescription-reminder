import mongoose from 'mongoose';
const {
  Schema
} = mongoose;

// Create Schema
const PrscriptionSchema = new Schema({
  usage: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  taken: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.Mixed,
    ref: 'users',
  },
});

export default mongoose.model('Prescription', PrscriptionSchema);