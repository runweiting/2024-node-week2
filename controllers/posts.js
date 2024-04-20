const Post = require("../models/post");
const successHandle = require("../service/successHandle");
const errorHandle = require("../service/errorHandle");

const posts = {
  async getPosts({ req, res }) {
    // 先操控資料庫
    const post = await Post.find();
    // 再回傳資料
    successHandle(res, post);
  },
  async createdPost({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      if (data.content !== undefined) {
        await Post.create({
          name: data.name,
          content: data.content,
        })
          .then(() => {
            console.log("資料更新成功");
          })
          .catch((err) => {
            console.log(err);
          });
        const post = await Post.find();
        successHandle(res, post);
      } else {
        errorHandle(res);
      }
    } catch (error) {
      errorHandle(res, error);
    }
  },
  async deletePosts() {
    await Post.deleteMany({});
    successHandle(res, null);
  },
  async deletePost({ req, res }) {
    const id = req.url.split("/").pop();
    await Post.findByIdAndDelete(id);
    const post = await Post.find();
    successHandle(res, post);
  },
  async updatePost({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      const id = req.url.split("/").pop();
      if (data.content !== undefined) {
        await Post.findByIdAndUpdate(id, {
          name: data.name,
          content: data.content,
        })
          .then(() => {
            console.log("資料更新成功");
          })
          .catch((err) => {
            console.log(err);
          });
        const post = await Post.find();
        successHandle(res, post);
      } else {
        errorHandle(res);
      }
    } catch (error) {
      errorHandle(res, error);
    }
  },
};

module.exports = posts;
