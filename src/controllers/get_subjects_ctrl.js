import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

// ✅ Get available subjects controller
const get_subjects_ctrl = async (req, res) => {
  try {
    const { board, branch } = req.query;

    // Get GridFS bucket
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    // Build query
    const query = {};
    if (board) {
      query['metadata.board'] = { $regex: board, $options: 'i' };
    }
    if (branch) {
      query['metadata.branch'] = { $regex: branch, $options: 'i' };
    }

    // Find files and extract unique subjects
    const files = await bucket.find(query).toArray();

    // Extract unique subjects with their codes
    const subjectsMap = new Map();
    
    files.forEach(file => {
      if (file.metadata?.subjectName && file.metadata?.subjectCode) {
        const key = `${file.metadata.subjectName}|${file.metadata.subjectCode}`;
        if (!subjectsMap.has(key)) {
          subjectsMap.set(key, {
            name: file.metadata.subjectName,
            code: file.metadata.subjectCode,
            count: 1
          });
        } else {
          subjectsMap.get(key).count++;
        }
      }
    });

    // Convert map to array and sort by name
    const subjects = Array.from(subjectsMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );

    console.log(`✅ Found ${subjects.length} unique subjects for board: ${board}, branch: ${branch}`);

    return res.status(200).json({
      message: "Subjects retrieved successfully",
      subjects: subjects,
      count: subjects.length
    });

  } catch (error) {
    console.error('❌ Get subjects error:', error);
    return res.status(500).json({
      message: "Failed to retrieve subjects",
      error: error.message
    });
  }
};

export default get_subjects_ctrl; 