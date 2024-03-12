import COLOR from '@/constants/Colors'
import { Text, Pressable, ViewStyle, Dimensions, TextStyle, ActivityIndicator } from 'react-native'

interface CustomButtonProps {
    onP(): void
    title: string
    customStyle?: ViewStyle
    customTextStyle?: TextStyle
    isLoading?: boolean
    disabled?: boolean
}

const { width } = Dimensions.get('window')

export default function CustomButton({ onP, title, customStyle, customTextStyle, isLoading, disabled }: CustomButtonProps) {
    return (
        <Pressable style={[{
            flexDirection: 'row', width: width * 0.4, height: 50, backgroundColor: COLOR.buttonColor, borderRadius: 25, alignItems: 'center', justifyContent: 'center'
        }, customStyle]} onPress={onP} disabled={disabled ? disabled : false}>
            <Text style={[{ fontSize: 25, fontWeight: 'bold' }, customTextStyle]}>{title}</Text>
            {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
        </Pressable>
    )
}