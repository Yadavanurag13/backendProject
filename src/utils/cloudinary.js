import { v2 as cloudinary} from "cloudinary";
import fs from "fs"

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_APISECRET
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            return null;
        }
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })
        //file has been uploaded successfully
        console.log("File is uploaded on cloudinary");
    } catch (error) {
        //incase of error file has not been uploaded on cloudinary
        // it has been on our server so better to delete it

        fs.unlink(localFilePath) //remove locally saved temp file
        
        return null;
    }
}


// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

export {uploadOnCloudinary}