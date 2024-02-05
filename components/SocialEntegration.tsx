import { Image, Dimensions, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')

interface SocialEntegratioProps {
    customStyles?: object
    path: any,
    setPress?: any
    custoImgStyle?: object
}

export default function SocialEntegration({ customStyles, custoImgStyle, path, setPress }: SocialEntegratioProps) {
    return (
        <Pressable style={[styles.pressableStyle, customStyles]} onPress={setPress}>
            <Image source={path} style={custoImgStyle} resizeMode='contain' />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressableStyle: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'white',
        width: width * 0.15,
        height: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center'
    }
})