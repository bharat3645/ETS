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
  book
  
} = require("../exports");
const QRCode = require("qrcode");

router.post("/login", loginValidation, login);
router.get("/user", ensureAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user, status: 200 });
});
router.post("/signup", signupValidation, signup);

router.get("/ticket/:token", (req, res, next) => {
  try {
    var user = verifyToken(auth, process.env.JWT_SECRET);
  } catch {
    return res.redirect("/home");
  }
  const { tit, name, date, time, adr } = user;

  QRCode.toDataURL(
    req.params.token,
    { errorCorrectionLevel: "H" },
    function (err, url) {
      res.setHeader("Content-Type", "text/html");
      res.send(`
    <div id="root" class="box-border flex items-center justify-center bg-(--bg-h) whitespace-nowrap !font-[Anuphan]">
        <div class="w-[700px] h-[300px] bg-(--bg-c) grid grid-cols-[15%_85%]">
            <div class="w-full h-full flex justify-center items-center  bg-(--body)"><div class="font-[Anuphan] font-light text-white text-[20px] -rotate-90 uppercase flex space-x-4">
                <span>On</span>
                <span>Time</span>
                <span>Check-In</span>
            </div></div>
            <div class="flex">
                <div class="w-fit  h-fit flex p-10 flex-col">
                    <div class="tt text-[30px] font-black ">${tit}</div>
                    <div class="grid grid-cols-[auto_auto_auto] space-x-8">
                        <div class="flex flex-col">
                            <div class="text-[90%] font-medium">Name</div>
                            <div class="w-fit p-3 bg-[#d9e3e7] text-[110%] font-regular">${name}</div>
                        </div>
                        <div class="flex flex-col">
                            <div class="text-[90%] font-medium">Date</div>
                            <div class="w-fit p-3 bg-[#d9e3e7] text-[110%] font-regular">${date}</div>
                        </div>
                        <div class="flex flex-col">
                            <div class="text-[90%] font-medium">Time</div>
                            <div class="w-fit p-3 bg-[#d9e3e7] text-[110%] font-regular">${time}</div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full mt-4">
                            <div class="text-[90%] font-medium">Event Address</div>
                            <div class="w-fit p-3 bg-[#d9e3e7] text-[110%] font-regular">${adr}
                            </div>
                    </div>
                </div>
                <div class="w-full p-5 flex items-center justify-center h-full border-l-5 border-dashed border-[#d0d6e1]">
                    <img  src="${url}" alt="">
                </div>
            </div>
        </div>
    </div>
    `);
    }
  );
});

router.post("/book", ensureAuthenticated, book);
router.get("/isbooked", ensureAuthenticated, isBooked);


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
