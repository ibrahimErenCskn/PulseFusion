import { useState } from 'react'
import { View, Text, Modal, Pressable, ViewStyle } from 'react-native'
import Animated, { ZoomInDown } from 'react-native-reanimated'

interface CustomModalProps {
    buttonText: string
    buttonStyle: ViewStyle
    children: React.ReactElement
    visible: boolean
    setVisible: Function
}

export default function CustomModal({ buttonText, buttonStyle, children, visible, setVisible }: CustomModalProps) {


    return (
        <View style={buttonStyle}>
            <Pressable onPress={() => setVisible(!visible)} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>{buttonText}</Text>
            </Pressable>
            <Modal visible={visible} transparent>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center' }}>
                    <Animated.View entering={ZoomInDown.duration(300)}>
                        <Pressable onPress={() => setVisible(!visible)}>
                            <Text>Modalı Kapat</Text>
                        </Pressable>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        </View>
    )
}