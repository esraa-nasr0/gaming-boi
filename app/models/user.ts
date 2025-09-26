import mongoose, { Schema } from 'mongoose';

const imageSchema = new Schema({
    source_url: { type: String, required: true },
    public_id: { type: String, required: true },
});

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar:  imageSchema,
    wishlist: [{type: String}],
    topTenList: [{ type: String , max: 10 }],
    gamesRating: [{type: Schema.Types.ObjectId, ref: 'GameRating'}],
    bio: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;