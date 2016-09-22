'use strict';

module.exports.test = (event, context, cb) => {
  cb(null, {
    message: 'Success',
    result: event
  }); 
};
