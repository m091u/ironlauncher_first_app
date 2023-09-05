const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/contact", (req, res, next) => {
  res.send("Hello from contact");
});


module.exports = router;