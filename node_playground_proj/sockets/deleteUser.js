const knex = require('../db/knex');

const deleteUser = async (socket, io) => {
  try {
    socket.on('deleteUser', async id => {
      console.log('heard deleteUser request', id);
      await knex('users')
        .delete()
        .where('id', id);
      console.log(`user with id ${id} deleted`);
      const users = await knex('users').select();
      io.emit('usersSocket', users);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = deleteUser;
