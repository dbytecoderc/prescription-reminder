export default (schema, slice) => {
  return async (req, res, next) => {
    try {

      await schema.validateAsync(req[slice], {
        abortEarly: false,
        language: {
          key: '{{key}}',
        },
      });

      next();
    } catch (error) {
      if (error) {
        const validationErrors = {};

        error.details.forEach((errorItem) => {
          const index = errorItem.message.indexOf(' ');
          const key = errorItem.message
            .substr(0, index)
            .replace(/[^a-zA-Z_[\] ]/g, '');

          if (key in validationErrors) {
            validationErrors[key].push(
              errorItem.message.replace(/[^a-zA-Z_[\] ]/g, ''),
            );
          } else {
            validationErrors[key] = [
              errorItem.message.replace(/[^a-zA-Z_[\] ]/g, ''),
            ];
          }
        });

        return res.status(422).json({
          success: false,
          message: 'Validation Errors',
          errors: validationErrors,
        });
      }
    }
  };
}