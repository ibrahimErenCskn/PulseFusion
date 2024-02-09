import { Text, Pressable, ViewStyle, Dimensions, TextStyle } from 'react-native'

interface CustomButtonProps {
    onP(): void
    title: string
    customStyle?: ViewStyle
    customTextStyle?: TextStyle
}

const { width } = Dimensions.get('window')

export default function CustomButton({ onP, title, customStyle, customTextStyle }: CustomButtonProps) {
    return (
        <Pressable style={[{
            width: width * 0.4, height: 50, backgroundColor: 'white', borderRadius: 25, alignItems: 'center', justifyContent: 'center'
        }, customStyle]} onPress={onP}>
            <Text style={[{ fontSize: 25, fontWeight: 'bold' }, customTextStyle]}>{title}</Text>
        </Pressable>
    )
}