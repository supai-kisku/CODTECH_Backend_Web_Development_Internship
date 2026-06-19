const router = require("express").Router();
const blog = require("../controllers/blogController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, blog.createBlog);
router.get("/", blog.getBlogs);
router.get("/:id", blog.getBlogById);
router.delete("/:id", auth, blog.deleteBlog);

module.exports = router;