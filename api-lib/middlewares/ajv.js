import Ajv from 'ajv';

//good practice to validate all income request bodies
//json schmea->creates ajv validate function->return middleware

export function validateBody(schema) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validate(req.body);
    if (valid) {
      return next();
    } else {
      const error = validate.errors[0];
      return res.status(400).json({
        error: {
          message: `"${error.instancePath.substring(1)}" ${error.message}`,
        },
      });
    }
  };
}
