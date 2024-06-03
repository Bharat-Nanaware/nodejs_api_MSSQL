// src/routes/roleRightsRoutes.js
const express = require('express');
const router = express.Router();
const roleRightsController = require('../controllers/roleRightsController');






/**
 * @swagger
 * /role-rights/update-role-rights:
 *   put:
 *     summary: Update a role
 *     description: Update an existing role in the system
 *     tags: [Roles Rights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RoleRightsID:
 *                 type: integer
 *               AddAccess:
 *                 type: boolean
 *               EditAccess:
 *                 type: boolean
 *               DeleteAccess:
 *                 type: boolean
 *               ViewAccess:
 *                 type: boolean
 *               ExportAccess:
 *                 type: boolean
 *               ModifiedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */


router.put('/update-role-rights', roleRightsController.updateRoleRights);

module.exports = router;
