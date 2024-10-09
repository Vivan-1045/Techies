const { Router } = require("express");
const BLOG = require("../model/Blog");
const multer = require("multer");
const path = require("path");
const Comments = require("../model/comments");
const router = Router();

//To store the Post of user
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploadedImage/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

//Add post of user
router.get("/add-blog", (req, res) => {
  return res.render("Addblog", {
    user: req.user,
  });
});

//for comment
router.post("/comments/:id", async (req, res) => {
  await Comments.create({
    content: req.body.content,
    createdBy: req.user._id,
    BlogId: req.params.id,
  });
  return res.redirect(`/blog/${req.params.id}`);
});

//Get the specific post
router.get("/:id", async (req, res) => {
  const Post = await BLOG.findById(req.params.id).populate("createdBy");
  const comment = await Comments.find({BlogId:req.params.id}).populate("createdBy")
  res.render("post", {
    user: req.user,
    Post,
    comment
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const Blog = await BLOG.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `/uploadedImage/${req.file.filename}`,
  });
  return res.redirect(`/blog/${Blog._id}`);
});

module.exports = router;
