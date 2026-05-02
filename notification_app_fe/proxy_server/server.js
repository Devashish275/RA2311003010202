import express from 'express';
import cors from 'cors';
import https from 'https';
import fetch from 'node-fetch';

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'clientID', 'clientSecret']
}));

app.use(express.json());

// ⚠️ REPLACE THESE WITH YOUR ACTUAL VALUES
const CLIENT_ID = 'your-client-id-here';
const CLIENT_SECRET = 'your-client-secret-here';
const BEARER_TOKEN = 'your-bearer-token-here';

// SSL Agent to handle self-signed certificates
const agent = new https.Agent({
  rejectUnauthorized: false
});

// POST /logs - Forward logs to Afford's API
app.post('/logs', async (req, res) => {
  try {
    console.log('📥 Received log request:', req.body);

    const { stack, level, package: pkg, message } = req.body;

    // Validate request
    if (!stack || !level || !pkg || !message) {
      return res.status(400).json({
        error: 'Missing required fields: stack, level, package, message'
      });
    }

    // Forward to Afford's API
    const response = await fetch('https://20.207.122.201/evaluation-service/logs', {
      method: 'POST',
      agent,
      headers: {
        'Content-Type': 'application/json',
        'clientID': CLIENT_ID,
        'clientSecret': CLIENT_SECRET,
        'Authorization': `Bearer ${BEARER_TOKEN}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Afford API error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Log forwarded successfully:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Proxy /logs error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /notifications - Forward notification requests to Afford's API
app.get('/notifications', async (req, res) => {
  try {
    console.log('📥 Received notifications request');

    // Forward to Afford's API
    const response = await fetch('https://20.207.122.201/evaluation-service/notifications', {
      agent,
      headers: {
        'clientID': CLIENT_ID,
        'clientSecret': CLIENT_SECRET,
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Afford API error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Notifications fetched successfully');
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Proxy /notifications error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Proxy server running' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Proxy server running on http://localhost:${PORT}`);
  console.log(`\n📋 Configuration:`);
  console.log(`   CLIENT_ID: ${CLIENT_ID === '18ba485d-bc24-459d-a742-aad4c7e4abaf' ? '❌ NOT SET' : '✓ Set'}`);
  console.log(`   CLIENT_SECRET: ${CLIENT_SECRET === 'PDymnGzdxGnGXrfw' ? '❌ NOT SET' : '✓ Set'}`);
  console.log(`   BEARER_TOKEN: ${BEARER_TOKEN === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkcDcwNDlAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjM5MCwiaWF0IjoxNzc3NzAxNDkwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNDdiNmU0NDUtMDUyYi00OWU5LWIzZTEtZGUwNTBlZWQ2ZjM0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGV2YXNoaXNoIHBhbmRleSIsInN1YiI6IjE4YmE0ODVkLWJjMjQtNDU5ZC1hNzQyLWFhZDRjN2U0YWJhZiJ9LCJlbWFpbCI6ImRwNzA0OUBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImRldmFzaGlzaCBwYW5kZXkiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTAyMDIiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiIxOGJhNDg1ZC1iYzI0LTQ1OWQtYTc0Mi1hYWQ0YzdlNGFiYWYiLCJjbGllbnRTZWNyZXQiOiJQRHltbkd6ZHhHbkdYcmZ3In0.4IBgqCvv-fTBjJJqLrwS9UC076y2ezk4zGR01-yraak' ? '❌ NOT SET' : '✓ Set'}`);
  console.log(`\n📍 Available endpoints:`);
  console.log(`   POST http://localhost:${PORT}/logs`);
  console.log(`   GET http://localhost:${PORT}/notifications`);
  console.log(`   GET http://localhost:${PORT}/health\n`);
});