const { Schema, model, Types } = require('mongoose');
const processDate = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => processDate(timestamp),
        },
    },
    {
        toJSON: {
            getters: true
        },
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => processDate(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);



thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;