import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    uniqueId: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('user', userSchema);