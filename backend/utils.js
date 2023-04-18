import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    '' + process.env.JWT_SECRET, // Secret key to sign token
    {
      expiresIn: '30d', // Token expires in 30 days
    }
  );
};

// Middleware function to check if user is authenticated
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX, Extract token from Authorization header
    // Verify token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' }); // Return error if token is invalid
      } else {
        req.user = decode; // Add user data to request object
        next(); // Move to the next middleware
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' }); // Return error if no token is provided
  }
};

// Middleware function to check if user is an admin
export const isAdmin = (req, res, next) => {
  // Check if user is an admin
  if (req.user && req.user.isAdmin) {
    next(); // Move to the next middleware
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' }); // Return error if user is not an admin
  }
};
