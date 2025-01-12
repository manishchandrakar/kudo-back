import User from '../models/User.js';

// Register User
// export const registerUser = async (req, res) => {
//   const { name } = req.body;

//   // Validate if 'name' is provided
//   if (!name) {
//     return res.status(400).json({ message: "Name is required!" });
//   }

//   try {
//     const newUser = new User({ name });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// };

export const registerUser = async (req, res) => {
  const { name } = req.body;

  // Step 1: Validate the input
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required and cannot be empty!" });
  }

  try {
    // Step 2: Check if the user already exists
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(409).json({ message: "User with this name already exists!" });
    }

    // Step 3: Create a new user with an empty likes array
    const newUser = new User({
      name: name.trim(),
      likes: [], // Initialize likes as an empty array
    });

    const savedUser = await newUser.save();

    // Step 4: Respond with the created user's details
    res.status(201).json({
      message: "User registered successfully!",
      user: savedUser,
    });
  } catch (error) {
    // Step 5: Handle unexpected errors
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};


// Get All Users (Optional)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required!" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Login success
    res.status(200).json({
      message: "Login successful!",
      userId: user._id,          // User ID
      isLoggedIn: true,          // Login status
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
