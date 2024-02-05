import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'

interface LoadinProps {
    anim?: any
    width?: any
    height?: any
    speed?: number
}

export default function LottieAnim({ anim, width, height, speed }: LoadinProps) {
    const animation = useRef(null);

    return (
        <LottieView
            autoPlay
            loop
            ref={animation}
            speed={speed ? speed : 1}
            style={{
                width: width ? width : '100%',
                height: height ? height : '100%',
            }}
            source={anim ? anim : require('../lottie/LoginTwoAnim.json')}
        />
    )
}