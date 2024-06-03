import { Keyboard, Pressable, SafeAreaView, Text, TouchableWithoutFeedback, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import CustomTextInput from '@/components/CustomTextInput';
import CustomButton from '@/components/CustomButton';
import SocialEntegration from '@/components/SocialEntegration';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginHandle, googleLoginAndRegister } from '@/services/redux/reducers/authSlice'
import LottieAnim from '@/services/lottie/LottieAnim';
import { useTranslation } from 'react-i18next'
import COLOR from '@/constants/Colors';
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
const { height } = Dimensions.get('window')

export default function LoginScreen() {
    const [hata, setHata] = useState("")
    const allError = [
        { "code": "auth/claims-too-large", "description": "setCustomUserClaims() işlevine sağlanan talep yükü, izin verilen maksimum boyut olan 1000 baytı aşıyor." },
        { "code": "auth/email-already-exists", "description": "Sağlanan e-posta zaten mevcut bir kullanıcı tarafından kullanılıyor. Her kullanıcının benzersiz bir e-posta adresi olması gerekir." },
        { "code": "auth/id-token-expired", "description": "Sağlanan Firebase ID jetonunun süresi doldu." },
        { "code": "auth/id-token-revoked", "description": "Firebase ID jetonu iptal edildi." },
        { "code": "auth/insufficient-permission", "description": "Yönetici SDK'sını başlatmak için kullanılan kimlik bilgisinin, istenen Kimlik Doğrulama kaynağına erişim izni yeterli değil. Uygun izinlere sahip bir kimlik bilgisinin nasıl oluşturulacağı ve bunu Yönetici SDK'larının kimliğini doğrulamak için nasıl kullanacağınızla ilgili belgeler için Firebase projesi oluşturma bölümüne bakın." },
        { "code": "auth/internal-error", "description": "Kimlik Doğrulama sunucusu, isteği işlemeye çalışırken beklenmeyen bir hatayla karşılaştı. Hata mesajı, Kimlik Doğrulama sunucusundan gelen ek bilgileri içeren yanıtı içermelidir. Hata devam ederse lütfen sorunu Hata Raporu destek kanalımıza bildirin." },
        { "code": "auth/invalid-argument", "description": "Kimlik Doğrulama yöntemine geçersiz bir bağımsız değişken sağlandı. Hata mesajı ek bilgiler içermelidir." },
        { "code": "auth/invalid-claims", "description": "setCustomUserClaims() işlevine sağlanan özel talep öznitelikleri geçersiz." },
        { "code": "auth/invalid-continue-uri", "description": "Devam URL'si geçerli bir URL dizesi olmalıdır." },
        { "code": "auth/invalid-creation-time", "description": "Oluşturma zamanı geçerli bir UTC tarih dizisi olmalıdır." },
        { "code": "auth/invalid-credential", "description": "Yönetici SDK'larının kimliğini doğrulamak için kullanılan kimlik bilgileri, istenen eylemi gerçekleştirmek için kullanılamaz. createCustomToken() ve verifyIdToken() gibi belirli Kimlik Doğrulama yöntemleri, SDK'nın yenileme belirteci veya Uygulama Varsayılanı kimlik bilgisi yerine bir sertifika kimlik bilgisiyle başlatılmasını gerektirir. Sertifika kimlik bilgileriyle Yönetici SDK'larının kimliğinin nasıl doğrulanacağına ilişkin belgeler için bkz. SDK'yı başlatma." },
        { "code": "auth/invalid-disabled-field", "description": "disabled kullanıcı özelliği için sağlanan değer geçersiz. Bir boole olmalı." },
        { "code": "auth/invalid-display-name", "description": "displayName kullanıcı özelliği için sağlanan değer geçersiz. Boş olmayan bir dize olmalıdır." },
        { "code": "auth/invalid-dynamic-link-domain", "description": "Sağlanan dinamik bağlantı etki alanı, mevcut proje için yapılandırılmamış veya yetkilendirilmemiş." },
        { "code": "auth/invalid-email", "description": "email kullanıcı özelliği için sağlanan değer geçersiz. Bir dize e-posta adresi olmalıdır." },
        { "code": "auth/invalid-email-verified", "description": "emailVerified kullanıcı özelliği için sağlanan değer geçersiz. Bir boole olmalı." },
        { "code": "auth/invalid-hash-algorithm", "description": "Karma algoritmanın, desteklenen algoritmalar listesindeki dizelerden biriyle eşleşmesi gerekir." },
        { "code": "auth/invalid-hash-block-size", "description": "Karma blok boyutu geçerli bir sayı olmalıdır." },
        { "code": "auth/invalid-hash-derived-key-length", "description": "Karma türetilmiş anahtar uzunluğu geçerli bir sayı olmalıdır." },
        { "code": "auth/invalid-hash-key", "description": "Karma anahtarının geçerli bir bayt arabelleği olması gerekir." },
        { "code": "auth/invalid-hash-memory-cost", "description": "Karma bellek maliyeti geçerli bir sayı olmalıdır." },
        { "code": "auth/invalid-hash-parallelization", "description": "Karma paralelleştirmenin geçerli bir sayı olması gerekir." },
        { "code": "auth/invalid-hash-rounds", "description": "Karma turları geçerli bir sayı olmalıdır." },
        { "code": "auth/invalid-hash-salt-separator", "description": "Karma algoritması tuz ayırıcı alanı geçerli bir bayt arabelleği olmalıdır." },
        { "code": "auth/invalid-id-token", "description": "Sağlanan kimlik jetonu geçerli bir Firebase ID jetonu değil." },
        { "code": "auth/invalid-last-sign-in-time", "description": "Son oturum açma zamanı geçerli bir UTC tarih dizisi olmalıdır." },
        { "code": "auth/invalid-page-token", "description": "listUsers() da sağlanan sonraki sayfa belirteci geçersiz. Boş olmayan geçerli bir dize olmalıdır." },
        { "code": "auth/invalid-password", "description": "password kullanıcı özelliği için sağlanan değer geçersiz. En az altı karakterden oluşan bir dize olmalıdır." },
        { "code": "auth/invalid-password-hash", "description": "Parola karmasının geçerli bir bayt arabelleği olması gerekir." },
        { "code": "auth/invalid-password-salt", "description": "Parola tuzu geçerli bir bayt arabelleği olmalıdır." },
        { "code": "auth/invalid-phone-number", "description": "phoneNumber için sağlanan değer geçersiz. Boş olmayan, E.164 standardına uygun bir tanımlayıcı dize olmalıdır." },
        { "code": "auth/invalid-photo-url", "description": "photoURL kullanıcı özelliği için sağlanan değer geçersiz. Bir dize URL'si olmalıdır." },
        { "code": "auth/invalid-provider-data", "description": "ProviderData, geçerli bir UserInfo nesneleri dizisi olmalıdır." },
        { "code": "auth/invalid-provider-id", "description": "SağlayıcıId, geçerli bir desteklenen sağlayıcı tanımlayıcı dizesi olmalıdır." },
        { "code": "auth/invalid-oauth-responsetype", "description": "Yalnızca tam olarak bir OAuth responseType true olarak ayarlanmalıdır." },
        { "code": "auth/invalid-session-cookie-duration", "description": "Oturum çerezi süresi, 5 dakika ile 2 hafta arasında, milisaniye cinsinden geçerli bir sayı olmalıdır." },
        { "code": "auth/invalid-uid", "description": "Sağlanan uid en fazla 128 karakterden oluşan, boş olmayan bir dize olmalıdır." },
        { "code": "auth/invalid-user-import", "description": "İçe aktarılacak kullanıcı kaydı geçersiz." },
        { "code": "auth/maximum-user-count-exceeded", "description": "İçe aktarmaya izin verilen maksimum kullanıcı sayısı aşıldı." },
        { "code": "auth/missing-android-pkg-name", "description": "Android Uygulamasının yüklenmesi gerekiyorsa bir Android Paket Adı sağlanmalıdır." },
        { "code": "auth/missing-continue-uri", "description": "İstekte geçerli bir devam URL'si sağlanmalıdır." },
        { "code": "auth/missing-hash-algorithm", "description": "Kullanıcıları parola karmalarıyla içe aktarmak, karma algoritmasının ve parametrelerinin sağlanmasını gerektirir." },
        { "code": "auth/missing-ios-bundle-id", "description": "İstekte Paket Kimliği eksik." },
        { "code": "auth/missing-uid", "description": "Geçerli işlem için bir uid kimliği tanımlayıcısı gereklidir." },
        { "code": "auth/missing-oauth-client-secret", "description": "OIDC kod akışını etkinleştirmek için OAuth yapılandırma istemci sırrı gereklidir." },
        { "code": "auth/operation-not-allowed", "description": "Sağlanan oturum açma sağlayıcısı Firebase projeniz için devre dışı bırakıldı. Firebase konsolunun Oturum Açma Yöntemi bölümünden etkinleştirin." },
    ]
    function splitString(input: string) {
        const regex = /(\[.*?\])/;// Parantez dahil içindeki kısmı yakalayan regex
        const match: any = input.match(regex);

        if (match) {
            const beforeParenthesis = input.substring(0, match.index);
            const parenthesisAndAfter = input.substring(match.index);
            allError.filter((item: any) => {
                if (item.code === beforeParenthesis) {
                    setHata(item.description)
                }
            })
        } else {
            return [input, '']; // Parantez yoksa tüm metni ilk kısma koyar, ikinci kısmı boş bırakır
        }
    }
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { error } = useSelector((state: any) => state.auth)
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.authColor, paddingVertical: 10 }}>
                <ScrollView>
                    <View style={{ height: height * 0.20, alignItems: 'center', justifyContent: 'center' }}>
                        <LottieAnim speed={0.8} anim={require('@/services/lottie/Anim/LoginAnim.json')} width={height * 0.3} height={height * 0.3} />
                    </View>
                    <View style={{ height: height * 0.45 }}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={values => {
                                dispatch(loginHandle(values.email && values.password ? values : null))
                                console.log(hata)
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40 }}>
                                    <View style={{ width: '100%', alignItems: 'center', gap: 50 }}>
                                        <CustomTextInput icon={<Fontisto name="email" size={26} color="black" />} placeH={t('loginScreen.email')} val={values.email} onChangeT={handleChange('email')} onB={handleBlur('email')} />
                                        <CustomTextInput secureBoolean={true} icon={<MaterialIcons name="password" size={26} color="black" />} placeH={t('loginScreen.password')} val={values.password} onChangeT={handleChange('password')} onB={handleBlur('password')} />
                                    </View>
                                    <View >
                                        <Text style={{ color: 'red' }}>{error.toString()}</Text>
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