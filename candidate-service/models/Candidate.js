const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    role_being_candidated_for: String,
    votes_number: { 
        type: Number, 
        default: 0,
        required: true
    },
    img_URL: String,
    name: String,
    motivation_letter: String,
    phone_number: String
});

module.exports = mongoose.model('Candidate', candidateSchema);
