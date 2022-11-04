const express = require('express');
const db = require('./config/db');

const app = express();

const conectarDB = async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

conectarDB();

app.use( express.json() );

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/devices', require('./routes/devices'));


const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
    console.log(`servidor en puerto ${port}`);
})