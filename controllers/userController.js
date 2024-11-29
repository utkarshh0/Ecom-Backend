import { User } from '../models/userModel.js';

// Get all users
const getAllUsers = async (req, res) => {
    
    try {
      const users = await User.find({ role: 'user' })
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch users' })
    }
}

// Get all Sellers
const getAllSellers = async (req, res) => {
    
    try {
      const users = await User.find({ role: 'seller' })
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch seller' })
    }
}


// Get the profile of the authenticated user
const getProfile = async (req, res) => {
    
    try {

       // For normal users, use req.user.id
       let userId = req.user.id

       // If the request is from admin, userId will be in req.body
       if (req.user.role === 'admin') {
           userId = req.body.userId // Admin passes userId in the body to update any user's profile
       }

      const user = await User.findById(userId).select('-password')
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch profile' })
    }
}

// Update the profile of the authenticated user
const updateProfile = async (req, res) => {
    
    try {

        // For normal users, use req.user.id
        let userId = req.user.id

        // If the request is from admin, userId will be in req.body
        if (req.user.role === 'admin') {
            userId = req.body.userId // Admin passes userId in the body to update any user's profile
        }

        const updates = req.body
        const user = await User.findByIdAndUpdate(userId, updates, { new: true })
        if (!user) {
        return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ message: 'Profile updated successfully', user })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update profile' })
    }
}
  
// Delete the profile of the authenticated user
const deleteProfile = async (req, res) => {
    
    try {
        
        // For normal users, use req.user.id
        let userId = req.user.id

        // If the request is from admin, userId will be in req.body
        if (req.user.role === 'admin') {
            userId = req.body.userId // Admin passes userId in the body to update any user's profile
        }

        const user = await User.findByIdAndDelete(userId)
        if (!user) {
        return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ message: 'Profile deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete profile' })
    }
}



export { getAllUsers, getAllSellers, getProfile, updateProfile, deleteProfile}