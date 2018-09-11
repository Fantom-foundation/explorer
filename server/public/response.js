module.exports.sendSuccess = function (data, res) {
  res.statusCode = 200;
  const statusData = 1;
  res.json({
    status: statusData.toString(),
    result: data,
    message: ' OK ',
  });
  res.end();
};

module.exports.sendError = function (data, res) {
  res.statusCode = 500;
  const statusData = 1;
  res.json({
    status: statusData.toString(),
    message: ' OK ',
    result: data.toString(),
  });
  res.end();
};
module.exports.apiError = function (data, res) {
  res.statusCode = 404;
  const statusData = 0;
  res.json({
    status: statusData.toString(),
    message: ' NOTOK ',
    result: data.toString(),
  });
  res.end();
};
