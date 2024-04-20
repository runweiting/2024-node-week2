const headers = require("./corsHeader");
function handleSuccess(res, post) {
  res.writeHead(200, headers);
  res.write(
    JSON.stringify({
      status: "success",
      data: post,
    })
  );
  res.end();
}

module.exports = handleSuccess;
