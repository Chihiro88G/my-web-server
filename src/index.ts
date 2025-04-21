import { User } from "./models/User";

const user = new User({name: "sdfsd", age: 100});

user.set({name: "chihiro"})

console.log(user.get('name'));
console.log(user.get('age'));

// e.g. in case creating a new user who is not registered yet
// const newUser = new User({});
// console.log(newUser.get('name'));
// console.log(newUser.get('age'));

user.on('change', () => {
  console.log('Change #1');
});

user.on('change', () => {
  console.log('Change #2');
});

user.on('save', () => {
  console.log('Save for some reason');
});

user.triger('change');