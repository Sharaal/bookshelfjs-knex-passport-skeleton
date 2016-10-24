module.exports = (bookshelf) => {
  const User = bookshelf.Model.extend({
    tableName: 'users',
    serialize: async function serialize() {
      return this.get('id');
    },
  }, {
    deserialize: async id => await new User({ id }).fetch(),
    login: async (username, password) => {
      const user = await new User({ username }).fetch();
      if (user.get('password') !== password) {
        return null;
      }
      return user;
    },
  });
  return User;
};
