// const messages = require('./messages/messages.service.js');
const messages = require('./messages/messages.service.js');
module.exports = function (app) {
  // app.configure(messages);
  app.configure(messages);
};
