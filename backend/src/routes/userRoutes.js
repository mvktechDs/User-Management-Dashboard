const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserStats,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/getUsers', getUsers);
router.post('/createUser', createUser);
router.get('/getUserStats', getUserStats);
router.get('/getUserById/:id', getUserById);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
