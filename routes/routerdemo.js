var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Danh sách data'); // GET data listing.
});
router.get('/addnew', function(req, res, next) {
    res.send('Form thêm data'); 
});
router.post('/store', function(req, res, next) {
    //tiếp nhận dữ liệu từ form addnew để record mới vào db
});
router.get('/edit/:id', function(req, res, next) {//tham số id để biết record cần chỉnh
  var id = req.params.id;
  res.send('Form chỉnh catalog' + id);
});
router.post('/update', function(req, res, next) {
    //tiếp nhận dữ liệu từ form edit để cập nhật data vào db
});
router.get('/delete/:id', function(req, res) { //tham số id để biết record cần xóa
  var id = req.params.id;
  res.send('Xóa');
});

module.exports = router;