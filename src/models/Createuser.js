import mongoose from 'mongoose';
const AutoIncrement = (await import("mongoose-sequence")).default(mongoose);


const Createuser = new mongoose.Schema(
    {
      
      Username: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      Password: {
        type: String,
        required: true,
        minlength: 6,
      },
      Email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      },
      role:{
        type:String,
        required:true,
        enum :["Admin","user"],
        default:"user",
      }
    },
    { timestamps: true } // Includes createdAt and updatedAt
  );

  Createuser.plugin(AutoIncrement, { inc_field: "userid" });
  
  const User = mongoose.model("user", Createuser);
  export default User;
  