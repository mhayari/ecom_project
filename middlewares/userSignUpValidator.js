

exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req
      .check('email', 'Email must be between 3 to 32 characters')
      .notEmpty()
      .withMessage('Email is Required !')
      .isEmail()
      .isLength({
        min: 4,
        max: 32,
      });
    req.check('password').notEmpty()
      .isLength({ min: 6 })
      .withMessage('Password must contain at least 6 characters')
      // .matches(/\d/)
      .withMessage('Password must contain a number');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ error: errors[0].msg });
    }
    next();
  };