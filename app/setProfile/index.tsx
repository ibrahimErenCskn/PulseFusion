import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { writeDataInUsers } from '@/services/redux/reducers/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import CustomTextInput from '@/components/CustomTextInput'
import CustomButton from '@/components/CustomButton'
import { useTranslation } from 'react-i18next'
import COLOR from '@/constants/Colors'
import CustomInputModal from '@/components/CustomInputModal'
import { GenderData } from '@/services/utils/fixedData/data'
import { Foundation, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import CustomDatePicker from '@/components/CustomDatePicker'
import LinearGradient from 'react-native-linear-gradient'
import { router } from 'expo-router'

const { height } = Dimensions.get('window')

export default function SetProfile() {
    const { isLoading } = useSelector((state: any) => state.userData)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.buttonColor }}>
                <ScrollView>
                    <Formik
                        initialValues={{ gender: '', birthday: '', weight: '', height: '', }}
                        onSubmit={values => {
                            dispatch(writeDataInUsers(
                                {
                                    data: {
                                        gender: values.gender,
                                        birthday: values.birthday,
                                        weight: values.weight,
                                        height: values.height
                                    },
                                    dataName: 'userData',
                                    writeType: 'set'
                                }
                            ))
                            if (!isLoading) {
                                router.replace('/setmeal/')
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                            <View style={{ flex: 1 }}>
                                <View style={{ height: height * .4, alignItems: 'center', gap: 20 }}>
                                    <Image source={require('@/assets/images/profilSet.png')} />
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>Profilini Tamamla</Text>
                                </View>
                                <View style={{ flex: 1, width: '100%', alignItems: 'center', gap: 30 }}>
                                    <CustomInputModal
                                        data={GenderData}
                                        setFieldValue={setFieldValue}
                                        setValueName='gender'
                                        text="Cinsiyet"
                                        icon={<Foundation name="male-female" size={26} color="black" />}
                                    />
                                    <CustomDatePicker setFieldValue={setFieldValue} />
                                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <CustomTextInput
                                            keyboardType='numeric'
                                            icon={<FontAwesome5 name="weight" size={26} color="black" />}
                                            placeH="Kilo"
                                            val={values.weight}
                                            onChangeT={handleChange('weight')}
                                            onB={handleBlur('weight')}
                                            customStyle={{ backgroundColor: 'rgba(230,230,230,.6)' }}
                                        />
                                        <LinearGradient colors={['#C58BF2', '#EEA4CE']} style={{ width: '15%', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>KG</Text>
                                        </LinearGradient>
                                    </View>
                                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <CustomTextInput
                                            keyboardType='numeric'
                                            icon={<MaterialIcons name="height" size={26} color="black" />}
                                            placeH="Boy"
                                            val={values.height}
                                            onChangeT={handleChange('height')}
                                            onB={handleBlur('height')}
                                            customStyle={{ backgroundColor: 'rgba(230,230,230,.6)' }}
                                        />
                                        <LinearGradient colors={['#C58BF2', '#EEA4CE']} style={{ width: '15%', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>CM</Text>
                                        </LinearGradient>
                                    </View>
                                    <CustomButton title="İleri" onP={handleSubmit} customStyle={{ backgroundColor: COLOR.authColor }} isLoading={isLoading} />
                                </View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}