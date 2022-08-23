import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: Array<User> = [
  { id: '1', name: 'Amanda', email: 'amanda@mail.com'},
  { id: '2', name: 'Renan', email: 'renan@mail.com'},
  { id: '3', name: 'Alberto', email: 'alberto@mail.com'}
];

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //state.value += 1
      state.push(action.payload);
    },
    editUser: (state, action) => {
      //state.value -= 1
      const { id , name, email } = action.payload;
      const existingUser = state.find((user:User) => user.id === id);
      if(existingUser) {
        existingUser.name = name;
        existingUser.email = email
      }
    },
    deleteUser: (state, action) => {
      //state.value += action.payload
      const { id } = action.payload;
      const existingUser = state.find((user:User) => user.id === id);
      if(existingUser){
        return state.filter((user:User) => user.id !== id)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, editUser, deleteUser } = userSlice.actions

export default userSlice.reducer