
import { View, Text, Modal, Pressable, ViewStyle } from 'react-native'
import Animated, { ZoomInDown } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

interface CustomModalProps {
    buttonText: string
    buttonStyle?: ViewStyle
    children: React.ReactElement
    visible?: boolean
    setVisible?: Function
    customFontSize?: number
    renderButton?: React.ReactElement
    customStyle?: ViewStyle
}

export default function CustomModal({ customStyle, buttonText, buttonStyle, children, visible, setVisible, customFontSize, renderButton }: CustomModalProps) {
    const [visibleModal, setVisibleModal] = useState(false)

    return (
        <View style={buttonStyle}>
            <Pressable onPress={setVisible ? () => setVisible(!visible) : () => setVisibleModal(!visibleModal)} style={{ alignItems: 'center', justifyContent: 'center' }}>
                {renderButton ? renderButton : <Text style={{ fontSize: customFontSize ? customFontSize : 20, fontWeight: '700' }}>{buttonText}</Text>}
            </Pressable>
            <Modal visible={visible ? visible : visibleModal} transparent>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center' }}>
                    <Animated.View entering={ZoomInDown.duration(300)} style={customStyle}>
                        <Pressable onPress={setVisible ? () => setVisible(!visible) : () => setVisibleModal(!visibleModal)} style={{ alignSelf: 'flex-end', paddingRight: 10, paddingBottom: 4 }}>
                            <AntDesign name="closecircleo" size={24} color="white" />
                        </Pressable>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        </View>
    )
}