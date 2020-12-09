// Rick Hamers - 2128706
//mongo.db.js - mongoDB database configuration

/* Require necessary modules and files */
const mongoose = require('mongoose');
const { logger }  = require('./config');

/* Use ES6 promises instead of mongoose promise */
mongoose.Promise = global.Promise;

/* PRODUCTION */
if(process.env.NODE_ENV === 'production'){
    logger.info("\n" + '-=-=-=-=-=-=-=-=-=-=- Connecting to PRODUCTION database -=-=-=-=-=-=-=-=-=-=-');
    mongoose.connect('mongodb+srv://studdit:project@studditproject-oi4rl.azure.mongodb.net/CSWPBackend?retryWrites=true',
        {useNewUrlParser: true});

/* ONLINE-TESTING */
} else if(process.env.NODE_ENV === 'online-testing'){
    logger.info("\n" + '-=-=-=-=-=-=-=-=-=-=- Connecting to ONLINE TESTING database -=-=-=-=-=-=-=-=-=-=-');
        mongoose.connect('mongodb+srv://studdit:project@studditproject-oi4rl.azure.mongodb.net/CSWPBackendTest?retryWrites=true',
            {useNewUrlParser: true});

/* LOCAL DEVELOPMENT */
} else if(process.env.NODE_ENV === 'development'){
    logger.info("\n" + '-=-=-=-=-=-=-=-=-=-=- Connecting to DEVELOP database -=-=-=-=-=-=-=-=-=-=-');
    mongoose.connect('mongodb://localhost/CSWP_Mongo_DB',
        {useNewUrlParser: true});

/* LOCAL TESTING */
} else if(process.env.NODE_ENV === 'testing'){
    logger.info("\n" + '-=-=-=-=-=-=-=-=-=-=- Connecting to TESTING database -=-=-=-=-=-=-=-=-=-=-');
    mongoose.connect('mongodb://localhost/CSWP_Mongo_DB_Tests',
    {useNewUrlParser: true});
}

/* Mongoose connection to mongoDB database */
let connection = mongoose.connection
    .once('open', () => logger.info('-=-=-=-=-=-=-=-=-=-=- Connected to Mongo Database -=-=-=-=-=-=-=-=-=-=-' + '\n')) //connection succeeded
    .on('error', (error) => logger.error(error.toString())); // connection failed

/* Export the class for use elsewhere */
module.exports = connection;
