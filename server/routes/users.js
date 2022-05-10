const express = require('express');
const router = express.Router();
const {
    renderIndexPage,
    signInSuccess,
    signInFailure,
    signOutInternal,
    signOut,
    signUp,
    getName
} = require("../controller/userController")

module.exports = function (passport) {
    router.get('/', renderIndexPage)
    router.post('/signin/internal',
        passport.authenticate('local', {
            session: true,
            failureRedirect: '/users'
        }), signInSuccess)
    router.get('/signin/fail', signInFailure)
    router.post('/signin',
        passport.authenticate('local', {
            session: true,
            failureRedirect: '/users/signin/fail'
        }), signInSuccess)
    router.get('/signout', signOutInternal)
    router.post('/signout', signOut)
    router.post("/signup", signUp)
    router.get("/name/:id", getName)

    return router
}
