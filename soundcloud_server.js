Soundcloud = {};

//see http://developers.soundcloud.com/docs/api/reference#me
Soundcloud.whitelistedFields = ['id','username','permalink_url','avatar_url','country',
                      'full_name','city','description','website'];

Oauth.registerService('soundcloud', 2, null, function(query) {
  var accessToken = getAccessToken(query);
  var identity = getIdentity(accessToken);

  var serviceData = {
    accessToken: accessToken
  };

  var scFields = _.pick(identity, Soundcloud.whitelistedFields);
  _.extend(serviceData, scFields);

  return {
    serviceData: serviceData,
    options: {profile: {name: identity.full_name}}
  };
});

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'soundcloud'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var response;
  try {
     response = Meteor.http.post("https://api.soundcloud.com/oauth2/token", {
      headers: {Accept: 'application/json'},
      params: {
        code: query.code,
        grant_type: "authorization_code",
        client_id: config.clientId,
        client_secret: config.secret,
        redirect_uri: Meteor.absoluteUrl("_oauth/soundcloud?close"),
        state: query.state
      }
    });
  } catch (err) {
    throw new Error("Failed to complete OAuth handshake with Soundcloud. " + err.message);
  }

  if (response.data.error) // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Soundcloud. " + response.data.error);

  return response.data.access_token;
};

var getIdentity = function (accessToken) {
  try {
    return Meteor.http.get("https://api.soundcloud.com/me", {
      params: {
        oauth_token: accessToken,
        format: "json"
      }
    }).data;
  } catch (err) {
    throw new Error("Failed to fetch identity from Soundcloud. " + err.message);
  }
};

Soundcloud.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};