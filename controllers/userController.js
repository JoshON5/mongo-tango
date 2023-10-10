const { User, Thought } = require('../models');

module.exports = {
	async getUser(req, res) {
		try {
			const users = await User.find();
			return res.json(users);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async getSingleUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId })
				.populate('thoughts')
				.populate('friends')
				.select('-__v');

			if (!user) {
				return res
					.status(404)
					.json({ message: 'No User found with this Id :( ' });
			}

			res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},
	async updateUser(req, res) {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);
			if (!user) {
				return res
					.status(404)
					.json({ message: 'No User found with this Id :(' });
			}
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async deleteUser(req, res) {
		try {
			const user = await User.findOneAndDelete({ _id: req.params.userId });
			if (!user) {
				return res.status(404).json({ message: 'No User found with this Id :(' });
			}
			await Thought.deleteMany({ _id: { $in: user.thoughts } });
			res.json({ message: 'User deleted with associated Thoughts also deleted!' });
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
