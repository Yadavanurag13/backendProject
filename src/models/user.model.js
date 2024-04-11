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

//this method will encrypt the password and return next for the middleware
userSchema.pre("save", async function (next){
    if(this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
    return next();
})

//password authentication which means the password that i am getting
//is matching with passwrod stored in database
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}


//we need to generate token
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

//token generation for refresh and it's generation is same as accestoken genertion
//this requried less payload
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
