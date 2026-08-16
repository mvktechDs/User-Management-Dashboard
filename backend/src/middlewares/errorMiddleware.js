const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  if (err.name === 'CastError') {
    const message = `Invalid resource identifier format`;
    return res.status(404).json({
      success: false,
      message,
      error: {
        code: 'RESOURCE_NOT_FOUND'
      }
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `A user with that ${field} already exists`;
    return res.status(409).json({
      success: false,
      message,
      error: {
        code: 'DUPLICATE_KEY_ERROR',
        field: field
      }
    });
  }

  if (err.name === 'ValidationError') {
    const details = {};
    Object.keys(err.errors).forEach((key) => {
      details[key] = err.errors[key].message;
    });

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: {
        code: 'VALIDATION_ERROR',
        details
      }
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    error: {
      code: error.code || 'Internal server error'
    }
  });
};

module.exports = errorHandler;
