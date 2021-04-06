let userCounter = 0;

const users = [];

const errors = module.exports.errors = {
  USER_NOT_FOUND: 'User not found'
};

const add = module.exports.add = async (user) => {
  const userObj = {
    ...user,
    id: ++userCounter,
    createdAt: new Date(),
  };
  users.push(user);

  console.log(users.length);
  return userObj.id;
};

const list = module.exports.list = async (opts = {}) => {
  return users.map(u => ({
    id: u.id,
    mobileNumber: u.mobileNumber,
    name: u.name,
    isActive: u.socket ? true : false
  }));
};

const getUserById = module.exports.getUserById = async (userId) => {
  const found = users.find(u => u.id === userId);
  if (found)
    return found;
  else 
    throw errors.USER_NOT_FOUND;
}

const getUserByMobileNumber = module.exports.getUserByMobileNumber = async (mobileNumber) => {
  const found = users.find(u => u.mobileNumber === mobileNumber);
  if (found)
    return found;
  else 
    throw errors.USER_NOT_FOUND;
}

const markAsActive = module.exports.markAsActive = async (userId, socket) => {
  const found = await getUserById(userId);
  found.socket = socket;
  return true;
};

const markAsDeactive = module.exports.markAsDeactive = async (userId) => {
  const found = await getUserById(userId);
  delete found.socket;
  return true;
};