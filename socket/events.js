const incomming = module.exports.incomming = {
  JOIN: {
    name: 'JOIN',
    description: 'Joining of a new user',
    data: {
      mobileNo: 'Unique mobile no'
    }
  },
  MESSAGE: {
    name: 'SEND_MESSAGE',
    description: 'A user sends a message to another user',
    data: {
      from: 'mobileNumber unique ID',
      to: 'mobileNumber of the receiver',
      message: 'message'
    }
  }
};

const outgoing = module.exports.outgoing = {
  JOIN_SUCCESS: {
    name: 'JOIN_SUCCESS',
    description: 'A user joined successfully - confirmation response',
    data: {}
  },
  USER_JOINED: {
    name: 'USER_JOINED',
    description: 'Broadcast to inform everyone about the new user',
    data: {
      user: {
        mobileNumber: 'mobileNumber of the newly joined user'
      }
    }
  },
  MESSAGE: {
    name: 'RECEIVE_MESSAGE',
    description: 'Send message to the receiver',
    data: {
      from: 'mobileNumber of the sender',
      to: 'mobileNumber of the receiver',
      message: 'message'
    }
  }
};