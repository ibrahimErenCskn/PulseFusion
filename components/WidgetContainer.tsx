import COLOR from '@/constants/Colors'
import React from 'react'
import { Dimensions, View, ViewStyle } from 'react-native'

interface WidgetContainerProps {
    setHeight: number
    customStyle?: ViewStyle
    setBorderRadius?: number
    children: React.ReactElement
}

const { width } = Dimensions.get('window')

export default function WidgetContainer({ customStyle, children, setHeight, setBorderRadius }: WidgetContainerProps) {
    return (
        <View style={[{ backgroundColor: COLOR.appContainerColor, width: width * .9, height: setHeight, alignSelf: 'center', borderRadius: setBorderRadius ? setBorderRadius : setHeight * .12, marginVertical: 10 }, customStyle]}>
            {children}
        </View>
    )
}