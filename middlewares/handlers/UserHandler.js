// All User Realeated Functions
const createHttpError = require("http-errors");
const Uploader = require("../helpers/Uploader");
const USER = require("../../models/UserModel");

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
const AddNewUser = async (req, res, next) => {
    try {
        let userData = {
            ...req.body,
            avatar: req.files.length > 0 ? req.files[0].filename : ''
        }

        const newUser = new USER(userData);
        await newUser.save();

        res.status(201).json({
            status: true,
            code: 200,
            msg: 'User Created Successfully',
            // data: newUser
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                custom: {
                    msg: 'Unknown Error Occourd'
                }
            }
        })
    }
};





module.exports = {
    GetUserPage,
    AvatarUpload,
    AddNewUser
}