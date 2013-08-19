Soundcloud = {};

// Request Soundcloud credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Soundcloud.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'soundcloud'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();

  var loginUrl =
      'https://soundcloud.com/connect' +
      '?client_id=' + config.clientId +
      '&redirect_uri=' + Meteor.absoluteUrl('_oauth/soundcloud?close') +
      '&scope=non-expiring' +
      '&response_type=code_and_token' +
      '&display=popup' +
      '&state=' + credentialToken;

  Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};

var ready = false;
var readyDep = new Deps.Dependency;

Soundcloud.ready = function (){
  readyDep.depend();
  return ready;
};

Meteor.startup(function() {
  Deps.autorun(function() {
    if (Accounts.loginServicesConfigured()) {
      var config = ServiceConfiguration.configurations.findOne({service: 'soundcloud'});

      if (!config) {
        throw new Error("Soundcloud service is not configured");
      }

      SC.initialize({
        client_id: config.clientId
      });

      ready = true;
      readyDep.changed();
    }
  });
});