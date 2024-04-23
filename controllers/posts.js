const Post = require("../models/post");
const { handleSuccess, handleError } = require("../service/handler");

const posts = {
  async getPosts({ res }) {
    const posts = await Post.find().sort({ createdAt: -1 });
    handleSuccess(res, "查詢成功", posts);
  },
  async createdPost({ body, res }) {
    try {
      const data = JSON.parse(body);
      // 手動檢查必填欄位
      if (!data.name || !data.content) {
        throw new Error("姓名及內容為必填");
      }
      const newPost = await Post.create({
        name: data.name,
        content: data.content.trim(),
        image: data.image,
        likes: data.likes || 0,
      });
      handleSuccess(res, "新增成功", newPost);
    } catch (error) {
      handleError(res, error.message);
    }
  },
  async deletePosts({ res }) {
    const posts = await Post.deleteMany({});
    handleSuccess(res, "全部刪除成功", posts);
  },
  async deletePost({ req, res }) {
    const id = req.url.split("/").pop();
    const deletePost = await Post.findByIdAndDelete(id);
    if (deletePost) {
      handleSuccess(res, "刪除成功", deletePost);
    } else {
      handleError(res, "查無此 id");
    }
  },
  async updatePost({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      const id = req.url.split("/").pop();
      // 手動檢查必填欄位
      if (!data.name || !data.content) {
        throw new Error("姓名及內容為必填");
      }
      // 更新資料庫並啟用驗證規則
      const updatePost = await Post.findByIdAndUpdate(
        id,
        {
          name: data.name,
          content: data.content.trim(),
          image: data.image,
          likes: data.likes || 0,
        },
        {
          // 返回更新後的資料
          new: true,
          // 啟用驗證規則
          runValidators: true,
        }
      );
      if (updatePost) {
        handleSuccess(res, "更新成功", updatePost);
      } else {
        throw new Error("查無此 id");
      }
    } catch {
      handleError(res, "查無此 id");
    }
  },
};

module.exports = posts;
