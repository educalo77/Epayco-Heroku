const passport = require("passport")
const { getOneByEmail } = require("../controllers/userControllers")
const LocalStrategy = require("passport-local").Strategy
const BearerStrategy = require("passport-http-bearer").Strategy
const secret = process.env.EMAIL_SECRET

const jwt = require("jsonwebtoken")

passport.use(new LocalStrategy({usernameField:"email", passwordField:"phone", session:false},
async (username, phone, done) =>{
        const user = await getOneByEmail(username)
        if(!user){
            return done(null,false, { message:"usuario no encontrado"})
        }
        if(!user.compare(phone)){
            return done(null,false,{message:"telefono invalido"})
        }
        const { id, name, email, role, status, createdAt, updatedAt } = user;
        return done(null,{ id, name, email, role, status, createdAt, updatedAt })
    } 
))

passport.use(new BearerStrategy((token,done)=>{  
    jwt.verify(token,secret,function(error,user){
        if(error) return done(error)
        return done(null,user?user:false)
    })
}))

module.exports = passport;
