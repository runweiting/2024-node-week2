const headers = require("./corsHeader");
// post 預設為 null
function handleSuccess(res, message, post = null) {
  const data = {
    status: "success",
    message,
  };
  // 若有 post 則加入 data 回饋訊息
  if (post) {
    data.post = post;
  }
  res.writeHead(200, headers);
  res.write(JSON.stringify(data));
  res.end();
}

function handleError(res, message, statusCode = 400) {
  const data = {
    status: "failed",
    message,
  };
  res.writeHead(statusCode, headers);
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = { handleSuccess, handleError };
