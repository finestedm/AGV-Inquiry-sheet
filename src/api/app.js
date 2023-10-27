const express = require('express');
const bodyParser = require('body-parser');
const dayjs = require('dayjs');
const fs = require('fs').promises;
const cors = require('cors')

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors())

// Endpoint to save inquiry
app.post('/api/saveData', async (req, res) => {
    try {
        const data = JSON.stringify(req.body);
        const fileName = `data-${dayjs().format('YYYY-MM-DD-HH-mm')}.json`;
        await fs.writeFile(fileName, data);
        res.status(200).json({ success: true, fileName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


// Endpoint to get all inquiries
app.get('/api/inquiries', async (req, res) => {
    try {
        const files = await fs.readdir('./');
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        const inquiries = await Promise.all(
            jsonFiles.map(async (file) => {
                const content = await fs.readFile(`./${file}`, 'utf-8');
                return JSON.parse(content);
            })
        );

        res.json({ inquiries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
