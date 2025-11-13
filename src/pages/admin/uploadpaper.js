import React, { useState } from 'react';
import "../../style/admin/uploadpaper.css";
import apiResponse from '../../controllers/apiControl.js';

const Uploadpaper = () => {
  const [formData, setFormData] = useState({
    board: '',
    branch: '',
    subjectName: '',
    subjectCode: '',
    semester: '',
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append file
    if (file) {
      data.append("file", file);
    }

    // Optional: Debug output
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const res = await apiResponse('/uploadpaper', data);
      console.log("✅ Upload success:", res);
      alert("Upload successful!");
    } catch (error) {
      console.error("❌ Upload failed:", error.message);
      alert("Upload failed");
    }
  };

  return (
    <div className="main-up">
      <form onSubmit={handleSubmit}>
        <h2>Upload Paper</h2>

        <label className='sl'>Select Course</label>
        <select name="board" value={formData.board} onChange={handleChange} required>
          <option value="" disabled>Choose</option>
          <option value="PTU">PTU</option>
          <option value="DTU">DTU</option>
          <option value="CBSE">CBSE</option>
          <option value="RAILWAY NTPC">RAILWAY NTPC</option>
        </select>

        <label>Branch
          <input
            name="branch"
            placeholder='Enter the branch'
            value={formData.branch}
            onChange={handleChange}
            required
          />
        </label>

        <label>Enter Subject
          <input
            name="subjectName"
            placeholder='Enter subject'
            value={formData.subjectName}
            onChange={handleChange}
            required
          />
        </label>

        <label>Enter Subject Code (if available)
          <input
            name="subjectCode"
            placeholder='Enter subject Code'
            value={formData.subjectCode}
            onChange={handleChange}
          />
        </label>

        <label>Enter Subject Sem
          <input
            name="semester"
            placeholder='Enter subject Sem'
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </label>

        <input
          type="file"
          name="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Upload Paper</button>
      </form>
    </div>
  );
};

export default Uploadpaper;
