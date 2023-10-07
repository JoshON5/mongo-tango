const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

router.route('/:userId')
.get(getSingleUser);

module.exports = router;