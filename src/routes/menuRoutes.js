const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');


/**
 * @swagger
 * /menu/app-menu/{userId}:
 *   get:
 *     summary: Get a Side Navbar Components
 *     description: Get a Side Navbar Components
 *     tags: [Navbar Components]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: userId for get sidenavbar components
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get a Side Navbar Components  found
 *       404:
 *         description: Get a Side Navbar Components not found for this UserID
 *       500:
 *         description: Internal server error
 */

router.get('/app-menu/:userId', menuController.getAppMenuList);

module.exports = router;
