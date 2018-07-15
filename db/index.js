let users = [
  { id: 1, name: 'moe' },
  { id: 2, name: 'larry' },
  { id: 3, name: 'curly' },
];

const findAllUsers = ()=> {
  return users;
};

const resetUsers = ()=> {
  users = [
    { id: 1, name: 'moe' },
    { id: 2, name: 'larry' },
    { id: 3, name: 'curly' },
  ];
}

const findUser = (id)=> users.find(user => user.id === id);

const createUser = (name)=> {
  let maxId = users.reduce((max, user)=> {
    if(user.id > max){
      max = user.id;
    }
    return max;
  }, 0);
  const user = { id: ++maxId, name };
  users.push(user);
  return user;
};

const deleteUser = (id)=> {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  deleteUser,
  findAllUsers,
  findUser,
  createUser,
  resetUsers
};
