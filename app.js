const app = require('express')();
const http = require('http').Server(app);

// Enable the CORS
const cors = require('cors');
app.use(cors());

// routes
app.use('/', require('./routes'));

// socket
require('./socket/index')(http);

const PORT = 5000;
const server = http.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
