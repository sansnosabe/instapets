const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery");
const selectPostsByUserIdQuery = require("../../db/queries/posts/selectPostsByUserIdQuery");
const deleteUserQuery = require("../../db/queries/users/deleteUserQuery");
const { deleteImg } = require("../../helpers");

const deleteUser = async (req, res, next) => {
  try {
    const user = await selectUserByIdQuery(req.user.id);
    const posts = await selectPostsByUserIdQuery(req.user.id);

    if (user.avatar && posts[0].image) {
      await deleteImg(user.avatar);
      await deleteImg(posts[0].image);
    }

    await deleteUserQuery(req.user.id);

    res.send({
      code: 200,
      status: "ok",
      message: "Usuario eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteUser;
