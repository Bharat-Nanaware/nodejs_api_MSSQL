const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

/**
* @swagger
* /password/forgot-password:
 *   post:
 *     summary: Forgot password Email sending 
 *     description: Forgot password Email sending 
 *     tags: [Email Send]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Forgot-password Email successfully.
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

/**
* @swagger
* /password/ChangePassword:
 *   post:
 *     summary: Change Password Email sending 
 *     description: Change Password Email sending 
 *     tags: [Email Send]
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
 *         description: Change Password Email send successfully
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */



router.post('/forgot-password', passwordController.sendForgotPasswordEmail);
router.post('/ChangePassword', passwordController.ChangePassword);

module.exports = router;