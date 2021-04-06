const socketIO = require('socket.io');

const socketEvents = require('../socket/events');

const usersCtrl = require('../controllers/users');
const messagesCtrl = require('../controllers/messages');

module.exports = (http) => {

  const io = socketIO(http, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
      credentials: true,
    },
    allowEIO3: true
  });

  io.on('connection', socket => {
    console.log('New User Connected');

    /**
     * USER JOIN event
     */
    socket.on(socketEvents.incomming.JOIN.name, async data => {
      const userJoined = (response) => {
        //send success reponse to user
        socket.emit(socketEvents.outgoing.JOIN_SUCCESS.name, response);
      };

      try {
        if (data.mobileNumber){
          let user = await usersCtrl.getUserByMobileNumber(data.mobileNumber);
          await usersCtrl.markAsActive(user.id, socket);
          userJoined({
            user: { 
              id: user.id,
              mobileNumber: data.mobileNumber,
              name: data.name
            }
          });
        }
      } catch (err) {
        if (err && err === usersCtrl.errors.USER_NOT_FOUND){
          let userId = await usersCtrl.add({
            mobileNumber: data.mobileNumber,
            name: data.name,
            socket: socket
          });
          userJoined({
            user: { 
              id: userId,
              mobileNumber: data.mobileNumber,
              name: data.name
            }
          });
          socket.broadcast.emit(socketEvents.outgoing.USER_JOINED.name, {
            user: {
              mobileNumber: data.mobileNumber,
              name: data.name
            }
          });
        } else {
          console.log('There was some error while joining a user');
        }
      }
    });
    /**
     * END--USER JOIN event
     */

    /**
     * MESSAGE event
     */
    socket.on(socketEvents.incomming.MESSAGE.name, async data => {
      const messageId = await messagesCtrl.add(data);
      const messageObj = await messagesCtrl.get(messageId);

      try {
        const found = await usersCtrl.getUserByMobileNumber(data.to);
        if (found && found.socket) {
          found.socket.emit(socketEvents.outgoing.MESSAGE.name, messageObj);
        }
      } catch (e) {
        console.log('ERROR in finding user', e);
      }
    });
    /**
     * MESSAGE event
     */

    /**
     * USER DISCONNECT event
     */
    socket.on('disconnect', async () => {
      console.log('User Disconnected');
      // await usersCtrl.markAsDeactive()
    });
    /**
     * END--USER DISCONNECT event
     */
  });


};