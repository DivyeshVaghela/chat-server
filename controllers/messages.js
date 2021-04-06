let messageCounter = 0;

const messageList = []

const errors = module.exports.errors = {
  MESSAGE_NOT_FOUND: 'Message not found'
};

const add = module.exports.add = async (message) => {
  const messageObj = {
    ...message,
    id: ++messageCounter,
    date: new Date()
  };
  messageList.push(messageObj);

  return messageObj.id;
};

const get = module.exports.get = async (messageId) => {
  const found = messageList.find(m => m.id === messageId);
  if (found)
    return found;
  else 
    throw errors.MESSAGE_NOT_FOUND;
}

const list = module.exports.list = async (opts = {}) => {
  if (Object.keys(opts).length){
    const messages = [];
    return messageList.filter(m => {
      let shouldInclude = true;

      if (opts.from && opts.to){
        shouldInclude = (m.from == opts.from && m.to == opts.to) || (m.from == opts.to && m.to == opts.from)
      }

      return shouldInclude;
    }).reverse();
  } else {
    return messageList;
  }
};