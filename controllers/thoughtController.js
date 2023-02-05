const { Thought, User, Types } = require('../models');

module.exports = {
    // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });  
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
        .then(({ _id }) => {
          console.log(req.body);
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then (userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user with this ID' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
    },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(({ _id }) =>
        !_id
          ? res.status(404).json({ message: 'No thought with this ID' })
          : User.findOneAndUpdate(
            { _id: req.body.userId },
            { $pull: { thoughts: _id } },
            { runValidators: true, new: true }
          )
      )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user with this ID' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
    // Update an existing User
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then(thoughtData => {
          res.json(thoughtData);
        })
        .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: {reactions: req.body } },
        { new: true }
      )
      .then(userData => {
        !userData
        ? res.status(404).json({ message: 'No user with this ID' })
        :res.json(userData);
      })
      .catch(err => res.json(err));
    },
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: {reactions: req.body } },
        { new: true }
      )
      .then(thoughtData => {
        !thoughtData
        ?  res.status(404).json({ message: 'No reaction with this ID' })
        :  res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    }
}