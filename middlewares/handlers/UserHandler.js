// All User Realeated Functions
const createHttpError = require("http-errors");
const Uploader = require("../helpers/Uploader");

// Get User Page
const GetUserPage = (req, res, next) => {
    // Set Status
    res.status(200);

    res.render('users');
}


// Avatar Uploader
const AvatarUpload = async (req, res, next) => {
    const upload = Uploader('avatars', ['image/jpg', 'image/png', 'image/jpeg'], 5);
    
    // Call The Uploader Middleware Function
    upload.any()(req, res, (error) => {
        if(error){
            res.status(500).json({
                error: {
                    avatar: {
                        msg: error.message
                    }
                }
            })
        }else{
            next();
        }
    });
}


// Add New User
const AddNewUser = (req, res, next) => {
    console.log({
        files: req.files,
        file: req.file,
        body: req.body
    })
    res.send('asd');
}




module.exports = {
    GetUserPage,
    AvatarUpload,
    AddNewUser
}