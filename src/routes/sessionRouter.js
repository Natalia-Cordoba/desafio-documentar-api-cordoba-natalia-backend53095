import { Router } from "express";
import passport from "passport";
import { login, register, sessionGithub, logout, testJWT, current, sendEmailPassword, changePassword } from "../controllers/sessionController.js";

const sessionRouter = Router()

sessionRouter.get('/', (req, res) => {
    res.render("templates/login", {
        css: 'loginRegistro.css'
    })
})

sessionRouter.get('/registroForm', (req, res) => {
    res.render("templates/register", {
        css: 'loginRegistro.css'
    })
})

sessionRouter.get('/login', passport.authenticate('login'), login)

sessionRouter.post('/register', passport.authenticate('register'), register)

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })

sessionRouter.get('/githubSession', passport.authenticate('github'), sessionGithub)

sessionRouter.get('/logout', logout)

sessionRouter.get('/current', passport.authenticate('jwt'), current)

sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: false }), testJWT)

sessionRouter.post('/sendEmailPassword', sendEmailPassword)

sessionRouter.post('/reset-password/:token', changePassword)

export default sessionRouter;
