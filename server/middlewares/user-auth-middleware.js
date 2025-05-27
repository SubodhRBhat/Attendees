const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    err.status = 400;
    err.extraDetails = err.errors[0].message || "Validation error";
    next(err);
  }
};

module.exports = validate;
