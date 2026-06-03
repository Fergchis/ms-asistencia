const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'ms-asistencia'
  });
});

router.get('/actuator/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'ms-asistencia'
  });
});

module.exports = router;