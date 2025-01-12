import Kudo from '../models/Kudos.js'; // Assuming you have a Kudo model
import User from '../models/User.js'; // Assuming you have a User model

// Controller to get Kudos data (kudos given by type)
export const getKudosData = async (req, res) => {
  try {
    // Fetch the count of kudos given by type from Kudo collection
    const kudosData = await Kudo.aggregate([
      {
        $group: {
          _id: "$badge", // Group by the badge type
          kudos: { $sum: 1 }, // Sum up the number of kudos given for each type
        },
      },
      {
        $project: {
          name: "$_id", // Name will be the badge type
          kudos: 1, // Count of kudos
        },
      },
    ]);

    res.status(200).json(kudosData);
  } catch (error) {
    console.error('Error fetching kudos data:', error);
    res.status(500).json({ message: 'Error fetching kudos data', error: error.message });
  }
};

// Controller to get Leaderboard data (kudos received by users)
export const getLeaderboardData = async (req, res) => {
  try {
    // Fetch the users and their kudos count
    const leaderboardData = await User.aggregate([
      {
        $lookup: {
          from: 'kudos', // Join with the Kudo collection
          localField: '_id', // Match user ID with kudos giver
          foreignField: 'giver', // The field in Kudo that holds the user's ID
          as: 'receivedKudos', // Create an array of received kudos for each user
        },
      },
      {
        $project: {
          name: 1, // Include user's name
          kudos: { $size: '$receivedKudos' }, // Count the size of the receivedKudos array
        },
      },
      { $sort: { kudos: -1 } }, // Sort by the number of kudos received, in descending order
    ]);

    res.status(200).json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ message: 'Error fetching leaderboard data', error: error.message });
  }
};
