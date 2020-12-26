const notFound = (req, res, next) => {
  const err = new Error('Not found.')
  err.status = 404;
  next(err);
};

const errorRoute = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({error: {
      status: err.status || 500,
      message: err.message
  }})
};


module.exports = {
    notFound: notFound,
    errorRoute: errorRoute
}