class ApiResponse {
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode,//http status code of the response
        this.data = data,//Data payload of the response
        this.message = message//optimal message describing the response(default: "success")
        this.success = statusCode < 400//Boolean flag indicating whether the response is successful(Status code < 400)
    }
}