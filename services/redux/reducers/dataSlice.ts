import { CalculateCalories, calculateBmiIndex } from '@/services/utils/calculateFunc/allCalculate'
import { createSlice } from '@reduxjs/toolkit'


export interface dataSliceInitialProps {
    mealData: object
    bmiIndex: object
    userData: object
    dayCalories: number
}

const initialState: dataSliceInitialProps = {
    userData: {},
    mealData: {},
    bmiIndex: {},
    dayCalories: 0
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userData = action.payload
        },
        addMealData: (state, action) => {
            state.mealData = action.payload
        },
        setBmi: (state, action) => {
            state.bmiIndex = calculateBmiIndex({ height: action.payload.height, weight: action.payload.weight })
        },
        dayCaloriesCalculate: (state: any, action) => {
            if (action.payload.gender === 'Male') {
                state.dayCalories = CalculateCalories({ moveType: state.mealData?.type1.activitiyType, activityType: state.mealData?.type2.activitiyType, age: 23, gender: state.userData.gender, height: state.userData.height, weight: state.userData.weight })
            }
            if (action.payload.gender === 'Female') {
                console.log(action.payload)
            }
        }
    },
})

export const { addMealData, setBmi, dayCaloriesCalculate, setUserInfo } = dataSlice.actions

export default dataSlice.reducer