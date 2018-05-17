const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  logger = require('./lib/util/logger'),
  httpLogger = logger.getLogger('access'),
  appLogger = logger.getLogger('system'),
  accessLogger = morgan("combined",{
    "stream": {
      write: function(str) { httpLogger.debug(str); }
    }
  }),
  port = 3000 | process.env.PORT;

const sample = require('./routes/sample/sample');

// for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(accessLogger);
app.use(bodyParser.json());

app.use('/v1/sample', sample);

app.listen(port, () => {
  appLogger.info('server listening on port ' + port);
});

module.export = app;
