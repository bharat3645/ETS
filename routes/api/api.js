var express = require("express");
var router = express.Router();
const data = require("../society_data.json");
const edata = require("../events_data.json");
const {
  signup,
  login,
  signupValidation,
  loginValidation,
  ensureAuthenticated,
  verifyToken,
  createToken,
  isBooked,
  book,
  getBookings
  
} = require("../exports");
const QRCode = require("qrcode");

router.post("/login", loginValidation, login);
router.get("/user", ensureAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user, status: 200 });
});
router.post("/signup", signupValidation, signup);
router.get("/ticket/:token",ensureAuthenticated, (req, res, next) => {
  try {
    var user = verifyToken(req.params.token, process.env.BOOKJWT_SECRET);
  } catch {
    return res.redirect("/home");
  }
  const { name, id, date, time, adr } = user;

  QRCode.toDataURL(
    req.params.token,
    { errorCorrectionLevel: "H" },
    function (err, url) {
      res.status(200).json({booking: {
        id:id,
        name:name,
        date:date,
        time:time,
        adr:adr,
        url: url
      }})
    
    }
  );
});
router.post("/book", ensureAuthenticated, book);
router.get("/isbooked", ensureAuthenticated, isBooked);
router.get("/bookings", ensureAuthenticated, (req,res)=>{
  res.json({bookings: getBookings(req.query.id)})
});
router.get("/events", function (req, res, next) {
  res.json(data);
});
router.get("/events/:name", function (req, res, next) {
  res.json(data[req.params?.name] ?? { message: "not found" });
});
router.get("/event/:name", function (req, res, next) {
  res.json(edata[req.params?.name] ?? { message: "not found" });
});

module.exports = router;
