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

dotenv.config();

// ======================================================
// DATABASE
// ======================================================

connectDB();

// ======================================================
// APP
// ======================================================

const app = express();

// ======================================================
// CORS
// ======================================================

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

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
// SECURITY
// ======================================================

app.use(helmet());

app.use(hpp());

app.use(compression());

app.use(morgan('dev'));

// ======================================================
// RATE LIMITER
// ======================================================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
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

const contactRoutes = require('./routes/contactRoutes');

const admissionRoutes = require('./routes/admissionRoutes');

app.use('/api/contacts', contactRoutes);

app.use('/api/admissions', admissionRoutes);

// ======================================================
// HOME
// ======================================================

app.get('/', (req, res) => {
  res.render('index');
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use(errorHandler);

// ======================================================
// SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
