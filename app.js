const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use(errorHandler);
app.use('/api/auth', authRoutes); 
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;