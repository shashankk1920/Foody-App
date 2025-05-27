import multer from "multer"
const storage = multer.memoryStorage();
const upload  = multer({
    storage:storage,
    limits:{
        fileSize: 8*1024*1024 ,// 8mb
    }
})
export default upload;