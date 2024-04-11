import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new mongoose.Schema(
    {   
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        duration: {
            type: Number,
        },
        videofile: {
            type: String, //cloudnary url
            required: true,
        }, 
        thumbnail: {
            type: String, // cloudnary url
            required: true
        }, 
        view: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true
        }, 
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }, 
    {
        timestamps: true
    }
)

VideoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", VideoSchema)