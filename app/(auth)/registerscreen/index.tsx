import { View, Text, Keyboard, SafeAreaView, TouchableWithoutFeedback, Pressable, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import LottieAnim from '@/services/lottie/LottieAnim'
import { Formik } from 'formik'
import { googleLoginAndRegister, registerHandle } from '@/services/redux/reducers/authSlice'
import CustomTextInput from '@/components/CustomTextInput'
import CustomButton from '@/components/CustomButton'
import SocialEntegration from '@/components/SocialEntegration'
import { router } from 'expo-router';
import COLOR from '@/constants/Colors'
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window')

export default function RegisterScreen() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.authColor, paddingVertical: 10 }}>
                <ScrollView>
                    <View style={{ height: height * 0.22, alignItems: 'center' }}>
                        <LottieAnim speed={0.8} anim={require('@/services/lottie/Anim/LoginAnim.json')} width={height * 0.3} height={height * 0.3} />
                    </View>
                    <View style={{ height: height * 0.45 }}>
                        <Formik
                            initialValues={{ username: '', email: '', password: '' }}
                            onSubmit={values => {
                                dispatch(registerHandle(values))
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40 }}>
                                    <View style={{ width: '100%', alignItems: 'center', gap: 30 }}>
                                        <CustomTextInput icon={<AntDesign name="user" size={26} color="black" />} placeH={t('registerScreen.username')} val={values.username} onChangeT={handleChange('username')} onB={handleBlur('username')} />
                                        <CustomTextInput icon={<Fontisto name="email" size={26} color="black" />} placeH={t('registerScreen.email')} val={values.email} onChangeT={handleChange('email')} onB={handleBlur('email')} />
                                        <CustomTextInput secureBoolean={true} icon={<MaterialIcons name="password" size={26} color="black" />} placeH={t('registerScreen.password')} val={values.password} onChangeT={handleChange('password')} onB={handleBlur('password')} />
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <CustomButton title={t('registerScreen.register')} onP={handleSubmit} />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View style={{ height: height * 0.15, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 50, justifyContent: 'center' }}>
                            <SocialEntegration path={require('@/assets/images/googleA.png')} custoImgStyle={{ width: 48, height: 48 }} setPress={() => dispatch(googleLoginAndRegister())} />
                            <SocialEntegration path={require('@/assets/images/facebookA.png')} custoImgStyle={{ width: 48, height: 48 }} />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{t('registerScreen.footer-text')}</Text>
                            <Pressable onPress={() => router.navigate('(auth)/loginscreen')}>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>{t('loginScreen.login')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
