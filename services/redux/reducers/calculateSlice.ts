import { createSlice } from '@reduxjs/toolkit'

export interface calculateSliceInitialProps {
    bmiIndex: object
}

const initialState: calculateSliceInitialProps = {
    bmiIndex: {}
}

export const calculateSlice = createSlice({
    name: 'calculate',
    initialState,
    reducers: {
        setBmi: (state, action) => {
            state.bmiIndex = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setBmi } = calculateSlice.actions

export default calculateSlice.reducer