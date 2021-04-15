// const { Rating_Like } = require("../models");
// const likeControllers = {
//   addLike: (req, res) => {
//     Rating_Like.create({
//       UserId: req.userId,
//       PostId: req.body.postId,
//     })
//       .then(() => {
//         return res.json({ success: true, message: "Like!" });
//       })
//       .catch((err) => {
//         return res.status(500).json({ success: false, err });
//       });
//   },
// };

// module.exports = likeControllers;
