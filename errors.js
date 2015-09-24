module.exports = {
  NO_BODY: {
    error: {
      code: 'NO_BODY',
      message: 'You didn\'t send a body'
    }
  },
  NO_SECRET: {
    error: {
      code: 'NO_SECRET',
      message: 'You didn\'t tell a secret'
    }
  },
  VALIDATION_ERROR: function (errors) {
    return {
      error: {
        code: 'VALIDATION_ERROR',
        message: 'The following criteria wasn\'t met: \n- ' + errors.join('\n- ')
      }
    }
  }
};