var express = require('express');
var router = express.Router();

router.get('/baidu', function(req, res, next) {
  console.log('baidu')
  res.redirect('http://www.baidu.com');
});

module.exports = router;
