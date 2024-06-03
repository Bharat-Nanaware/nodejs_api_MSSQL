const menuService = require('../services/menuServices');

async function getAppMenuList(req, res) {
    try {
        const userId = req.params.userId; // Assuming user ID is passed as a parameter
        const appMenuList = await menuService.getAppMenuList(userId);
        res.json(appMenuList);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

module.exports = { getAppMenuList };
