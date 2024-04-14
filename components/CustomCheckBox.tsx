import React, { useEffect, useState } from 'react'
import Checkbox from 'expo-checkbox'
import { useDispatch } from 'react-redux';
import { writeDataInUsers } from '@/services/redux/reducers/firestore';

interface CustomCheckBoxProps {
    mealData: any
    calories: number
    protein: number
    yag: number
    karbonhidrat: number
    index: number
    name: string
}
export default function CustomCheckBox({ mealData, calories, protein, yag, karbonhidrat, index, name }: CustomCheckBoxProps) {
    const dispatch = useDispatch()
    return (
        <Checkbox value={mealData?.[name][index].active} onValueChange={() => {
            dispatch(writeDataInUsers({ data: { [name]: [...mealData?.[name].slice(0, index), { ...mealData?.[name][index], active: !mealData?.[name][index].active }, ...mealData?.[name].slice(index + 1)] }, writeType: 'update', dataName: 'mealData' }))
            if (!mealData?.[name][index]?.active) {
                dispatch(writeDataInUsers({ data: { calories: [Number(mealData?.calories ? mealData?.calories : 0) + calories] }, writeType: 'update', dataName: 'mealData' }))
                dispatch(writeDataInUsers({ data: { protein_db: [Number(mealData?.protein_db ? mealData?.protein_db : 0) + protein] }, writeType: 'update', dataName: 'mealData' }))
                dispatch(writeDataInUsers({ data: { yag_db: [Number(mealData?.yag_db ? mealData?.yag_db : 0) + yag] }, writeType: 'update', dataName: 'mealData' }))
                dispatch(writeDataInUsers({ data: { karbonhidrat_db: [Number(mealData?.karbonhidrat_db ? mealData?.karbonhidrat_db : 0) + karbonhidrat] }, writeType: 'update', dataName: 'mealData' }))
            }
            else {
                dispatch(writeDataInUsers({ data: { calories: [Number(mealData?.calories ? mealData?.calories : 0) - calories] }, writeType: 'update', dataName: 'mealData' }))
                dispatch(writeDataInUsers({ data: { protein_db: [Number(mealData?.protein_db ? mealData?.protein_db : 0) - protein] }, writeType: 'update', dataName: 'mealData' }))
                dispatch(writeDataInUsers({ data: { yag_db: [Number(mealData?.yag_db ? mealData?.yag_db : 0) - yag] }, writeType: 'update', dataName: 'mealData' }))
                dispatch(writeDataInUsers({ data: { karbonhidrat_db: [Number(mealData?.karbonhidrat_db ? mealData?.karbonhidrat_db : 0) - karbonhidrat] }, writeType: 'update', dataName: 'mealData' }))
            }
        }} color={'white'} />
    )
}