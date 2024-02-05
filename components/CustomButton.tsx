import { Text, Pressable } from 'react-native'

interface CustomButtonProps {
    onP: any
    title: string
}

export default function CustomButton({ onP, title }: CustomButtonProps) {
    return (
        <Pressable style={{ width: '40%', height: 50, backgroundColor: 'white', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }} onPress={onP}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{title}</Text>
        </Pressable>
    )
}