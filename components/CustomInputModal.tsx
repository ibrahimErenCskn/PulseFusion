import { View, Text, Modal, Pressable, FlatList, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import Animated, { ZoomInDown } from 'react-native-reanimated'


interface CustomModalProps {
    data: Array<object> | any
    setFieldValue?: any
    setValueName?: string
    text: string
    customInputStyle?: ViewStyle
    icon?: React.ReactElement
}

export default function CustomInputModal({ text, data, setFieldValue, setValueName, customInputStyle, icon }: CustomModalProps) {
    const [visibleModal, setVisibleModal] = useState(false)
    const [value, setValue] = useState<any>(null)
    return (
        <View style={{ alignItems: 'center', width: '80%' }}>
            <View style={{ width: '100%', height: 55, backgroundColor: 'rgba(230,230,230,.6)', borderRadius: 40 }}>
                <Pressable onPress={() => setVisibleModal(!visibleModal)} style={[{ flex: 1, justifyContent: 'center', paddingLeft: 10 }, customInputStyle]}>
                    {value ? (<View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        {value[0]}
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>{value[1]}</Text>
                    </View>) : (<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        {icon}
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>{text}</Text>
                    </View>)}
                </Pressable>
            </View>
            <Modal transparent visible={visibleModal} animationType='fade'>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center' }}>
                    <Animated.View entering={ZoomInDown.duration(300)} style={{ alignSelf: 'center', backgroundColor: 'white', width: '80%', height: '60%', borderRadius: 20 }}>
                        <FlatList data={data} renderItem={({ item }) => (
                            <View style={{ width: '100%', height: 50, borderBottomWidth: 2, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <Pressable style={{ flex: 1, alignItems: 'center', paddingLeft: 10, flexDirection: 'row', gap: 10 }} onPress={() => {
                                    setFieldValue(setValueName, item.value)
                                    setVisibleModal(!visibleModal)
                                    setValue([item?.icon, item.name])
                                }}>
                                    {item?.icon}
                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.name}</Text>
                                </Pressable>
                            </View>
                        )} />
                    </Animated.View>
                </View>
            </Modal>
        </View>
    )
}