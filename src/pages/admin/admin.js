import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiReq } from "../../controllers/apiControl.js";
import "../../style/admin.css"

const Admin = () => {

  const [userlist, setUserlist] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role,setRole] = useState();


  useEffect(() => {
    // Get user data from session storage
    const storedUserData = JSON.parse(sessionStorage.getItem("userData"));

    
    // console.log(storedUserData)

    if (!storedUserData || !storedUserData.Username) {
     
      setLoading(false);
      return;
    }

    setUserData(storedUserData);
    setRole(storedUserData.role)
   
  }, []);

 

  useEffect(() => {
    
    
    if (!userData ||role !== "Admin") {
      setLoading(false);
      return ;
        }

    const FetchUserlist = async () => {
      try {
        const data = await apiReq("/admin2",userData );
        // console.log("Fetched API data",data)

        if (Array.isArray(data)) {
          setUserlist(data);
        } else {
          console.error("API response is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUserlist([]);
      } finally {
        setLoading(false);
      }
    };

    FetchUserlist();
  }, [userData,role]);

  if (loading) return <p>Loading...</p>;

   if (role !== "Admin") {
    return <h2 style={{ color: "Black", textAlign: "center" }}>Access Denied. Admins Only.</h2>;
  }

  return (
    <div className="main-admin" >
      <h2>User List</h2>
      <table className="table"  border="0">
        <thead>
          <tr className="table-r">
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Join Date (MM/DD/YYYY)</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {userlist.length > 0 ? (
            userlist.map((user) => (
              <tr key={user._id}>
                <td>{user.Username}</td>
                <td>{user.Email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{user.userid}</td>
              </tr>
            ))
           
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="btn-edit">Edit Data</button>
      <Link to="/uploadpaper">
      <button className="btn-up">Upload Paper</button>
      </Link>
      
    </div>
  );
};

export default Admin;
