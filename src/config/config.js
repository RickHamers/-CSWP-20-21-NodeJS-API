// Rick Hamers - 2019-12-11 15:01
// config.js - application configuration 
'use strict';

/* Set the logging level */
const loglevel = process.env.LOGLEVEL || 'trace';

/*  Use secretkey from environment variables */
const secretkey = process.env.SECRETKEY || 'DOOFUS';

/* Export the class for use elsewhere */
module.exports = {
  secretkey: secretkey, // local variable
  webPort: process.env.PORT || 3000,

  /* Define usage of tracer module */
  logger: require('tracer')
    .console({
      format: [
        "{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}"
      ],
      preprocess: function(data) {
        data.title = data.title.toUpperCase();
      },
      dateformat: "isoUtcDateTime",
      level: loglevel
    })
};