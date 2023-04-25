import { v2 as cloudinary } from 'cloudinary';

const buscar = (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const buscando = new cloudinary.search().sort_by('');
  try {
    res.status(200).json(buscando);
  } catch (error) {
    console.log(error);
  }
};

export { buscar };
