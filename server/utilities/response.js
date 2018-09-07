module.exports.sendSuccess = function (data, res) {
  res.statusCode = 200;
  res.json({
    status: 200,
    result: data,
    message: ' OK ',
  });
  res.end();
};

module.exports.sendError = function (data, res) {
  res.statusCode = 500;
  res.json({
    status: 500,
    message: data,
  });
  res.end();
};
module.exports.apiError = function (data, res) {
  res.statusCode = 404;
  res.json({
    status: 404,
    message: data,
  });
  res.end();
};
