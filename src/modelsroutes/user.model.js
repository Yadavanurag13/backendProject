import mongoose, {Schema} from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            index: true,
            trim: true
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullname: {
            type: String, 
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,//cloudnary url
            required: true,
        },
        coverimage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String, 
            required: [true, 'Password is required'],
        },
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
)

//this method will encrypt the password
userSchema.pre("save", async function (next){
    if(this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
    return next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_SECRET
        }
    )
}
userSchema.methods.generateRefereshToken = function(){
    return Jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_SECRET
        }
    )
}

export const User = mongoose.model("User", userSchema)
