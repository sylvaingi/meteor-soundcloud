## meteor-soundcloud

SoundCloud for Meteor

### Installation
Add the soundcloud package with [Meteorite](https://github.com/oortcloud/meteorite/) using the following command:

``` sh
$ mrt add soundcloud
```

### API

This package includes the official SoundCloud SDK, its documentation can be found here: http://developers.soundcloud.com/docs/api/sdks#javascript

If you configured your Client ID and Client Secret using either the accounts-ui package or manually (http://docs.meteor.com/#meteor_loginwithexternalservice) the `SC.initialize` call will automatically be made. The Soundcloud object exposes the `ready()` reactive variable in order to track the SDK initialization state.

### Credits
* [@mataspetrikas](https://github.com/mataspetrikas) for the original SoundCloud accounts port
