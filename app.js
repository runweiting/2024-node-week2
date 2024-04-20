const Post = require("./models/post");
const headers = require("./corsHeader");
const successHandle = require("./successHandle");
const errorHandle = require("./errorHandle");
require("./connections");

const app = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  if (req.url == "/posts" && req.method == "GET") {
    // 先操控資料庫邏輯
    const post = await Post.find();
    // 再回傳資料
    successHandle(res, post);
  } else if (req.url == "/posts" && req.method == "POST") {
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        if (data.content !== undefined) {
          const newPost = await Post.create({
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
    });
  } else if (req.url == "/posts" && req.method == "DELETE") {
    await Post.deleteMany({});
    successHandle(res, null);
  } else if (req.url.startsWith("/posts/") && req.method == "DELETE") {
    const id = req.url.split("/").pop();
    await Post.findByIdAndDelete(id);
    const post = await Post.find();
    successHandle(res, post);
  } else if (req.url.startsWith("/posts/") && req.method == "PATCH") {
    req.on("end", async () => {
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
    });
  } else if (req.url == "/posts" && req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

module.exports = app;
