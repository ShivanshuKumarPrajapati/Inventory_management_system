const User = require('./../models/user');

exports.getUserById = (req, res, next, id) => {
    User.find(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error:'User not FOUND'
            });
        }
        req.profile = user;
        next();
    });
}