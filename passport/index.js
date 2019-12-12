const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../model/users');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({passReqToCallback: true, usernameField: 'username' }, (req, username, password, done) => {
            // Match user
            User.findOne({
                username: username
            }).then(user => {
                if (!user) {
                    return done(null, false, req.flash('error','That email is not registered'));
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, req.flash('error', 'Password incorrect'));
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findById(id);
            if(!user)
                done(null, false);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
