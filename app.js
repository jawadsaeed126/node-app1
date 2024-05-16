const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from backend' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
