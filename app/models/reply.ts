import mongoose, { Schema } from 'mongoose';

const reveiwReplySchema = new Schema({
    reveiwId: { type: Schema.Types.ObjectId, ref: 'GameReveiw', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes : [{ type: Schema.Types.ObjectId, ref: 'User' , unique: true}],
});

const ReveiwReply = mongoose.models.ReveiwReply || mongoose.model('ReveiwReply', reveiwReplySchema);
export default ReveiwReply;