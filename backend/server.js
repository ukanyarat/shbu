const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();  // ใช้ dotenv เพื่อดึงค่าจาก .env
//--------------------------------------------------------------------------
const app = express();
const port = 5432;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

module.exports = pool;

app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM your_table');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// ------------------------------------------------------------------------------


app.use(express.json());             // ตั้งค่าให้ Express สามารถรับข้อมูลในรูปแบบ JSON ได้

// API สำหรับเพิ่มข้อมูลผู้ใช้
app.post('/users', async (req, res) => {
    const { username, password, phone } = req.body;  // รับข้อมูลจาก body ของ request
    try {
        // เพิ่มข้อมูลลงในตาราง users
        const result = await pool.query(
            'INSERT INTO users (username, password, phone) VALUES ($1, $2, $3) RETURNING *',
            [username, password, phone]
        );
        res.json(result.rows[0]);  // ส่งข้อมูลผู้ใช้ที่ถูกเพิ่มกลับไปให้ client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API สำหรับลบข้อมูลผู้ใช้
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;  // รับ id จาก URL
    try {
        // ลบข้อมูลผู้ใช้ตาม id
        const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);  // ส่งข้อมูลผู้ใช้ที่ถูกลบกลับไปให้ client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ตั้งค่าให้เซิร์ฟเวอร์ฟังที่พอร์ต 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
