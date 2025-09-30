const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
	teacher_id: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

module.exports = mongoose.model('Teacher', teacherSchema);
