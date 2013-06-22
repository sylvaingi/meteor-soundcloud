Package.describe({
  summary: "SoundCloud SDK and OAuth login service for Meteor"
});

Package.on_use(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');

  api.add_files(
    ['soundcloud_configure.html', 'soundcloud_configure.js'],
    'client');

  api.add_files('soundcloud_common.js', ['client', 'server']);
  api.add_files('soundcloud_server.js', 'server');
  api.add_files(['soundcloud_client.js', 'sdk.js'], 'client');
});
