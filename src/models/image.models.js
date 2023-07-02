import mongoose from 'mongoose';

const imageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Image = mongoose.model('storeimgs', imageSchema);

export default Image;