const express = require('express');
const sql = require('mssql');
const app = express();
const PORT = 3000;

const dbConfig = {
    user: 'sa',
    password: 'everest',
    server: '192.166.0.204',
    port: 1433,
    database: 'qrcode',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

app.use(express.static('public')); // serve HTML, CSS, JS

app.get('/api/dishes', async (req, res) => {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query('SELECT dishname, dishlink FROM milkdishes');
        res.json(result.recordset);
    } catch (err) {
        console.error('DB Error:', err);
        res.status(500).send('Database error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
