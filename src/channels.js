module.exports = function(app) {
  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('everybody').join(connection);
  });

 // Publish all events to the `everybody` channel
app.publish(() => app.channel('everybody'));
};