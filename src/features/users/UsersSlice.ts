import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../types/User';

interface InitialState {
  users:Array<User>,
  status?:string
}

export const getUsers = createAsyncThunk(
  'usersAPI/getUsers', 
 async () => {
   return fetch('https://fakestoreapi.com/users')
    .then((res)=>res.json())
 }
)

const initialState:InitialState = {users : []};           

export const userSlice = createSlice({
  name: 'usersAPI',
  initialState,
  extraReducers: (builder)=> {
    builder.addCase(getUsers.pending, (state,action) => {
      state.status = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state,action) => {
      if(state.users.length === 0) state.users = action.payload;
      state.status = "success";
    });
    builder.addCase(getUsers.rejected, (state,action) => {
      state.status = "failed";
    });
  },
  reducers:{
    addUser: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //state.value += 1
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      //state.value -= 1
      const { id , name, email } = action.payload;
      const existingUser = state.users.find((user:User) => String(user.id) === id);
      if(existingUser) {
        existingUser.name = name;
        existingUser.email = email
      }
    },
    deleteUser: (state, action) => {
      //state.value += action.payload
      const { id } = action.payload;
      
      const existingUser = state.users.find((user:User) => String(user.id) === id);

      if(existingUser){
        const list:Array<User> = state.users.filter((user:User) => String(user.id) !== id)
        state.users = list; 
      }
    },
  }
  },
)

// Action creators are generated for each case reducer function
export const { addUser, editUser, deleteUser } = userSlice.actions

export default userSlice.reducer