import { View, Text, TouchableWithoutFeedback, Keyboard, Pressable, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomTextInput from '@/components/CustomTextInput'
import CustomButton from '@/components/CustomButton'
import COLOR from '@/constants/Colors'
import { router, useLocalSearchParams } from 'expo-router'
import { writeDataInUsers } from '@/services/redux/reducers/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import SelectedButton from '@/components/SelectedButton'
import Animated, { LightSpeedInRight } from 'react-native-reanimated'

export default function ProfileEdit() {
    const { userData } = useSelector((state: any) => state.allData)
    const { isLoading } = useSelector((state: any) => state.userData)
    const dispatch = useDispatch()
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [count, setCount] = useState(0)
    const { type } = useLocalSearchParams()
    const [changeAction, setChangeAction] = useState(true)
    const [typeData_, settypeData] = useState([
        {
            title: "Zayıflamak İstiyorum",
            description: "Description",
            active: false,
            activitiyType: 2
        },
        {
            title: "Kilo Almak İstiyorum",
            description: "Description",
            active: false,
            activitiyType: 1
        },
        {
            title: "Kilomda Devam Etmek İstiyorum",
            description: "Description",
            active: false,
            activitiyType: 0
        }
    ])
    const [movingData, setMovingData] = useState([
        {
            title: "Hareketli Bir Hayatım Var",
            description: "Description",
            active: false,
            activitiyType: 2
        },
        {
            title: "Az Haraket Ediyorum",
            description: "Description",
            active: false,
            activitiyType: 1
        },
        {
            title: "Haraket Etmiyorum",
            description: "Description",
            active: false,
            activitiyType: 0
        }
    ])


    const [localData, setLocalData] = useState([
        { title: 'Spor Salonu', active: false },
        { title: 'Evde Çalışma', active: false }
    ])
    const [countData, setcountData] = useState([
        { title: '3 x 15', active: false },
        { title: '4 x 12', active: false },
        { title: '4 x 8', active: false }
    ])
    const [typeData, setTypeData] = useState([
        { title: 'Full Body', active: false },
        { title: 'Split', active: false }
    ])
    const [dayCountData, setDayCounData] = useState([
        { title: '3 Gün Spora Gidicem', active: false, type: 3 },
        { title: '4 Gün Spora Gidicem', active: false, type: 4 },
        { title: '5 Gün Spora Gidicem', active: false, type: 5 },
        { title: '6 Gün Spora Gidicem', active: false, type: 6 }
    ])

    const itemSubmit = (submit: any) => {
        if (count === 3) {
            submit()
            setCount(0)
            setLocalData([
                { title: 'Spor Salonu', active: false },
                { title: 'Evde Çalışma', active: false }
            ])
            setcountData([
                { title: '3 x 15', active: false },
                { title: '4 x 12', active: false },
                { title: '4 x 8', active: false }
            ])
            setTypeData([
                { title: 'Full Body', active: false },
                { title: 'Split', active: false }
            ])
            setDayCounData([
                { title: '3 Gün Spora Gidicem', active: false, type: 3 },
                { title: '4 Gün Spora Gidicem', active: false, type: 4 },
                { title: '5 Gün Spora Gidicem', active: false, type: 5 },
                { title: '6 Gün Spora Gidicem', active: false, type: 6 }
            ])
        } else {
            setCount(count + 1)
        }
    }
    const mealItemSubmit = (submit: any) => {
        if (count === 1) {
            submit()
            setCount(0)
            setMovingData([
                {
                    title: "Hareketli Bir Hayatım Var",
                    description: "Description",
                    active: false,
                    activitiyType: 2
                },
                {
                    title: "Az Haraket Ediyorum",
                    description: "Description",
                    active: false,
                    activitiyType: 1
                },
                {
                    title: "Haraket Etmiyorum",
                    description: "Description",
                    active: false,
                    activitiyType: 0
                }
            ])
            settypeData([
                {
                    title: "Zayıflamak İstiyorum",
                    description: "Description",
                    active: false,
                    activitiyType: 2
                },
                {
                    title: "Kilo Almak İstiyorum",
                    description: "Description",
                    active: false,
                    activitiyType: 1
                },
                {
                    title: "Kilomda Devam Etmek İstiyorum",
                    description: "Description",
                    active: false,
                    activitiyType: 0
                }
            ])

        } else {
            setCount(count + 1)
        }
    }
    if (type === 'activity') {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Formik
                    initialValues={{ local: '', setCount: '', type: '', dayCount: '', }}
                    onSubmit={values => {
                        dispatch(writeDataInUsers({
                            data: values, writeType: 'update', dataName: 'activityData'
                        }))
                        if (!isLoading) {
                            router.replace('/(mainapp)/(tabs)/profilescreen/')
                        }
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <View style={{ height: Dimensions.get('window').height * .6, width: Dimensions.get('window').width * .9, backgroundColor: 'white', borderRadius: 14 }}>
                            <View style={{ flex: 1, justifyContent: 'center', gap: 20 }}>
                                {
                                    count === 0 ? (<View><SelectedButton data={localData} setData={setLocalData} setFieldValue={setFieldValue} type={'local'} /></View>) :
                                        count === 1 ? (<View><SelectedButton data={countData} setData={setcountData} setFieldValue={setFieldValue} type={'setCount'} /></View>) :
                                            count === 2 ? (<View><SelectedButton data={typeData} setData={setTypeData} setFieldValue={setFieldValue} type={'type'} /></View>) :
                                                count === 3 && (<View><SelectedButton data={dayCountData} setData={setDayCounData} setFieldValue={setFieldValue} type={'dayCount'} /></View>)
                                }
                                <CustomButton onP={() => itemSubmit(handleSubmit)} title={count === 3 ? 'Bitir' : 'Devam'} customStyle={{ borderWidth: 2, alignSelf: 'center' }} />
                            </View>
                        </View>

                    )}
                </Formik>
            </SafeAreaView>
        )
    }
    if (type === 'meal') {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Formik
                    initialValues={{ type1: '', type2: '', }}
                    onSubmit={values => {
                        dispatch(writeDataInUsers({
                            data: values, writeType: 'update', dataName: 'mealData'
                        }))
                        if (!isLoading) {
                            router.replace('/(mainapp)/(tabs)/profilescreen/')
                        }
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <View style={{ height: Dimensions.get('window').height * .6, width: Dimensions.get('window').width * .9, backgroundColor: 'white', borderRadius: 14 }}>
                            <View style={{ flex: 1, justifyContent: 'center', gap: 20 }}>
                                {
                                    count === 0 ? (<View><SelectedButton data={typeData_} setData={settypeData} setFieldValue={setFieldValue} type={'type1'} /></View>) :
                                        count === 1 && (<View><SelectedButton data={movingData} setData={setMovingData} setFieldValue={setFieldValue} type={'type2'} /></View>)
                                }
                                <CustomButton onP={() => mealItemSubmit(handleSubmit)} title={count === 1 ? 'Bitir' : 'Devam'} customStyle={{ borderWidth: 2, alignSelf: 'center' }} />
                            </View>
                        </View>

                    )}
                </Formik>
            </SafeAreaView>
        )
    }
    return (
        type === 'profile' &&
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled={true}>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                <View style={{ position: 'relative' }}>
                    <Text style={{ position: 'absolute', top: -15, left: 10, width: 50, textAlign: 'center', zIndex: 9999, fontSize: 20, fontWeight: '600', backgroundColor: 'white' }}>Boy</Text>
                    <CustomTextInput customStyle={{ borderRadius: 0, borderWidth: 1, height: 55 }} keyboardType='numeric' placeH={userData?.height} val={height} onChangeT={(text: any) => setHeight(text)} onB={() => { }} />
                </View>
                <View style={{ position: 'relative' }}>
                    <Text style={{ position: 'absolute', top: -15, left: 10, width: 50, textAlign: 'center', zIndex: 9999, fontSize: 20, fontWeight: '600', backgroundColor: 'white' }}>Kilo</Text>
                    <CustomTextInput customStyle={{ borderRadius: 0, borderWidth: 1, height: 55 }} keyboardType='numeric' placeH={userData?.weight} val={weight} onChangeT={(text: any) => setWeight(text)} onB={() => { }} />
                </View>
                <CustomButton customStyle={{ backgroundColor: COLOR.appContainerColor }} title='Kaydet' onP={() => dispatch(writeDataInUsers({ data: { weight: weight, height: height }, dataName: 'userData', writeType: 'update' }))} />
            </View >
        </TouchableWithoutFeedback>
    )
}