import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

//receving data or request
const apiReq =async(endpoint,username)=>{
  try{
 const rqst = await axios.get(`${API_BASE_URL}${endpoint}`,{
  params: { Username:username},
  
  headers: { "Content-Type": "application/json",
   },
 
 })
//  console.log("API response",rqst.data)
 return rqst.data;
 
  }catch(error){
    console.log("API Error fetching users data:", error.message);
   
  }
  
}
// Sending data or POST request
const apiResponse = async (endpoint, userData) => {
  const isFormData = userData instanceof FormData;
  
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, userData, {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    }) 

    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.message)
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      throw new Error("No response from the server.");
    }
  }
};

export default apiResponse;
export {apiReq};