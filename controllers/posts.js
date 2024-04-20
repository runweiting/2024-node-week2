const Post = require("../models/post");
const successHandle = require("../service/successHandle");
const errorHandle = require("../service/errorHandle");

const posts = {
  async getPosts(req, res) {
    // 先操控資料庫
    const post = await Post.find();
    // 再回傳資料
    successHandle(res, post);
  },
};

module.exports = posts;
