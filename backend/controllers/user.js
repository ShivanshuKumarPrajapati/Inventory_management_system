const User = require('./../models/user');

exports.getUserById = (req, res, next, id) => {
    
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error:'User not FOUND'
            });
        }
        req.profile = user;
        next();
    });
}


exports.updateUser = (req, res) => {
    
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Update Failed. Try again later",
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
    
}