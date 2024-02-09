import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import themeChange from './reducers/themeChange'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeChange
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch