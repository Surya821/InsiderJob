import 'dotenv/config'
import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/Webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {clerkMiddleware} from '@clerk/express';

// Initialize Express
const app = express()

// Connect to Database
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get('/', (req,res)=>res.send("API working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    // Send a log before throwing the error
    Sentry.logger.info('User triggered test error', {
      action: 'test_error_endpoint',
    });
    // Send a test metric before throwing the error
    Sentry.metrics.count('test_counter', 1);
    throw new Error("My first Sentry error!");
  });

app.post('/webhooks', clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

// app.listen(PORT, ()=>{
//     console.log(`Server is running on ${PORT}`);
// })