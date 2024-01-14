// All Login Realeated Functions
const GetLoginPage = (req, res, next) => {
    // Set Status
    res.status(200);
    
    res.render('index');
}





module.exports = {
    GetLoginPage
}