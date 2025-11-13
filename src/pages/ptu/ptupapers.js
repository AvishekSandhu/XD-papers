import React, { useState } from "react";
import "../../style/ptupapers.css";

const Ptupapers = () => {
  const [op, setop] = useState();

  const handleOption = (e) => {
    const { value } = e.target;
    setop(value);
  };
  return (
    <>
      <h1>Select Branch</h1>
      <div className="main-container">
        <div className="firstcontainer">
          {/* B.Tech/BCA Dropdown */}

          <div className="option-box1">
            <h3>Bachelor of Technology(B.Tech)/BCA</h3>
            <select id="slct1" value={op} onChange={handleOption}>
              <option value="" disabled selected>
                Choose an option
              </option>
              <option value="CSE"> Computer Science Engineering(CSE)</option>
              <option value="ME">Mechanical Engineering(ME)</option>
              <option value="EE">Electrical Engineering(EE)</option>
              <option value="CE">Civil Engineering(CE)</option>
              <option value="ECE">
                Electronics and Communication Engineering(ECE)
              </option>
              <option value="BCA">
                Bachelor of Computer Applications(BCA)
              </option>
            </select>
            <h2 className="slctedop">Selected:{op}</h2>
          </div>

          <div className="option-box2">
            <h3>Bachelor of Science </h3>
            <select id="slct2" value={op} onChange={handleOption}>
              <option value="" disabled selected>
                Choose an option
              </option>
              <option value="Physics">Physics </option>
              <option value="Chemistry">Chemistry </option>
              <option value="Math">Math </option>
            </select>
          </div>
        </div>

        <div className="secondcontainer">
          <div className="course1">
            <h3>Bachelor of Business Administration(BBA)</h3>
          </div>
          <div className="couese2">
            <h3>Bachelor of Hotel Management and Catering Technology(BHMCT)</h3>
          </div>
          <div className="couese3">
            <h3>Bachelor of Pharmacy(BPHARMACY)</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ptupapers;
