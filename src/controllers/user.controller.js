import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js"

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


    const {fullname, email, username, password} = req.body

    // if(fullname === "") {
    //     throw new ApiError(400, "fullname is required")
    // }

    //some is one of the method to go for array we can user map also

    if (
        [fullname, email, username, password].some((field) =>
        field?.trim === "")
    ) {
        throw new ApiError(400, "All field is required")
    }



    console.log("password :", password)
})


export {registerUser}