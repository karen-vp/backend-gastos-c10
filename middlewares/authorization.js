const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    const token = req.header ('x-auth-token')

    if(!token){
        return res.status(401).json({
            msg : 'No hay token'
        })

    }

    try{
        const okToken = jwt.verify(token, process.env.SECRET)
        req.user = okToken.user
        next()
    }catch{
        res.json({
            msg: 'error'
        })
    }

}