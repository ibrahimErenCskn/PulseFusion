import { View, Text, TextInput, Pressable, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { writeDataInUsers } from '@/services/redux/reducers/firestore';
import COLOR from '@/constants/Colors';
import LottieAnim from '@/services/lottie/LottieAnim';

export default function CoachingChatScreen() {
    const { uid, name } = useLocalSearchParams<any>()
    const userUid: any = auth()?.currentUser?.uid
    const userName: any = auth()?.currentUser?.displayName
    const dispatch = useDispatch()

    const [userMessage, setUserMessage] = useState<any>([])
    const [coachingMessage, setCoachingMessage] = useState<any>([])
    const [mergedArray, setMergedArray] = useState<any>([]);
    const [text, setText] = useState('')
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
            .doc(userUid)
            .onSnapshot(documentSnapshot => {
                setUserMessage(documentSnapshot.data())
            });
        return () => subscriber();
    }, []);
    useEffect(() => {
        const subscriber = firestore()
            .collection("coachingChat")
            .doc(uid)
            .onSnapshot(documentSnapshot => {
                setCoachingMessage(documentSnapshot.data())
            });
        return () => subscriber();
    }, []);
    useEffect(() => {
        if (coachingMessage?.[userUid] && userMessage?.[uid]) {
            let merged = [...coachingMessage?.[userUid], ...userMessage?.[uid]].sort((a, b) => a.date - b.date);
            setMergedArray(merged)
        }
        else if (
            coachingMessage?.[userUid]
        ) {
            let merged = [...coachingMessage?.[userUid]].sort((a, b) => a.date - b.date);
            setMergedArray(merged)
        }
        else if (userMessage?.[uid]) {
            let merged = [...userMessage?.[uid]].sort((a, b) => a.date - b.date);
            setMergedArray(merged)
        }
    }, [coachingMessage, userMessage]);
    if (isLoading) {
        return (
            <LottieAnim anim={require('@/services/lottie/Anim/LoadingAnim.json')} />
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ paddingTop: 4 }}>
                    {
                        mergedArray?.map((item: any, index: number) => (
                            <View key={index} style={{ width: '100%', gap: 4 }}>
                                {
                                    item?.senderID === userUid ? (
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
                        ))
                    }
                </View>
            </ScrollView>
            <View style={{ marginTop: 8, flexDirection: 'row', position: 'relative', alignItems: 'flex-end' }}>
                <TextInput onChangeText={(text) => setText(text)} value={text} multiline={true} style={{ width: Dimensions.get('window').width, height: 50, borderColor: 'gray', borderTopWidth: 2, paddingLeft: 4, fontSize: 16, paddingRight: 40 }} />
                <Pressable style={{ position: 'absolute', right: 5, bottom: 8 }} onPress={() => {
                    if (coachingMessage) {
                        dispatch(writeDataInUsers({ collectionName: "coachingChat", data: { [userUid]: coachingMessage?.[userUid] ? [...coachingMessage[userUid], { text: text, senderID: userUid, date: Date.now() }] : [{ text: text, senderID: userUid, date: Date.now() }] }, writeType: 'update', dataName: uid }))
                    }
                    else {
                        dispatch(writeDataInUsers({ collectionName: "coachingChat", data: { [userUid]: coachingMessage?.[userUid] ? [...coachingMessage[userUid], { text: text, senderID: userUid, date: Date.now() }] : [{ text: text, senderID: userUid, date: Date.now() }] }, writeType: 'set', dataName: uid }))
                    }
                    setText('')
                }}>
                    <MaterialCommunityIcons name="send-circle-outline" size={32} color="black" />
                </Pressable>
            </View>
        </View>
    )
}