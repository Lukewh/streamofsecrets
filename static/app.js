;(function () {
  var Secrets = function () {
    this.secrets = [];
  };
  Secrets.prototype.add = function (secret) {

  };
  Secrets.prototype.update = function (secret) {
    this.secrets.push(secret);
    var $secrets = document.querySelector('.secrets');
    var $secret = document.createElement('div');
    $secret.innerHTML = '<div class="secret-wrap"><div class="secret">' + secret.message + '<br /><small>- anon</small></div></div>';
    $secrets.insertBefore($secret, $secrets.firstChild);
  };

  var secrets = new Secrets();

  io = io.connect();

  io.on('new', function (data) {
    secrets.update(data);
  });

  var $secretInput = document.querySelector('.secretInput');
  var $secretSender = document.querySelector('#secretSender');

  $secretSender.addEventListener('submit', function (e) {
    e.preventDefault();
    var secret = $secretInput.value;
    var div = document.createElement('div');
    div.innerHTML = secret;
    io.emit('post', div.textContent);
    $secretInput.value = '';
  }, false);
  //io.emit('ready');

  /*io.on('new visitor', function() {
    $('body').append('<p>New visitor, hooray! ' + new Date().toString() +'</p>')
  })*/
})();