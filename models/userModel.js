import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'seller'], default: 'user' },
}, { timestamps: true })


userSchema.pre('save', async function (next){
    if(!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.comparePassword = async function(password) { await bcrypt.compare(password, this.password) }

export const User = mongoose.model('User', userSchema)
