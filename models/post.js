// 1. 匯入 mongoose
const mongoose = require("mongoose");
// 2. 建立 postSchema
const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "貼文姓名未填寫"],
    },
    content: {
      type: String,
      required: [true, "Content 未填寫"],
    },
    image: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);
// 3. 建立 Post model，連接 Post collection、帶入 postSchema
const Post = mongoose.model("Post", postSchema);
// 4. 匯出 Post
module.exports = Post;
