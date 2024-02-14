import React from 'react'
import { TextInput, View, ViewStyle } from 'react-native'

interface CustomTextInputProps {
    onChangeT: any
    onB: any
    val: string
    placeH: string
    customStyle?: ViewStyle,
    icon?: React.ReactElement
    secureBoolean?: boolean
}

export default function CustomTextInput({ onChangeT, onB, val, placeH, icon, customStyle, secureBoolean }: CustomTextInputProps) {
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', width: '80%', height: 55, borderRadius: 40, paddingHorizontal: 10, gap: 2 }, customStyle]}>
            {icon}
            <TextInput
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