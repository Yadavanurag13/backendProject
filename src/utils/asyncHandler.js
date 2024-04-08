const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}
export {asyncHandler}

//          This was try cath method
//const asyncHandler = () => {}

//when we have to pas function in another function we do like it
//const asyncHandler = (func) => {(func) => {}}

//we remove of the {} for standart practice
//const asyncHandler = (func) => () => {}





/*
const asyncHandler = (fn) => async(err, req, res, next) => {
    try {
        await fn(err, req, res, next)
    } catch (err) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}*/