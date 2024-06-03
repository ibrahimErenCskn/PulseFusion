import React from 'react'
import { Slot } from 'expo-router'
import 'expo-dev-client'
import { Provider } from 'react-redux'
import { store } from '@/services/redux/store'
import '../services/i18/i18next'

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  )
}