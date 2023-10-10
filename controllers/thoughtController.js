const { User, Thought } = require('../models');

module.exports = {
	async getThought(req, res) {
		try {
			const thoughts = await Thought.find();
			if (thoughts.length === 0) {
				res.status(404).json({ message: 'Nothing found :(' });
			} else {
				res.json(thoughts);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async getSingleThought(req, res) {
		try {
			const thought = await Thought.findOne({
				_id: req.params.thoughtId,
			}).select('-__v');
			if (!thought) {
				res.status(404).json({ message: 'No Thought found with this Id :(' });
			} else {
				res.json(thought);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async createThought(req, res) {
		try {
			const { _id } = await Thought.create(req.body);
			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: _id } },
				{ new: true }
			);
			if (!user) {
				res.status(404).json({ message: 'No User found with this Id :(' });
			} else {
				res.json(user);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async updateThought(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);

			if (!thought) {
				return res
					.status(404)
					.json({ message: 'No Thought found with this Id :(' });
			}

			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async deleteThought(req, res) {
		try {
			const thought = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});
			if (!thought) {
				return res
					.status(404)
					.json({ message: 'No Thought found with this Id :(' });
			}
			const user = await User.findOneAndUpdate(
				{ thoughts: req.params.thoughtId },
				{ $pull: { thoughts: req.params.thoughtId } },
				{ new: true },
			)
			if (!user) {
				return res.status(404).json({ message: 'No User found associated with this deleted Thought :(' } );
			}
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
