const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');


/**
 * @swagger
 * /roles/Rolelist:
 *   get:
 *     tags: [Roles]
 *     summary: Get all roles
 *     responses:
 *       200:
 *         description: Returns Role list
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /roles/{roleId}:
 *   get:
 *     summary: Get a Role Rights by RoleId
 *     description: Returns a single user based on the provided ID
 *     tags: [Roles Rights]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: ID of the user to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role not found
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
* @swagger
* /roles/addRole:
 *   post:
 *     summary: Add a new role
 *     description: Add a new role to the system
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RoleName:
 *                 type: string
 *               CreatedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role added successfully
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /roles/update-role:
 *   put:
 *     summary: Update a role
 *     description: Update an existing role in the system
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RoleID:
 *                 type: integer
 *               RoleName:
 *                 type: string
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

/**
 * @swagger
 * /roles/delete/{roleId}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a single user based on the provided ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
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

/**
* @swagger
* /roles/add-role-rights:
 *   post:
 *     summary: Add a new Roles Rights
 *     description: Add a new Roles Rights to the system
 *     tags: [Roles Rights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ModuleID:
 *                 type: integer
 *               RoleID:
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
 *               CreatedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Roles Rights added successfully
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

router.get('/Rolelist',roleController.getRoleList);
router.get('/:roleId',roleController.getRoleRights);
router.post('/addRole',roleController.addRole);
router.put('/update-role',roleController.updateRole);
router.delete('/delete/:roleId',roleController.deleteRole);
router.post('/add-role-rights', roleController.addRoleRights);
module.exports =router;