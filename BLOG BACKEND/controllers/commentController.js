const db = require("../config/db");

exports.addComment = (req, res) => {
  const { comment } = req.body;

  db.query(
    "INSERT INTO comments(comment,blog_id,user_id) VALUES(?,?,?)",
    [comment, req.params.blogId, req.user.id],
    (err) => {
      if (err)
        return res.status(400).json(err);

      res.json({
        message: "Comment Added"
      });
    }
  );
};

exports.getComments = (req, res) => {
  db.query(
    `SELECT comments.*, users.name
     FROM comments
     JOIN users ON comments.user_id = users.id
     WHERE blog_id=?`,
    [req.params.blogId],
    (err, result) => {
      res.json(result);
    }
  );
};