import { createSlice } from '@reduxjs/toolkit'

export interface ThemeChangeProps {
    value: string
}

const initialState: ThemeChangeProps = {
    value: 'default',
}

export const themeChange = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setTheme } = themeChange.actions

export default themeChange.reducer