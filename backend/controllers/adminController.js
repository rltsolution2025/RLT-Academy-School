require('dotenv').config();

// ======================================================
// ADMIN LOGIN
// ======================================================

const loginAdmin = async (req, res) => {
  try {
    // ======================================================
    // GET FORM DATA
    // ======================================================

    const { username, password } = req.body;

    // ======================================================
    // EMPTY VALIDATION
    // ======================================================

    if (!username || !password) {
      return res.status(400).json({
        success: false,

        message: 'Username and Password are required',
      });
    }

    // ======================================================
    // ENV VALUES
    // ======================================================

    const adminUsername = process.env.ADMIN_USERNAME;

    const adminPassword = process.env.ADMIN_PASSWORD;

    // ======================================================
    // BOTH WRONG
    // ======================================================

    if (username !== adminUsername && password !== adminPassword) {
      return res.status(401).json({
        success: false,

        message: 'Invalid Username and Password',
      });
    }

    // ======================================================
    // USERNAME WRONG
    // ======================================================

    if (username !== adminUsername) {
      return res.status(401).json({
        success: false,

        message: 'Invalid Username',
      });
    }

    // ======================================================
    // PASSWORD WRONG
    // ======================================================

    if (password !== adminPassword) {
      return res.status(401).json({
        success: false,

        message: 'Invalid Password',
      });
    }

    // ======================================================
    // LOGIN SUCCESS
    // ======================================================

    return res.status(200).json({
      success: true,

      message: 'Login Successful',

      admin: {
        username,
      },
    });
  } catch (error) {
    console.error('Admin Login Error:', error);

    return res.status(500).json({
      success: false,

      message: 'Server Error',
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  loginAdmin,
};
