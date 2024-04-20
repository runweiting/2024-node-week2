const headers = require("./corsHeader");
function errorHandle(res, error) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "false",
      message: error,
    })
  );
  res.end();
}

module.exports = errorHandle;
