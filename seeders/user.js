const bcrypt = require("bcryptjs");

const userSeeding = (db) => {
  const password = bcrypt.hashSync("123456", 12);
  return db.user.bulkCreate([
    {
      email: "tony123@gmail.com",
      name: "Tony Nguyen",
      phone: "0123456789",
      password,
      roleId: 1,
    },
    {
      email: "hawk123@gmail.com",
      name: "Hawk Nguyen",
      phone: "0123456789",
      password,
      roleId: 2,
    },
  ]);
};

module.exports = userSeeding;
