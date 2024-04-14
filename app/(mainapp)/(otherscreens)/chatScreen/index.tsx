import { View, Text, SafeAreaView, TextInput, Dimensions, Pressable, FlatList } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ChatScreen() {
    const [messages, setMessages] = React.useState([
        { id: 1, text: 'Merhaba', sender: 'other' },
        { id: 2, text: 'Merhaba', sender: 'me' },
        { id: 3, text: 'Merhaba', sender: 'other' },
        { id: 4, text: 'Merhaba', sender: 'me' },
        { id: 5, text: 'Merhaba', sender: 'other' },
    ])

    const [text, setText] = React.useState('')
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <FlatList data={messages} renderItem={
                    ({ item }) => (
                        <View style={{ width: Dimensions.get('window').width, paddingHorizontal: 8, paddingTop: 8, flexDirection: item.sender === 'me' ? 'row-reverse' : 'row', gap: 10 }}>
                            <Text style={{ backgroundColor: item.sender === 'me' ? 'blue' : 'gray', padding: 10, borderRadius: 10, color: 'white' }}>{item.text}</Text>
                        </View>
                    )
                } />
            </View>
            <View style={{ marginTop: 8, flexDirection: 'row', position: 'relative', alignItems: 'flex-end' }}>
                <TextInput onChangeText={(text) => setText(text)} value={text} style={{ width: Dimensions.get('window').width, height: 50, borderColor: 'gray', borderTopWidth: 2, paddingLeft: 4, fontSize: 16 }} />
                <Pressable style={{ position: 'absolute', right: 5, bottom: 8 }} onPress={() => {
                    setMessages([...messages, { id: messages.length + 1, text: text, sender: 'me' }])
                    setText('')
                }}>
                    <MaterialCommunityIcons name="send-circle-outline" size={32} color="black" />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}