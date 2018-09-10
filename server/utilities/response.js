module.exports.sendSuccess = function (data, res) {
  res.statusCode = 200;
  res.json({
    status: 1,
    result: data,
    message: ' OK ',
  });
  res.end();
};

module.exports.sendError = function (data, res) {
  res.statusCode = 500;
  res.json({
    status: 1,
    message: ' OK ',
    result: data,
  });
  res.end();
};
module.exports.apiError = function (data, res) {
  res.statusCode = 404;
  res.json({
    status: 0,
    message: ' NOTOK ',
    result: data,
  });
  res.end();
};
