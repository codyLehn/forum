const mongoose = require('mongoose');
const db = mongoose.connection;

async function connect(user, pass, host, db_name, port) {
  let connectString = `mongodb+srv://user:pass@cluster0.kygdq0t.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log('error connecting to mongoose', err);
  }
}
function onConnect(callback) {
  db.once('open', () => {
    console.log('mongo connection open');
    callback();
  });
}

module.exports = {
  connect,
  onConnect,
};
