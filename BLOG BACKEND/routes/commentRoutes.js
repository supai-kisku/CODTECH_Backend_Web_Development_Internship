const router = require("express").Router();
const comment = require("../controllers/commentController");
const auth = require("../middleware/authMiddleware");

router.post("/:blogId", auth, comment.addComment);
router.get("/:blogId", comment.getComments);

module.exports = router;