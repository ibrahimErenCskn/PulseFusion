import { View, Text, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLOR from '@/constants/Colors'
import * as DocumentPicker from 'expo-document-picker';
import storage from '@react-native-firebase/storage';
import { Formik } from 'formik';
import CustomTextInput from '@/components/CustomTextInput';
import CustomButton from '@/components/CustomButton';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

export default function CoachingScreen() {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const pickFile = async () => {
        try {
            const result: any = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });
            if (result.assets[0].uri) {
                setSelectedFile(result);
            }
            if (!selectedFile) {
                console.log('dosya seçilmedi');
                return;
            }

            const { uri, name } = selectedFile.assets[0];
            const file: any = await fetch(uri).then((response) => response.blob());
            const storageRef = storage().ref(`CoachCVPDF/${name}`);
            await storageRef.put(file);

            console.log('Dosya başarıyla yüklendi!');
        } catch (error) {
            console.log(error);
            setSelectedFile(null);
        }
    };
    useEffect(() => {
        console.log(selectedFile)
    }, [selectedFile])
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.authColor }}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                    console.log(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40 }}>
                        <View style={{ width: '100%', alignItems: 'center', gap: 50 }}>
                            <CustomTextInput icon={<Fontisto name="email" size={26} color="black" />} placeH={"Adınız"} val={values.email} onChangeT={handleChange('email')} onB={handleBlur('email')} />
                            <CustomTextInput secureBoolean={true} icon={<MaterialIcons name="password" size={26} color="black" />} placeH={"Soyadınız"} val={values.password} onChangeT={handleChange('password')} onB={handleBlur('password')} />
                            <CustomTextInput secureBoolean={true} icon={<MaterialIcons name="password" size={26} color="black" />} placeH={"Dogum Tarihiniz"} val={values.password} onChangeT={handleChange('password')} onB={handleBlur('password')} />
                            <CustomTextInput secureBoolean={true} icon={<MaterialIcons name="password" size={26} color="black" />} placeH={"Cinsiyetiniz"} val={values.password} onChangeT={handleChange('password')} onB={handleBlur('password')} />
                            <CustomTextInput secureBoolean={true} icon={<MaterialIcons name="password" size={26} color="black" />} placeH={"Telefon Numaranız"} val={values.password} onChangeT={handleChange('password')} onB={handleBlur('password')} />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <CustomButton title={"Kayıt Ol"} onP={handleSubmit} />
                        </View>
                    </View>
                )}
            </Formik>
            <Button
                title="Select Document"
                onPress={() => pickFile()}
            />
        </View>
    )
}