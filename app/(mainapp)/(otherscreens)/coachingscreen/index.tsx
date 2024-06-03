import { View, Button, Pressable, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLOR from '@/constants/Colors'
import * as DocumentPicker from 'expo-document-picker';
import storage from '@react-native-firebase/storage';
import { Formik } from 'formik';
import CustomTextInput from '@/components/CustomTextInput';
import CustomButton from '@/components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { writeDataInUsers } from '@/services/redux/reducers/firestore';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Entypo } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
export default function CoachingScreen() {
    const [selectedFilePhoto, setSelectedFilePhoto] = useState<any>(null);
    const [selectedFilePDF, setSelectedFilePDF] = useState<any>(null);
    const [userCoachinData, setUserCoachinData] = useState<any>(null)

    const { userData } = useSelector((state: any) => state.allData)
    const userUid: any = auth()?.currentUser?.uid
    const dispatch = useDispatch()

    const getCoachingData = async () => {
        const querySnapshot: any = await firestore().collection('coachUser').doc(userUid).get();
        setUserCoachinData(querySnapshot.data()?.CHECKED)
    }

    useEffect(() => {
        if (userData?.activityCoaching) { getCoachingData() }
    }, [])
    const pickFilePDF = async () => {
        try {
            const result: any = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });
            if (result.assets[0].uri) {
                setSelectedFilePDF(result);
            }
            else {
                console.log('dosya seçilmedi');
                return;
            }

            console.log('Dosya başarıyla yüklendi!');
        } catch (error) {
            console.log(error);
            setSelectedFilePDF(null);
        }
    };
    const pickFilePhoto = async () => {
        try {
            let result: any = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (result?.assets[0].uri) {
                setSelectedFilePhoto(result);
            }
            else {
                console.log('dosya seçilmedi');
                return;
            }
        } catch (error) {
            console.log(error);
            setSelectedFilePhoto(null);
        }
    };

    const setFile = async (realName: string) => {
        const { uri } = selectedFilePhoto.assets[0];
        const file: any = await fetch(uri).then((response) => response.blob());
        const storageRef = storage().ref(`CoachFile/${userUid}/img`);
        await storageRef.put(file);
    };
    const setFile2 = async (realName: string) => {
        const { uri } = selectedFilePDF.assets[0];
        const file: any = await fetch(uri).then((response) => response.blob());
        const storageRef = storage().ref(`CoachFile/${userUid}/CV`);
        await storageRef.put(file);
    };

    const setDatabase = async (values: any) => {
        await setFile(values.name)
        await setFile2(values.name)
        const imgURI = await storage().ref(`CoachFile/${userUid}/img`).getDownloadURL()
        const PDFURI = await storage().ref(`CoachFile/${userUid}/CV`).getDownloadURL()
        dispatch(writeDataInUsers({ collectionName: "coachUser", data: { ...values, uid: userUid, imgUri: imgURI, pdfUri: PDFURI }, writeType: "set", dataName: userUid }))
        dispatch(writeDataInUsers({ data: { activityCoaching: true }, writeType: "update", dataName: "userData" }))
    }
    return (

        userData?.activityCoaching === true ?
            <View style={{ flex: 1, backgroundColor: COLOR.authColor, justifyContent: 'center', alignItems: 'center' }}>
                {userCoachinData ? <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Talebiniz Onaylandı</Text> : <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Talebiniz Gönderildi</Text>}
            </View> :
            <View style={{ flex: 1, backgroundColor: COLOR.authColor }}>
                <Formik
                    initialValues={{ email: '', name: '', surname: '', CHECKED: false }}
                    onSubmit={values => {
                        console.log(values)
                        setDatabase(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40 }}>
                            <View style={{ width: '100%', alignItems: 'center', gap: 50 }}>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <Pressable onPress={() => pickFilePhoto()}>
                                        {selectedFilePhoto ? <Image source={{ uri: selectedFilePhoto.assets[0].uri }} style={{ width: 100, height: 100, borderRadius: 50 }} /> : <Entypo name="image" size={48} color="black" />}
                                    </Pressable>
                                    <Pressable onPress={() => pickFilePDF()}>
                                        {selectedFilePDF ? <Text style={{ fontSize: 18, fontWeight: 'bold' }}>CV Seçildi <AntDesign name="check" size={26} color="black" /></Text> : <AntDesign name="pdffile1" size={48} color="black" />}
                                    </Pressable>
                                </View>
                                <CustomTextInput placeH={"Ad"} val={values.name} onChangeT={handleChange('name')} onB={handleBlur('name')} />
                                <CustomTextInput placeH={"Soyad"} val={values.surname} onChangeT={handleChange('surname')} onB={handleBlur('surname')} />
                                <CustomTextInput placeH={"Email"} val={values.email} onChangeT={handleChange('email')} onB={handleBlur('email')} />
                            </View>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <CustomButton title={"Kayıt Ol"} onP={handleSubmit} />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
    )
}