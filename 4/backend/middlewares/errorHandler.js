const errorHandler = (err, req, res, next) =>{
    console.log(err);
    let status = 500
    let message = "Internal Server Error"

    switch (err.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError" :
            status = 400
            message = err.errors[0].message
            break;
        
        case "Invalid input":
            status = 400
            message = `${err.value} cannot be empty`
            break;

        case "Invalid username/password":
            status = 401
            message = err.name
            break;

        case "Unauthorized":
            status= 401
            message = "Please Login First"
            break;
        default:
            break;
    }

    res.status(status).json({message})
}

module.exports = errorHandler