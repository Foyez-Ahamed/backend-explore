import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
   //get user details from frontend,
   //validation -- not empty, 
   //check user already exist -- username/email,
   //check for images, check for avatar
   //upload them to cloudinary
   //create user object -- create entry in db 
   //remove password and refresh token filed from response 
   //check for use creation 
   //return response 

   const {username, fullName, email, password} = req.body
   console.log("email :", email);

   if(
    [username, fullName, email, password].some((filed) => filed?.trim() === "")
   ){
    throw new ApiError(400, "All field are required")
   }

   const existUser = User.findOne({
    $or: [{ username }, { email }]
   })

   if(existUser){
     throw new ApiError(400, "user already exist")
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw ApiError(400, "Avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw ApiError(400, "Avatar file is required")
   }

  const user = await User.create({
     fullName,
     avatar : avatar.url,
     coverImage : coverImage?.url || "",
     email,
     password,
     username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
)

})

export {registerUser}