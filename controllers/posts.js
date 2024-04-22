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
      // 檢查必填欄位
      if (!data.name || !data.content) {
        handleError(res, "姓名及內容為必填");
      }
      await Post.create({
        name: data.name,
        content: data.content,
        image: data.image,
        likes: data.likes || 0,
      });
      const post = await Post.find();
      handleSuccess(res, post);
    } catch (error) {
      handleError(res, error);
    }
  },
  async deletePosts(res) {
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
      if (!data.name || !data.content) {
        handleError(res, "姓名及內容為必填");
      }
      await Post.findByIdAndUpdate(id, {
        name: data.name,
        content: data.content,
        image: data.image,
        likes: data.likes || 0,
      });
      const post = await Post.find();
      handleSuccess(res, post);
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = posts;
