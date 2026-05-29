import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    action: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true // Ye feature 'createdAt' aur 'updatedAt' automatically add karega
});

export default mongoose.model('ActivityLog', logSchema);