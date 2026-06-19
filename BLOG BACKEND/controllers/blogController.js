const db = require("../config/db");

exports.createBlog = (req, res) => {
  const { title, content } = req.body;

  db.query(
    "INSERT INTO blogs(title,content,user_id) VALUES(?,?,?)",
    [title, content, req.user.id],
    (err) => {
      if (err)
        return res.status(400).json(err);

      res.json({
        message: "Blog Created"
      });
    }
  );
};

exports.getBlogs = (req, res) => {
  db.query(
    `SELECT blogs.*, users.name
     FROM blogs
     JOIN users ON blogs.user_id = users.id`,
    (err, results) => {
      res.json(results);
    }
  );
};

exports.getBlogById = (req, res) => {
  db.query(
    "SELECT * FROM blogs WHERE id=?",
    [req.params.id],
    (err, result) => {
      res.json(result);
    }
  );
};

exports.deleteBlog = (req, res) => {
  db.query(
    "DELETE FROM blogs WHERE id=?",
    [req.params.id],
    (err) => {
      res.json({
        message: "Blog Deleted"
      });
    }
  );
};