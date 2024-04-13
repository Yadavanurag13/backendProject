import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //step for registration 
    //get user details form user 
    //validation - notempty
    //check is useralready exist    by username and email
    //check for images
    //check for avatar
    //upload them to cloudinary 
    //check avatar is successfully uploaded by cloudinary and multer

    //create userobject -- create entry in db
    //remove password and refresh token field form response
    //check for usercreation 
    //return response nhi hua hai to error send kardo


    //* geting user details */
    const {fullname, email, username, password} = await req.body

    // if(fullname === "") {
    //     throw new ApiError(400, "fullname is required")
    // }

    //some is one of the method to go for array we can user map also
    
    /* checking validation of the */
    if (
        [fullname, email, username, password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All field is required")
    }


    //check use already exist of not

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username exist")
    }

    //check for coverimage and avatar is locally provided or not

    //multer gives local path of the avatar
    const avatarLocalPath = req.files?.avatar[0]?.path

    const coverImageLocalPath = req.files?.coverfile[0]?.path


    if(!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    //uploading image on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverimage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    //database entry
    const user = await User.create({
        fullname, 
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    //check user is created && have to delete password and refreshtoken
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registring user")
    }

    return res.status(201).json (
        new ApiResponse(201, createdUser, "User registered Successfully")
    )
})


export {registerUser}