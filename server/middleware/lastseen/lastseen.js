const {LastSeen} = require('../../models/ProjectManager');

const ProjectLastSeen = async (req, res, next) => {
  try {
    const userID = req.user._id; 
    const userName = req.user.firstName;
    const lastSeen = await LastSeen.findOne({ userID });

    if (lastSeen) {
      await LastSeen.updateOne({ userID }, { $set: { userName, timestamp: new Date() } });
    } else {
        await LastSeen.create({ userID, userName, timestamp: new Date() });
    }
    
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

module.exports = ProjectLastSeen;
