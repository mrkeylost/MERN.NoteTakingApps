const handleAsync = (fn, operation) => {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(`Error in ${operation} Controller`, error);
      next(error);
    }
  };
};

export default handleAsync;
