import Kudo from '../models/Kudos.js';

// Create a new Kudo
export const createKudo = async (req, res) => {
  try {
    const { giver, badge, reason } = req.body;
    const newKudo = new Kudo({ giver, badge, reason });
    await newKudo.save();
    res.status(201).json(newKudo);
  } catch (err) {
    res.status(400).json({ message: 'Error creating kudo', error: err.message });
  }
};

// Get all Kudos
export const getAllKudos = async (req, res) => {
  try {
    const kudos = await Kudo.find();
    res.status(200).json(kudos);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching kudos', error: err.message });
  }
};

// Get a single Kudo by ID
// export const getKudoById = async (req, res) => {
//   try {
//     const kudo = await Kudo.findById(req.params.id);
//     if (!kudo) {
//       return res.status(404).json({ message: 'Kudo not found' });
//     }
//     res.status(200).json(kudo);
//   } catch (err) {
//     res.status(400).json({ message: 'Error fetching kudo', error: err.message });
//   }
// };

// // Update a Kudo (e.g., to add likes)
// export const updateKudo = async (req, res) => {
//   try {
//     const { likes } = req.body;
//     const kudo = await Kudo.findByIdAndUpdate(
//       req.params.id,
//       { $set: { likes } },
//       { new: true }
//     );
//     if (!kudo) {
//       return res.status(404).json({ message: 'Kudo not found' });
//     }
//     res.status(200).json(kudo);
//   } catch (err) {
//     res.status(400).json({ message: 'Error updating kudo', error: err.message });
//   }
// };

// // Delete a Kudo
// export const deleteKudo = async (req, res) => {
//   try {
//     const kudo = await Kudo.findByIdAndDelete(req.params.id);
//     if (!kudo) {
//       return res.status(404).json({ message: 'Kudo not found' });
//     }
//     res.status(200).json({ message: 'Kudo deleted successfully' });
//   } catch (err) {
//     res.status(400).json({ message: 'Error deleting kudo', error: err.message });
//   }
// };

// export const likeKudo = async (req, res) => {
//     try {
//       // Find the kudo by ID and increment the like count
//       const kudo = await Kudo.findByIdAndUpdate(
//         req.params.id, // Kudo ID
//         { $inc: { likes: 1 } }, // Increment likes by 1
//         { new: true } // Return the updated document
//       );
//       console.log('Request Kudo ID:', req.params.id);

  
//       if (!kudo) {
//         return res.status(404).json({ message: 'Kudo not found' });
//       }
  
//       res.status(200).json(kudo);  // Return the updated kudo with the new like count
//     } catch (err) {
//       res.status(400).json({ message: 'Error liking kudo', error: err.message });
//     }
//   };


export const likeKudo = async (req, res) => {
  const { id: kudoId } = req.params; // Kudo ID from request parameters
  const { userId } = req.body; // User ID from request body

  try {
    // Step 1: Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Check if user has already liked this Kudo
    if (user.likes.includes(kudoId)) {
      return res.status(400).json({ message: 'User has already liked this Kudo' });
    }

    // Step 3: Increment the like count for the Kudo
    const kudo = await Kudo.findByIdAndUpdate(
      kudoId,
      { $inc: { likes: 1 } }, // Increment likes by 1
      { new: true } // Return the updated Kudo
    );

    if (!kudo) {
      return res.status(404).json({ message: 'Kudo not found' });
    }

    // Step 4: Add the Kudo ID to the user's likes array
    user.likes.push(kudoId);
    await user.save();

    // Step 5: Send a success response
    res.status(200).json({
      message: 'Kudo liked successfully!',
      kudo,
      user,
    });
  } catch (err) {
    console.error('Error liking the Kudo:', err);
    res.status(500).json({
      message: 'Error liking Kudo',
      error: err.message,
    });
  }
};