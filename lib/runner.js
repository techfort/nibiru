'use strict';

const path = require('path');


const context = {
  callbackWaitsForEmptyEventLoop: true,
  done: (err, result) =>{
    if (err) {
      console.error(err);
    } else {
     console.log(result);
    }
  },
  succeed: (result) => context.done(null, result)
};

module.exports = (config, func, event) => {
  const funcConfig = config['functions'][func];
  if (!funcConfig) {
    throw new Error('Function does not seem to exist');
  }
  let file, method;
  let chunks = funcConfig.handler.split('.');
  file = chunks[0];
  method = chunks[1];
  const mod = require(path.join(config.base || '', file));
  let cb = context.done;
  mod[method].apply(null, [event || {}, context, cb]);

};
