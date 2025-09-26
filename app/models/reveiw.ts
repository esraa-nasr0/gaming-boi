import mongoose, { Schema } from 'mongoose';

const gamesReveiwSchema = new Schema({
    gameId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    reviewText: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now },
    likes : [{ type: Schema.Types.ObjectId, ref: 'User' , unique: true}],
});

const GameReveiw = mongoose.models.GameReveiw || mongoose.model('GameReveiw', gamesReveiwSchema);
export default GameReveiw;