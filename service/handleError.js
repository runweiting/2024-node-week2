const headers = require("./corsHeader");
function handleError(res, error) {
  // headersSent 是 http.ServerResponse 的一個屬性為布林值，用於檢查 res 的 headers 是否已發送，已發送 true，否為 false，在 Express 中，res 是 http.ServerResponse 的擴展，因此也具有 headersSent 屬性
  if (!res.headersSent) {
    res.writeHead(400, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: error || "An error occurred",
      })
    );
    res.end();
  }
}

module.exports = handleError;
