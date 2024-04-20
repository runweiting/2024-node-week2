const mongoose = require("mongoose");
const dotenv = require("dotenv");

// 載入 config.env
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
// 連接到 mongoDB 本地端資料庫
mongoose.connect(DB).then(() => console.log("資料庫連接成功"));
