import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import firestoreSlice from './reducers/firestore'

import dataSlice from './reducers/dataSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    userData: firestoreSlice,
    allData: dataSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch