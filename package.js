Package.describe({
  summary: "SoundCloud SDK and OAuth login service for Meteor"
});

Package.on_use(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', 'server');
  api.use('templating', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);
  api.use('deps', 'client');

  api.export('Soundcloud');

  api.add_files(
    ['soundcloud_configure.html', 'soundcloud_configure.js'],
    'client');

  api.add_files('soundcloud_server.js', 'server');
  api.add_files(['soundcloud_client.js', 'sdk.js'], 'client');
});
