const app = require('./server');
const { connect, onConnect } = require('./persist/connect');

onConnect(() => {
  app.listen(8080, () => {
    console.log('serving on port 8080');
  });
});

try {
  connect();
} catch (err) {
  console.log(err);
  throw "couldn't start";
}
