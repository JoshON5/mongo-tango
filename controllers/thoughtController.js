const { User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find().
        then((thought) => {
        if (!thought) {
            res.status(404).json({ message: 'Nothing found :( '} )
        }
        res.json(thought)
       } )
        .catch((err) => res.status(500).json(err)) 

    },
    getSingleThought(req, res) {
        Thought.findOne( { _id: req.params.thoughtId } )
        .select('-__v')
        .then((thought) => {
            if(!thought) {
                res.status(404).json( { message: 'No Thought found with this Id :(' } )
            }
            res.json(thought)
        }
        )
        .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id : req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then((thought) => {
            if(!thought) {
                res.status(404)
                .json({ message: 'No User found with this Id :( '} );
            };
            res.json(thought)
        })
        .catch((err) => res.status(500).json(err) );
    }
}