const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



/**
 * @swagger
 * /users/:
 *   get:
 *     tags: [User]
 *     summary: Get all roles
 *     responses:
 *       200:
 *         description: Returns User list
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     tags: [User]
 *     summary: reset-password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userCode:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reset-password successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/edit-user:
 *   put:
 *     tags: [User]
 *     summary: Edit-user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: integer
 *               UserCode:
 *                 type: string
 *               FirstName:
 *                 type: string
 *               MiddleName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               EmailId:
 *                 type: string
 *               ModifiedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Edit-user successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/delete-user/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a single user based on the provided ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */



router.get('/', userController.getAllUsers);
router.post('/reset-password', userController.resetPassword);
router.put('/edit-user', userController.editUser);
router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;