import React from 'react'
import { TextInput, View, ViewStyle, KeyboardType } from 'react-native'

interface CustomTextInputProps {
    onChangeT: any
    onB?: any
    val: string
    placeH: string
    customStyle?: ViewStyle,
    icon?: React.ReactElement
    secureBoolean?: boolean
    keyboardType?: KeyboardType
}

export default function CustomTextInput({ onChangeT, onB, val, placeH, icon, customStyle, secureBoolean, keyboardType }: CustomTextInputProps) {
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', width: '80%', height: 55, borderRadius: 40, paddingHorizontal: 10, gap: 2 }, customStyle]}>
            {icon}
            <TextInput
                keyboardType={keyboardType ? keyboardType : 'default'}
                style={{ flex: 1, height: 55, paddingLeft: 5, fontSize: 16 }}
                onChangeText={onChangeT}
                onBlur={onB}
                value={val}
                placeholder={placeH}
                secureTextEntry={secureBoolean ? true : false}
            />
        </View>
    )
}