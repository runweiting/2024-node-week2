const Post = require("./models/post");
const headers = require("./corsHeader");
const successHandle = require("./successHandle");
const errorHandle = require("./errorHandle");
const routes = require("./routes");
require("./connections");

const app = async (req, res) => {
  routes(req, res);
};

module.exports = app;
