import User from './model';
import { v4 as uuid } from'uuid'; 
import { encryptPassword, decodePassword } from '../../utils/bcrypt';
import { signToken } from '../../utils/jwt';

export default {
    sign_up: async (req, res) => {
        const {
            fullName,
            email,
            age,
            password
        } = req.body;

        const user = await User.findOne({ email });

        if(user) return res.status(401).json({ msg: "You have an account with this email, please sign_in" });

        const newUser = new User({
            fullName,
            email,
            age,
            password: encryptPassword(password),
            uniqueId: uuid()
        });

        await newUser.save();

        const token = signToken(newUser.uniqueId);

        return res.status(201).json(token);
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) return res.status(401).json({ error: "Wrong credentials" });
    
        if(!decodePassword(password, user.password)) return res.status(401).json({ error: "Wrong credentials" });
    
        const token = signToken(user.uniqueId);
    
        return res.status(201).json(token);
    },

    getUser: async (req, res) => {
        const { sub: uniqueId } = req.user;

        const user = await User.findOne({ uniqueId });

        if(!user) return res.status(404).json({ message: "Wrong credentials" });

        return res.status(201).json(user);
    },

    updateUser: async (req, res) => {
        const { sub: uniqueId } = req.user;

        await User.findOneAndUpdate({ uniqueId }, req.body);

        return res.status(200).json({ msg: "User info updated successfully" });
    },

    deleteUser: async (req, res) => {
        const { sub: uniqueId } = req.user;
        
        await User.findOneAndDelete({ uniqueId });

        return res.status(200).json({ msg: "User deleted successfully" });
    }
}