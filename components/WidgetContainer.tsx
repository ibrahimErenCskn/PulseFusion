import COLOR from '@/constants/Colors'
import React from 'react'
import { Dimensions, View, ViewStyle } from 'react-native'

interface WidgetContainerProps {
    setHeight: number
    customStyle?: ViewStyle
    children: React.ReactElement
}

const { width } = Dimensions.get('window')

export default function WidgetContainer({ customStyle, children, setHeight }: WidgetContainerProps) {
    return (
        <View style={[{ backgroundColor: COLOR.appContainerColor, width: width * .9, height: setHeight, alignSelf: 'center', borderRadius: setHeight * 0.1, marginVertical: 10 }, customStyle]}>
            {children}
        </View>
    )
}