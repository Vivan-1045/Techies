const { Router } = require("express");
const User = require("../model/user");

const router = Router();
router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, pwd } = req.body;
  try {
    const token = await User.VerifyPwdGenerateToken(email, pwd);
    return res.cookie("token",token).redirect("/");
  } catch (error) {
    return res.render('signin',{
      error : "Incorrect Email and Password And if you don't have any account then click on Create Account"
    })
  }
});

router.get('/logout',(req,res) =>{
  return res.clearCookie('token').redirect('/')
})



router.post("/signup", async (req, res) => {
  const { fullName, email, pwd } = req.body;
  await User.create({
    fullName,
    email,
    pwd,
  });
  // return res.redirect("/");
  const token = await User.VerifyPwdGenerateToken(email, pwd);
  return res.cookie("token",token).redirect("/");
});

module.exports = router;
