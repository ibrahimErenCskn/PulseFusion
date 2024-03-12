import { Text, Pressable, FlatList } from 'react-native'
import React from 'react'

interface SelectedButtonProps {
    data: any,
    setData: any
    setFieldValue?: any
    type?: any
}


export default function SelectedButton({ data, setData, setFieldValue, type }: SelectedButtonProps) {


    const handlePress = (index: number) => {
        const updatedData = data.map((item: Array<object>, i: number) => {
            if (i === index) {
                setFieldValue(type, item)
                return { ...item, active: true };
            }
            else {
                return { ...item, active: false };
            }
        });
        setData(updatedData);
    }

    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
            (
                <Pressable onPress={() => handlePress(index)} style={{ marginVertical: 10, borderColor: item.active ? 'blue' : 'black', borderWidth: 1, width: '80%', alignSelf: 'center', borderRadius: 10, paddingHorizontal: 5 }}>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>{item.title}</Text>
                    <Text style={{ fontWeight: '300', }}>{item.description}</Text>
                </Pressable>
            )
            }
        />

    )
}