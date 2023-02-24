const getDB = require("../../getDB");

const { generateError } = require("../../../helpers");

const selectPostsByUserIdQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();
    const [userPosts] = await connection.query(`SELECT id, text, image FROM posts WHERE id_user = ?`, [idUser]);

    if (userPosts.length < 1) {
      return generateError("Usuario no tiene posts", 404);
    }

    return userPosts;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectPostsByUserIdQuery;