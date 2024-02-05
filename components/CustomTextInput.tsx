import { TextInput } from 'react-native'

interface CustomTextInputProps {
    onChangeT: any
    onB: any
    val: string
    placeH: string
}

export default function CustomTextInput({ onChangeT, onB, val, placeH }: CustomTextInputProps) {
    return (
        <TextInput
            style={{ backgroundColor: 'white', width: '80%', height: 55, borderRadius: 40, paddingHorizontal: 10 }}
            onChangeText={onChangeT}
            onBlur={onB}
            value={val}
            placeholder={placeH}
        />
    )
}