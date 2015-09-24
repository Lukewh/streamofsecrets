module.exports = function (secret) {
  var failures = [];
  var success = false;
  if (secret.length > 100) {
    failures.push('Secret longer than 100 characters');
  }

  if (failures.length === 0) {


    success = secret;
  }
  return {
    failures: failures.length > 0 ? failures : false,
    success: success
  };
};