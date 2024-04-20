const headers = require("../service/corsHeader");
const http = {
  // cors 預檢
  cors(req, res) {
    res.writeHead(200, headers);
    res.end();
  },
  // 404
  notFound(req, res) {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  },
};

module.exports = http;
