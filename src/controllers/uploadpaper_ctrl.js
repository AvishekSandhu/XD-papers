import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.mongo_url;

// Validate environment variable
if (!mongoURI) {
  console.error('❌ MONGO_URL environment variable is not set');
  process.exit(1);
}

// Allowed file types
const allowedFileTypes = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// File size limit (10MB)
const maxFileSize = 10 * 1024 * 1024;

// Use memory storage for multer
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: maxFileSize
  }
});

// ✅ Upload controller with manual GridFS handling
const uploadpaper_ctrl = async (req, res) => {
  try {
    // Use multer to handle the file upload to memory
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error("❌ Multer error:", err.message);
        
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ 
            message: "File too large", 
            error: `File size must be less than ${maxFileSize / (1024 * 1024)}MB` 
          });
        }
        
        return res.status(500).json({ 
          message: "Upload failed", 
          error: err.message 
        });
      }

      if (!req.file) {
        return res.status(400).json({ 
          message: "No file uploaded",
          error: "Please select a file to upload"
        });
      }

      // Validate file type
      if (!allowedFileTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ 
          message: "Invalid file type", 
          error: `File type ${req.file.mimetype} is not allowed. Allowed types: ${allowedFileTypes.join(', ')}` 
        });
      }

      try {
        // Get GridFS bucket
        const bucket = new GridFSBucket(mongoose.connection.db, {
          bucketName: 'uploads'
        });

        // Create filename
        const timestamp = Date.now();
        const sanitizedOriginalName = req.file.originalname
          .replace(/[^a-zA-Z0-9.-]/g, '_')
          .replace(/_{2,}/g, '_');
        const filename = `${timestamp}-${sanitizedOriginalName}`;

        // Create upload stream
        const uploadStream = bucket.openUploadStream(filename, {
          metadata: {
            board: req.body.board || '',
            branch: req.body.branch || '',
            subjectName: req.body.subjectName || '',
            subjectCode: req.body.subjectCode || '',
            semester: req.body.semester || '',
            originalName: req.file.originalname,
            uploadDate: new Date(),
            contentType: req.file.mimetype,
            fileSize: req.file.size
          }
        });

        // Handle upload events
        uploadStream.on('error', (error) => {
          console.error('❌ GridFS upload error:', error);
          return res.status(500).json({
            message: "Failed to save file to database",
            error: error.message
          });
        });

        uploadStream.on('finish', () => {
          console.log("✅ Uploaded to GridFS:", filename);
          return res.status(200).json({
            message: "File uploaded successfully",
            file: {
              id: uploadStream.id,
              filename: filename,
              contentType: req.file.mimetype,
              metadata: uploadStream.options.metadata,
              size: req.file.size
            }
          });
        });

        // Write file buffer to GridFS
        uploadStream.end(req.file.buffer);

      } catch (gridfsError) {
        console.error('❌ GridFS error:', gridfsError);
        return res.status(500).json({
          message: "Failed to process file upload",
          error: gridfsError.message
        });
      }
    });

  } catch (error) {
    console.error('❌ Controller error:', error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

export default uploadpaper_ctrl;
