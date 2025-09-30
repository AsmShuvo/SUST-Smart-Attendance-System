const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic route
app.get('/', (req, res) => {
	res.send('Server is running on !');
});

// Use 127.0.0.1 instead of localhost to avoid IPv6 issues
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb';

mongoose.connect(MONGO_URI)
.then(() => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`);
	});
})
.catch((err) => {
	console.error('Failed to connect to MongoDB', err);
	process.exit(1);
});


