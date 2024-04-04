
import { View, Text, Modal, Pressable, ViewStyle } from 'react-native'
import Animated, { ZoomInDown } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons';

interface CustomModalProps {
    buttonText: string
    buttonStyle?: ViewStyle
    children: React.ReactElement
    visible: boolean
    setVisible: Function
    customFontSize?: number
    renderButton?: React.ReactElement
}

export default function CustomModal({ buttonText, buttonStyle, children, visible, setVisible, customFontSize, renderButton }: CustomModalProps) {


    return (
        <View style={buttonStyle}>
            <Pressable onPress={() => setVisible(!visible)} style={{ alignItems: 'center', justifyContent: 'center' }}>
                {renderButton ? renderButton : <Text style={{ fontSize: customFontSize ? customFontSize : 20, fontWeight: '700' }}>{buttonText}</Text>}
            </Pressable>
            <Modal visible={visible} transparent>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center' }}>
                    <Animated.View entering={ZoomInDown.duration(300)}>
                        <Pressable onPress={() => setVisible(!visible)} style={{ alignSelf: 'flex-end', paddingRight: 10, paddingBottom: 4 }}>
                            <AntDesign name="closecircleo" size={24} color="white" />
                        </Pressable>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        </View>
    )
}