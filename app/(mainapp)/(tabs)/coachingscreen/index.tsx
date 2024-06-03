import { View, Text, Image, ScrollView, Pressable, Linking, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLOR from '@/constants/Colors'
import firestore from '@react-native-firebase/firestore';
import { AntDesign } from '@expo/vector-icons'
import CustomModal from '@/components/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { writeDataInUsers } from '@/services/redux/reducers/firestore';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import PayCoaching from '@/components/PayCoaching';
import axios from 'axios';

export default function CoachingScreen() {
    const [coachingData, setCoachingData] = useState<any>([null])
    const [coachingSpesificData, setCoachingSpesificData] = useState<any>([null])
    const { userData } = useSelector((state: any) => state.allData)
    const { data, isLoading } = useSelector((state: any) => state.auth)
    const userUid: any = auth()?.currentUser?.uid
    const dispatch = useDispatch()
    const getCoachingData = async () => {
        const querySnapshot: any = await firestore().collection('coachUser').get();
        setCoachingData(querySnapshot._docs?.map((doc: any) => doc.data()))
    }
    const getSpesificCoachingData = async () => {
        const querySnapshot: any = await firestore().collection('coachUser').doc(userUid).get();
        setCoachingSpesificData(querySnapshot.data())
    }

    useEffect(() => {
        getCoachingData()
        getSpesificCoachingData()
    }, [])

    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expireMonth, setExpireMonth] = useState('');
    const [expireYear, setExpireYear] = useState('');
    const [cvc, setCvc] = useState('');

    if (coachingSpesificData?.uid === userUid && coachingSpesificData?.CHECKED == true) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Mevcut Ögrencilerim</Text>
                </View>
                <ScrollView>
                    {coachingSpesificData?.users.map((data: any, index: number) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, }} key={index}>
                                <Image source={{ uri: data.image ? data.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={{ width: 70, height: 70, borderRadius: 50 }} />
                                <View style={{ borderRadius: 16, width: '80%', marginBottom: 10, gap: 5, backgroundColor: COLOR.appContainerColor, height: 100, justifyContent: 'center', paddingLeft: 10 }}>
                                    <Text style={{ color: 'black', fontSize: 16 }}>İsmi: <Text style={{ fontSize: 15, color: 'white' }}>{data.name}</Text></Text>
                                    <Text style={{ color: 'black', fontSize: 16 }}>Mail:  <Text style={{ fontSize: 15, color: 'white' }}>{data.email}</Text></Text>
                                    <Pressable style={{ padding: 5, backgroundColor: 'white', borderRadius: 5, width: 100 }} onPress={() => router.push({ pathname: '/(mainapp)/(otherscreens)/coachingChatScreen/', params: { uid: data?.userID, name: data?.name } })}>
                                        <Text>Sohbet</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 10 }}>
            {
                userData.coachingId && (
                    <ScrollView>
                        <View style={{ width: '100%', alignItems: 'center', marginBottom: 10, backgroundColor: COLOR.appContainerColor, height: 50, justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Koçlarım</Text>
                        </View>
                        {coachingData?.map((v: any, index: number) => {
                            return (
                                v?.CHECKED && userData?.coachingId === v?.uid && (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10 }}>
                                        <Image source={{ uri: v?.imgUri || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                                        <View style={{ justifyContent: 'center', paddingHorizontal: 10, gap: 8, backgroundColor: COLOR.appContainerColor, marginBottom: 10, width: '70%', height: 160, borderRadius: 8, alignSelf: 'center' }}>
                                            <Text style={{ color: 'black', fontSize: 16 }}>İsmi: <Text style={{ fontSize: 15, color: 'white' }}>{v?.name}</Text></Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>Soyismi:  <Text style={{ fontSize: 15, color: 'white' }}>{v?.surname}</Text></Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>Email:  <Text style={{ fontSize: 15, color: 'white' }}>{v?.email}</Text></Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>Tarihi:  <Text style={{ fontSize: 15, color: 'white' }}>{new Date(userData?.coachinTime).toLocaleDateString()}</Text></Text>
                                            <Pressable onPress={() => router.push({ pathname: '/(mainapp)/(otherscreens)/chatScreen/', params: { coachingId: v?.uid, myID: userUid, name: v?.name } })} style={{ backgroundColor: COLOR.buttonColor, justifyContent: 'center', borderWidth: 2, borderRadius: 5, width: 60 }}>
                                                <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>Sohbet</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                )
                            )
                        }
                        )}
                    </ScrollView>
                )
            }
            {
                !userData?.coachingId && (
                    <ScrollView>
                        <View style={{ width: '100%', alignItems: 'center', marginBottom: 10, backgroundColor: COLOR.appContainerColor, height: 50, justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Mevcut Koçlar</Text>
                        </View>
                        {!userData?.coachingId && coachingData?.map((v: any, index: number) => {
                            return (
                                v?.CHECKED && (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10 }}>
                                        <View style={{ gap: 4 }}>
                                            <Image source={{ uri: v?.imgUri || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                                            <CustomModal buttonText='Kirala' customStyle={{ width: '90%', height: '90%' }}>
                                                <View>
                                                    <PayCoaching >
                                                        <View style={{ gap: 10, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                                                            <Text style={{ fontSize: 28 }}>Ödeme</Text>
                                                            <View style={{ width: '100%', backgroundColor: '#FCE073', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ fontSize: 20 }}>Sandbox</Text>
                                                            </View>
                                                            <View style={{ width: '90%', alignItems: 'center' }}>
                                                                <View style={{ flexDirection: 'row', gap: 4, borderWidth: 1, borderColor: 'black', width: '100%', height: 55, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <AntDesign name="creditcard" size={24} color="black" />
                                                                    <Text style={{ fontSize: 20 }}>Kartla Ödeme</Text>
                                                                </View>
                                                                <TextInput placeholder='Kart Üzerindeki İsim' keyboardType='default' onChangeText={(text) => setCardHolderName(text)}
                                                                    style={{ width: '100%', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, height: 55, paddingHorizontal: 10, fontSize: 16 }}
                                                                />
                                                                <TextInput placeholder='Kart numarası' keyboardType='numeric' maxLength={16} onChangeText={(text) => setCardNumber(text)} style={{ width: '100%', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, height: 55, paddingHorizontal: 10, fontSize: 16 }} />
                                                                <TextInput placeholder='Ay' keyboardType='numeric' maxLength={2} onChangeText={(text) => setExpireMonth(text)} style={{ width: '100%', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, height: 55, paddingHorizontal: 10, fontSize: 16 }} />
                                                                <TextInput placeholder='Yıl' keyboardType='numeric' maxLength={4} onChangeText={(text) => setExpireYear(text)} style={{ width: '100%', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, height: 55, paddingHorizontal: 10, fontSize: 16 }} />
                                                                <TextInput placeholder='CVC' keyboardType='numeric' maxLength={3} onChangeText={(text) => setCvc(text)} style={{ width: '100%', borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, height: 55, paddingHorizontal: 10, fontSize: 16 }} />
                                                            </View>
                                                            <Pressable style={{ backgroundColor: '#39A3E3', justifyContent: 'center', height: 50, width: '90%', alignItems: 'center' }} onPress={async () => {
                                                                await axios.post('http://192.168.1.48:8080/payment', {
                                                                    cardHolderName: cardHolderName,
                                                                    cardNumber: cardNumber,
                                                                    expireMonth: expireMonth,
                                                                    expireYear: expireYear,
                                                                    cvc: cvc,
                                                                    registerCard: '0'
                                                                })
                                                                    .then(response => {
                                                                        console.log(response.data);
                                                                        if (response.data?.status === 'success') {
                                                                            dispatch(writeDataInUsers({ data: { coachingId: v?.uid, coachinTime: Date.now() + 2592000000 }, writeType: 'update', dataName: 'userData' }))
                                                                            dispatch(writeDataInUsers({ collectionName: 'coachUser', data: { users: v?.users ? [...v?.users, { userID: userUid, name: data?.displayName ? data?.displayName : "null", photoURL: data?.photoURL ? data?.photoURL : "null", email: data?.email }] : [{ userID: userUid, name: data?.displayName ? data?.displayName : "null", photoURL: data?.photoURL ? data?.photoURL : "null", email: data?.email }] }, writeType: 'update', dataName: v?.uid }))
                                                                        }
                                                                    })
                                                                    .catch(error => {
                                                                        console.error('Error:', error);
                                                                    });
                                                            }}>
                                                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>2500 TL Öde</Text>
                                                            </Pressable>
                                                        </View>
                                                    </PayCoaching>
                                                </View>
                                            </CustomModal>
                                        </View>
                                        <View style={{ justifyContent: 'center', paddingHorizontal: 10, gap: 4, backgroundColor: COLOR.appContainerColor, marginBottom: 10, width: '70%', height: 140, borderRadius: 8, alignSelf: 'center' }}>
                                            <Text style={{ color: 'black', fontSize: 16 }}>İsmi: <Text style={{ fontSize: 15, color: 'white' }}>{v?.name}</Text></Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>Soyismi:  <Text style={{ fontSize: 15, color: 'white' }}>{v?.surname}</Text></Text>
                                            <Text style={{ color: 'black', fontSize: 16 }}>Mail:  <Text style={{ fontSize: 15, color: 'white' }}>{v?.email}</Text></Text>
                                            <Pressable onPress={() => Linking.openURL(v?.pdfUri)} style={{ justifyContent: 'center' }}>
                                                <Text style={{ color: 'black', fontSize: 16 }}>CV: <AntDesign name="pdffile1" size={24} color="white" /></Text>
                                            </Pressable>
                                            <Text style={{ color: 'black', fontSize: 16 }}>Fiyat:  <Text style={{ fontSize: 15, color: 'white' }}>2500 TL</Text></Text>
                                        </View>
                                    </View>
                                )
                            )
                        }
                        )}
                    </ScrollView>
                )
            }
        </SafeAreaView >
    )
}