import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'
import CustomModal from '@/components/CustomModal'
import { Formik } from 'formik'
import { writeDataInUsers } from '@/services/redux/reducers/firestore'
import SelectedButton from '@/components/SelectedButton'
import CustomButton from '@/components/CustomButton'
import COLOR from '@/constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { router } from 'expo-router'

export default function SetActivity() {
    const { isLoading } = useSelector((state: any) => state.userData)
    const [count, setCount] = useState(0)
    const [visible, setVisible] = useState(false)
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
        { title: '3 Gün Spora Gidicem', active: false },
        { title: '4 Gün Spora Gidicem', active: false },
        { title: '5 Gün Spora Gidicem', active: false },
        { title: '6 Gün Spora Gidicem', active: false }
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
                { title: '3 Gün Spora Gidicem', active: false },
                { title: '4 Gün Spora Gidicem', active: false },
                { title: '5 Gün Spora Gidicem', active: false },
                { title: '6 Gün Spora Gidicem', active: false }
            ])
        } else {
            setCount(count + 1)
        }
    }
    const dispatch = useDispatch()
    return (
        <View>
            <CustomModal buttonText='Program Belirle' buttonStyle={{ backgroundColor: COLOR.buttonColor, width: 160, height: 40, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }} visible={visible} setVisible={setVisible}>
                <Formik
                    initialValues={{ local: '', setCount: '', type: '', dayCount: '', }}
                    onSubmit={values => {
                        dispatch(writeDataInUsers({
                            data: values, writeType: 'set', dataName: 'activityData'
                        }))
                        if (values.dayCount) {
                            setVisible(!visible)
                        }
                        if (!isLoading) {
                            router.replace('/(mainapp)/(tabs)/homescreen/')
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
                                <CustomButton onP={() => itemSubmit(handleSubmit)} title={values.dayCount ? 'Bitir' : 'Devam'} customStyle={{ alignSelf: 'center', backgroundColor: COLOR.authColor }} />
                            </View>
                        </View>

                    )}
                </Formik>
            </CustomModal>
        </View>
    )
}