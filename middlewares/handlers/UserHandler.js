// All Login Realeated Functions
const GetUserPage = (req, res, next) => {
    // Set Status
    res.status(200);

    res.render('users');
}





module.exports = {
    GetUserPage
}