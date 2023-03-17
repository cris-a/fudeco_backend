import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: '../../../frontend/public/files',
//   filename: (req, file, cb) => {
//     let extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
//     cb(null, Date.now() + extension);
//   },
// });

// const upload = multer({
//   storage,
// }).single('file');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage,
// }).single('file'); // 5mb

// export default upload;
