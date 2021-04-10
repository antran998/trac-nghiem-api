const config = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || "localhost",
  db: {
    name: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
  },
  tokenSecret: process.env.TOKEN_SECRET,
};

module.exports = config;
