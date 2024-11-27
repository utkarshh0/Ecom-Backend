import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]
    if(!token) res.status(400).json({ message : 'Unauthorized User'})
    
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch(err){
            console.error(err)
            res.status(403).json({error : 'Invalid token'})
        }
}