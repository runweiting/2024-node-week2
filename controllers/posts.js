const Post = require("../models/post");
const handleSuccess = require("../service/handleSuccess");
const handleError = require("../service/handleError");

const posts = {
  async getPosts({ req, res }) {
    // 先操控資料庫
    const post = await Post.find().sort({ createdAt: -1 });
    // 再回傳資料
    handleSuccess(res, post);
  },
  async createdPost({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      // 手動檢查必填欄位
      if (!data.name || !data.content) {
        // 拋出帶有錯誤消息的 Error 物件，Error 會向外層傳遞被 catch 捕捉
        throw new Error("姓名及內容為必填");
      }
      const newPost = await Post.create({
        name: data.name,
        content: data.content.trim(),
        image: data.image,
        likes: data.likes || 0,
      });
      handleSuccess(res, newPost);
    } catch (error) {
      handleError(res, error);
    }
  },
  async deletePosts(res) {
    await Post.deleteMany({});
    handleSuccess(res, null);
  },
  async deletePost({ req, res }) {
    try {
      const id = req.url.split("/").pop();
      const deletePost = await Post.findByIdAndDelete(id);
      if (deletePost == null) {
        throw new Error("查無此貼文");
      } else {
        handleSuccess(res, deletePost);
      }
    } catch (err) {
      handleError(res, err);
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
      if (updatePost == null) {
        throw new Error("查無此貼文");
      } else {
        handleSuccess(res, updatePost);
      }
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = posts;
