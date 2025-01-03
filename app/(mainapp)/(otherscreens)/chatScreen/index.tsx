import { View, Text, SafeAreaView, TextInput, Dimensions, Pressable, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch } from 'react-redux';
import { writeDataInUsers } from '@/services/redux/reducers/firestore';
import firestore from '@react-native-firebase/firestore';
import COLOR from '@/constants/Colors';
import auth from '@react-native-firebase/auth';
import LottieAnim from '@/services/lottie/LottieAnim';
export default function ChatScreen() {
    const { coachingId, myID, name } = useLocalSearchParams<any>()
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [userMessage, setUserMessage] = useState<any>([])
    const [coachingMessage, setCoachingMessage] = useState<any>([])
    const userName: any = auth()?.currentUser?.displayName
    const [mergedArray, setMergedArray] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 saniye gecikme

        // Temizlik fonksiyonu
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        const subscriber = firestore()
            .collection("coachingChat")
            .doc(myID)
            .onSnapshot(documentSnapshot => {
                setUserMessage(documentSnapshot.data())
            });
        return () => subscriber();
    }, []);
    useEffect(() => {
        const subscriber = firestore()
            .collection("coachingChat")
            .doc(coachingId)
            .onSnapshot(documentSnapshot => {
                setCoachingMessage(documentSnapshot.data())
            });
        return () => subscriber();
    }, []);
    useEffect(() => {
        if (coachingMessage?.[myID] && userMessage?.[coachingId]) {
            let merged = [...coachingMessage?.[myID], ...userMessage?.[coachingId]].sort((a, b) => a.date - b.date);
            setMergedArray(merged)
        }
        else if (
            coachingMessage?.[myID]
        ) {
            let merged = [...coachingMessage?.[myID]].sort((a, b) => a.date - b.date);
            setMergedArray(merged)
        }
        else if (userMessage?.[coachingId]) {
            let merged = [...userMessage?.[coachingId]].sort((a, b) => a.date - b.date);
            setMergedArray(merged)
        }
    }, [coachingMessage, userMessage])

    if (isLoading) {
        return (
            <LottieAnim anim={require('@/services/lottie/Anim/LoadingAnim.json')} />
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ paddingTop: 4 }}>
                    {mergedArray.map((item: any, index: any) => {
                        return (
                            <View key={index} style={{ width: '100%', gap: 20 }}>
                                {
                                    item?.senderID === myID ? (
                                        <View style={{ alignItems: 'flex-end', gap: 4 }}>
                                            <View style={{ minWidth: 250, maxWidth: 300, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.authColor, padding: 8, marginBottom: 5, marginRight: 4 }}>
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{userName} :</Text>
                                                </View>
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <Text>{item?.text}</Text>
                                                </View>
                                                <View style={{ alignSelf: 'flex-end' }}>
                                                    <Text style={{ fontSize: 10 }}>{new Date(item?.date).toLocaleString()}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    ) : (
                                        <View style={{ alignItems: 'flex-start', gap: 4 }}>
                                            <View style={{ minWidth: 250, maxWidth: 300, alignItems: 'center', backgroundColor: COLOR.authColor, padding: 8, marginBottom: 5, marginLeft: 4 }}>
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{name} :</Text>
                                                </View>
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <Text>{item?.text}</Text>
                                                </View>
                                                <View style={{ alignSelf: 'flex-end' }}>
                                                    <Text style={{ fontSize: 10 }}>{new Date(item?.date).toLocaleString()}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        )
                    })
                    }
                </View>
            </ScrollView>
            <View style={{ marginTop: 8, flexDirection: 'row', position: 'relative', alignItems: 'flex-end' }}>
                <TextInput maxLength={500} onChangeText={(text) => setText(text)} value={text} multiline={true} style={{ width: Dimensions.get('window').width, height: 50, borderColor: 'gray', borderTopWidth: 2, paddingLeft: 4, fontSize: 16, paddingRight: 40 }} />
                <Pressable style={{ position: 'absolute', right: 5, bottom: 8 }} onPress={() => {
                    if (
                        coachingMessage
                    ) {
                        dispatch(writeDataInUsers({ collectionName: "coachingChat", data: { [myID]: coachingMessage?.[myID] ? [...coachingMessage?.[myID], { text: text, senderID: myID, date: Date.now() }] : [{ text: text, senderID: myID, date: Date.now() }] }, writeType: 'update', dataName: coachingId }))
                    }
                    else {
                        dispatch(writeDataInUsers({ collectionName: "coachingChat", data: { [myID]: coachingMessage?.[myID] ? [...coachingMessage?.[myID], { text: text, senderID: myID, date: Date.now() }] : [{ text: text, senderID: myID, date: Date.now() }] }, writeType: 'set', dataName: coachingId }))
                    }
                    setText('')
                }}>
                    <MaterialCommunityIcons name="send-circle-outline" size={32} color="black" />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}