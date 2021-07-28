import { userReducer } from './user-reducer';

test('user reducer should increment only age', () => {

   const startState = { age: 34, childrenCount: 2, name: 'Vladimir' };

   const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

   expect(endState.age).toBe(35);

   expect(endState.childrenCount).toBe(2);

});

test('user reducer should increment only childrenCount', () => {

   const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

   const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-AGE'});

   expect(endState.age).toBe(20);

   expect(endState.childrenCount).toBe(3);

});

test('user reducer should change name of user', () => {

   const startState = { name: 'Dimych', age: 20, childrenCount: 2 };

   const newName = 'Victor';

   const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName})

   expect(endState.name).toBe(newName);

});