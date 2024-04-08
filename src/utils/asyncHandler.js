const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .reject((err) => next(err))
    }
}


export {asyncHandler}

//const asyncHandler = () => {}

//const asyncHandler = (function) => {() => {}}

//const asyncHandler = (function) => async() => {}

//higherorder function


//      **** This is a wrapper so that we can use this to execute our fucntion

// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

//may be kisi production me aise n mile