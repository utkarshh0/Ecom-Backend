import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'


const login = async (req, res) => {
    
    try{
        const { email, password } = req.body
        
        const user = await User.findOne({email})
        const isValid = await user.comparePassword(password)

        if(!user || !isValid){
            return res.status(401).json({ error : 'Invalid Credentials'})
        }

        const token = jwt.sign({id : user._id, role : user.role}, process.env.JWT_SECRET, { expiresIn : "1h"})
        res.json({token})
    } catch(err){
        console.error(err)
        res.status(500).json({ error : 'Error Loggin In'})
    }
}

const googleAuth = (req, res) => {
    res.status(200).json({
        msg : 'Google Auth'
    })
}


const signup = async (req, res) => {
    
    try{
        
        const {name, email, password, role} = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' })
        }
        const isUserExist = await User.findOne({email})

        if(isUserExist) return await res.status(400).json({ message : 'User Already exist with this email'})
        const user = new User({ name, email, password, role })
        await user.save()
        res.status(201).json({ message : 'User Signup Successful'})
    } catch(err) {
        console.error(err)
        res.status(500).json({err : 'Error Signup'})
    }
}   


export { signup, login, googleAuth }