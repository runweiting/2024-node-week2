# Node.js NPM 整合 MongoDB 開發流程

## A. 撰寫 Node web server 連線至 mongoDB 本地端資料庫
### 1. 建立環境
   1. 建立 Node 資料夾
   `npm init`
   2. 建立 MongoDB 資料夾
      - data
      - logs
      - mongo.log
---
### 2. 安裝 mongoose
      `npm install mongoose`
---
### 3. 建立 server.js
   1. 載入 **"http" 核心模組**
   2. 載入 **"mongoose" 核心模組**
   3. 連線至 mongoDB 預設本地端資料庫位置
      ```
      mongoose
      .connect("mongodb://localhost:27017/自動新增資料庫")
      .then(() => console.log('資料庫連接成功'));
      .catch((err) => console.log(err.reason, "資料庫連線失敗"))
   4. 建立 **requestListener** 函式
      ```
      const requestListener = async(req, res)=>{
         ...
         res.end();
      }
      ```
   5. 建立 **http.createServer**
   6. **server.listen** 監聽來自使用者的連線請求：透過環境變數 "process.env.PORT" 監聽指定端口，若未指定，則使用預設端口 3005
---
### 4. 從 Node.js 連線至 mongoDB 本地端資料庫
   1. mongod
      `mongod --dbpath data 資料夾路徑--logpath mongo.log 資料夾路徑`
   2. mongosh
      `mongosh`
   3. `nodemon server.js`
---
### 5. 建立 corsHeader.js、successHandle.js、errorHandle.js
   1. 建立、匯入 **corsHeader.js**
      const headers = {
         "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
         "Content-Type": "application/json",
      };
   2. 建立、匯入 **successHandle.js**   
      - 匯入 corsHeader
      ```
      res.writeHead(200, headers)
      res.write(JSON.stringify({
         "status": "success",
         "data": todos
      }))
      res.end()
      ```
   3. 建立、匯入 **errorHandle.js**
      - 匯入 corsHeader
      ```
      res.writeHead(400, headers)
      res.write(JSON.stringify({
         "status": "false",
         "message": "欄位未填寫正確，或無此 todo id"
      }))
      res.end()
      ```
---
### 6. 撰寫 requestListener async 函式
   1. 建立接收資料用的 **body 空字串**
   2. 建立接收資料用的 **request.on 'data' 事件**
      - 將 chunk 累加成 body
   3. 先建立 **GET, OPTIONS, 404** 網路請求
      - if else 判斷 req.url && req.method
      - GET: await Post.find();
      - successHandle(res, post)
   4. 建立 **POST** 網路請求
      1. 建立接收資料用的 **request.on 'end' async 事件**
      2. 使用 *try catch* 捕捉異常事件
         - _*try*_
            1. *<span style="color:#54FA80">將字串 body 轉成 JSON 格式，以判斷 request 傳來資料是否為 JSON 格式？</span>*
            2. *<span style="color:#54FA80">if 判斷 data.content 是否為 undefined？</span>*
               - 否
                  建立 newPost await Post.create({ 新增資料 })
                  successHandle(res, newPost)
               else
                  - `errorHandle(res)`
         - _*catch*_
            `errorHandle(res, error)`
   5. 建立 **DELETE 刪除所有**的網路請求
      - await Post.deleteMany({})
      - successHandle(res, null)
   6. 建立 **DELETE 刪除單筆** 的網路請求
      - *<span style="color:#54FA80">利用 `startsWith("/todos/")` 判斷是否為指定項目路由？</span>*
      - 利用 `split('/').pop()` 帶出指定項目路由的 id
      - await Post.findByIdAndDelete(id)
      - successHandle(res, null)
   7. 建立 **PATCH 編輯單筆** 網路請求
      1. *<span style="color:#54FA80">利用 `startsWith("/todos/")` 判斷是否為指定項目路由？</span>*
      2. 建立接收資料用的 **request.on 'end' async 事件**
      3. 使用 *try catch* 捕捉異常事件
         - _*try*_
            1. *<span style="color:#54FA80">將字串 body 轉成 JSON 格式，以判斷 request 傳來資料是否為 JSON 格式？</span>*
            2. 利用 `split('/').pop()` 帶出指定項目路由的 id
            3. *<span style="color:#54FA80">if 判斷 data.content 是否為 undefined？</span>*
               - 否
                  建立 updatePost await Post.findByIdAndUpdate(id, { 修改資料 })
                  successHandle(res, updatePost)
               else
                  `errorHandle(res)`
         - _*catch*_
            `errorHandle(res, error)`
---


## B. 改成連線至 mongoDB 遠端資料庫
### 1. 安裝 dotenv
   1. `npm install dotenv`
   2. 建立 **config.env**
      - PORT=3005
      - DATABASE=mongodb+srv://runweiting:<password>@cluster0.3hr0gmk.mongodb.net/新增DB名稱?retryWrites=true&w=majority&appName=Cluster0
      - DATABASE_PASSWORD=密碼
   3. 載入 **dotenv**
   4. 匯入 **config.env**
      - dotenv.config({ path: "./config.env" });
      const DB = process.env.DATABASE.replace(
         "<password>",
         process.env.DATABASE_PASSWORD
      );
---
### 2. 連線至 mongoDB 遠端資料庫
      - mongoose.connect(DB)
---

## C. 將 Node web server 部屬至 Render 主機
### 1. 建立 .gitignore
      `
         *.env
         node_modules
         .DS_Store
      `
### 2. git init、git add .、git status
   1. git status 確認 ignore 是否正確忽略
   2. 建立新的 Git repo
   3. git commit -m "建立環境"
   4. 連線至遠端 Git repo
### 3. 前往 Render 建立 Web Service
   1. build and deploy from a Git repo
   2. Build Command
      `$npm install`
   3. Start Command
      `$node server.js`
   4. package.json 的 "script" 新增屬性 "start"
      `
      "scripts": {
         "start": "node server.js"
      },
      `
   5. 加入環境變數
      - add from .env
      - 貼上 config.env
      - 本地端 PORT 號不用加入
