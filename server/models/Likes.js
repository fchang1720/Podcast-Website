const likesSchema = new Schema (
    {
        likeId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId() 
        }, 
        username: {
            type: String,
            required: true
        },

    }
)

module.exports = likesSchema;