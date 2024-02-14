import { View, Pressable, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { Fontisto } from '@expo/vector-icons';

interface CustomDatePickerProps {
    setFieldValue: any
}

export default function CustomDatePicker({ setFieldValue }: CustomDatePickerProps) {
    const [date, setDate] = useState(new Date());
    const [birthday, setDateOfBirth] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }: any, selectedDate: any) => {
        if (type == 'set') {
            const currentDate = selectedDate
            setDate(currentDate)
            if (Platform.OS === 'android') {
                toggleDatePicker()
                setDateOfBirth(currentDate.toDateString())
                setFieldValue('birthday', currentDate.toDateString())
            }
        } else {
            toggleDatePicker()
        }
    }
    return (
        <View style={{ width: '80%', alignItems: 'center' }}>
            {
                showPicker &&
                <RNDateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange={onChange}
                    maximumDate={new Date()}
                    minimumDate={new Date(1950, 0, 1)}
                />
            }
            <Pressable
                style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.07)', borderRadius: 25, gap: 6, paddingLeft: 10 }}
                onPress={toggleDatePicker}
            >
                <Fontisto name="date" size={24} color="black" />
                <TextInput
                    style={{ color: 'black' }}
                    placeholder='Aug 21 2004'
                    value={birthday.substring(3)}
                    onChangeText={(text) => setDateOfBirth(text)}
                    editable={false}
                />
            </Pressable>
        </View>
    )
}