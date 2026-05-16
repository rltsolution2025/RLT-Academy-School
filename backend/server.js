const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const hpp = require('hpp');

const compression = require('compression');

const morgan = require('morgan');

const connectDB = require('./config/db');

const errorHandler = require('./middleware/errorMiddleware');

// ======================================================
// ENV CONFIG
// ======================================================

dotenv.config();

// ======================================================
// DATABASE CONNECTION
// ======================================================

connectDB();

// ======================================================
// EXPRESS APP
// ======================================================

const app = express();

// ======================================================
// CORS CONFIGURATION
// ======================================================

const allowedOrigins = ['http://localhost:4200', 'https://rlt-academy-school-prrq.vercel.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      // ALLOW POSTMAN / MOBILE APPS

      if (!origin) {
        return callback(null, true);
      }

      // ALLOW FRONTEND URLS

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // BLOCK OTHER ORIGINS

      return callback(new Error('CORS policy does not allow this origin'), false);
    },

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    credentials: true,
  }),
);

// ======================================================
// EXPRESS 5 PREFLIGHT FIX
// ======================================================

app.options(/.*/, cors());

// ======================================================
// BODY PARSER
// ======================================================

app.use(
  express.json({
    limit: '10mb',
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  }),
);

// ======================================================
// SECURITY MIDDLEWARE
// ======================================================

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(hpp());

app.use(compression());

app.use(morgan('dev'));

// ======================================================
// RATE LIMITER
// ======================================================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,

    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

app.use(limiter);

// ======================================================
// VIEW ENGINE
// ======================================================

app.set('view engine', 'ejs');

app.set('views', './views');

// ======================================================
// ROUTES
// ======================================================

// CONTACT ROUTES

const contactRoutes = require('./routes/contactRoutes');

// ADMISSION ROUTES

const admissionRoutes = require('./routes/admissionRoutes');

// ADMIN ROUTES

const adminRoutes = require('./routes/adminRoutes');

// API ROUTES

app.use('/api/contacts', contactRoutes);

app.use('/api/admissions', admissionRoutes);

app.use('/api/admin', adminRoutes);

// ======================================================
// HOME ROUTE
// ======================================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,

    message: 'RLT Academy Backend Server Running Successfully',
  });
});

// ======================================================
// 404 ROUTE
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: 'API Route Not Found',
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(errorHandler);

// ======================================================
// SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
