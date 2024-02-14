import { Keyboard, Pressable, SafeAreaView, Text, TouchableWithoutFeedback, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import CustomTextInput from '@/components/CustomTextInput';
import CustomButton from '@/components/CustomButton';
import SocialEntegration from '@/components/SocialEntegration';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { loginHandle, googleLoginAndRegister } from '@/services/redux/reducers/authSlice'
import LottieAnim from '@/services/lottie/LottieAnim';
import { useTranslation } from 'react-i18next'
import COLOR from '@/constants/Colors';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window')

export default function LoginScreen() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.authColor, paddingVertical: 10 }}>
                <ScrollView>
                    <View style={{ height: height * 0.25, alignItems: 'center' }}>
                        <LottieAnim speed={0.8} anim={require('@/services/lottie/Anim/LoginAnim.json')} width={height * 0.3} height={height * 0.3} />
                    </View>
                    <View style={{ height: height * 0.45 }}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={values => {
                                dispatch(loginHandle(values))
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40 }}>
                                    <View style={{ width: '100%', alignItems: 'center', gap: 50 }}>
                                        <CustomTextInput icon={<Fontisto name="email" size={26} color="black" />} placeH={t('loginScreen.email')} val={values.email} onChangeT={handleChange('email')} onB={handleBlur('email')} />
                                        <CustomTextInput secureBoolean={true} icon={<MaterialIcons name="password" size={26} color="black" />} placeH={t('loginScreen.password')} val={values.password} onChangeT={handleChange('password')} onB={handleBlur('password')} />
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <CustomButton title={t('loginScreen.login')} onP={handleSubmit} />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View style={{ height: height * 0.15, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', gap: 50, justifyContent: 'center' }}>
                            <SocialEntegration path={require('../../../assets/images/googleA.png')} custoImgStyle={{ width: 48, height: 48 }} setPress={() => dispatch(googleLoginAndRegister())} />
                            <SocialEntegration path={require('../../../assets/images/facebookA.png')} custoImgStyle={{ width: 48, height: 48 }} />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{t('loginScreen.footer-text')}</Text>
                            <Pressable onPress={() => router.navigate('(auth)/registerscreen')}>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>{t('registerScreen.register')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}