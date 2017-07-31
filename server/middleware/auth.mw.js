exports.isLoggedIn = function(req, res, next) {
    if (req.user) { //set by passport, links the session to logged in user 
        next(); //let them through 
    } else {
        res.sendStatus(401); //we don't know you. unauthorized 
    }
}

exports.isAdmin = function(req, res, next) {
    if (req.user.role === 'admin') { //needs to go through isLoggedIn before you call this because it's only called on users 
        next(); //you're an admin, go on through
    } else {
        res.sendStatus(403); //I know you and you don't belog here. forbidden
    }
}

exports.canUpdateUser = function (req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else if (req.params.id == req.user.id) {
        //get user to update from database, then:
            next();
        } else { //not the same team
            res.sendStatus(403);
        }
    } //not admin or manager


//these two will the same for many projects
//all mw has 3 params
