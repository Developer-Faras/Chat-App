// All Login Realeated Functions
const GetInboxPage = (req, res, next) => {
    // Set Status
    res.status(200);

    res.render('inbox');
}





module.exports = {
    GetInboxPage
}