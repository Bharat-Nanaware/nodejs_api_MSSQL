const authServices = require('../services/authServices');

exports.registerUser = async (req, res) => {
    const { username, email, firstName, middleName, lastName, password } = req.body;
    try {
      await authServices.registerUser(username, email, firstName, middleName, lastName, password);
      res.json({ response: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ response: error.message });
    }
  };
  
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const response  = await authServices.loginUser(email, password);
      res.json(response);
    } catch (error) {
        if (error.message.includes('Invalid User Code')) {
            res.json({ response: 'Invalid User Code' });
        } else if (error.message.includes('Invalid Password')) {
            res.json({ response: 'Invalid Password' });
        } else {
            res.status(500).json({ response: error.message });
        }
    }
  };