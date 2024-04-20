const Post = require("../models/post");
const handleSuccess = require("../service/handleSuccess");
const handleError = require("../service/handleError");

const posts = {
  async getPosts({ req, res }) {
    // 先操控資料庫
    const post = await Post.find();
    // 再回傳資料
    handleSuccess(res, post);
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
        handleSuccess(res, post);
      } else {
        handleError(res);
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  async deletePosts() {
    await Post.deleteMany({});
    handleSuccess(res, null);
  },
  async deletePost({ req, res }) {
    const id = req.url.split("/").pop();
    await Post.findByIdAndDelete(id);
    const post = await Post.find();
    handleSuccess(res, post);
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
        handleSuccess(res, post);
      } else {
        handleError(res);
      }
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = posts;
