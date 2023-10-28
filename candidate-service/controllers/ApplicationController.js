const Candidate = require('../models/Candidate');

exports.createApplication = async (req, res) => {
  try {
    const votes_number = 0;

    const {
      role_being_candidated_for,
      img_URL,
      name,
      motivation_letter,
      phone_number,
    } = req.body;

    const candidate = new Candidate({
      role_being_candidated_for,
      votes_number,
      img_URL,
      name,
      motivation_letter,
      phone_number,
    });

    await candidate.save();

    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};
