const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cores = require('cors')
const morgan = require('morgan')
const sql = require('mssql');
require('dotenv').config();



//Routes imports
const swaggerOptions = require('./utils/swagger');
const jwt = require('./utils/jwt');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const roleRightsRoutes = require('./routes/roleRightsRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');


const PORT = process.env.PORT || 3001;



// Connect to database
sql.connect(db)
    .then(() => console.log('Database connected'))
    .catch(error => console.log('Database connection failed', error));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//To Check which api method hit
app.use(morgan('dev'));






// Serve Swagger documentation
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());

// core package for connection with Front End
app.use(cores());

// use JWT auth to secure the api
app.use(jwt());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/role-rights', roleRightsRoutes);
app.use('/password', passwordRoutes);
app.use('/menu', menuRoutes);



