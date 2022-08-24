import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/UserSlice'
import usersAPI from '../features/users/UsersSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    usersAPI: usersAPI
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch