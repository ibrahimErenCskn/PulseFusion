import { View, Text, Image, ScrollView, Dimensions, Pressable, TextInput, YellowBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MealPlanner from '@/components/MealPlanner'
import { useDispatch, useSelector } from 'react-redux'
import WidgetContainer from '@/components/WidgetContainer'
import { Link } from 'expo-router'
import CustomModal from '@/components/CustomModal'
import COLOR from '@/constants/Colors'
import CustomButton from '@/components/CustomButton'
import { writeDataInUsers } from '@/services/redux/reducers/firestore'
import ProgressBar from '@/components/ProgressBar'
import { AntDesign } from '@expo/vector-icons'

//Dil Desteği Ekle

export default function ActivityScreen() {
    const { userData, dayCalories, activityData } = useSelector((state: any) => state.allData)
    const [visible2, setVisible2] = useState(false)
    const [waterIntake_, setWaterIntake] = useState<string>()
    const data = ["body weight", "cable", "leverage machine", "assisted", "medicine ball", "barbell", "rope", "stability ball", "dumbbell", "ez barbell", "kettlebell", "olympic barbell", "weighted", "bosu ball", "sled machine", "smith machine", "wheel roller", "trap bar", "band", "hammer", "stationary bike", "upper body ergometer", "elliptical machine", "skierg machine", "roller", "stepmill machine", "tire", "resistance band"]
    const dispatch = useDispatch()


    function capitalizeFirstLetter(word: any) {
        return word.substr(0, 1).toUpperCase() + word.substr(1);
    }

    const waterSubmit = () => {

        dispatch(writeDataInUsers({
            data: {
                waterIntake: activityData?.waterIntake ? Number(activityData?.waterIntake) + Number(waterIntake_) : Number(waterIntake_)
            },
            writeType: "update",
            dataName: "activityData"
        }))
        setWaterIntake("")
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <MealPlanner setHeight={180} mealTypeText='Günlük Hedef' customStyle={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '49%', height: 100, backgroundColor: 'white', borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                            <Image source={require('@/assets/images/Bottel.png')} />
                            <View>
                                <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                    {(userData.weight * 0.06).toFixed(1)} L
                                </Text>
                                <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                    Su İçmelisin
                                </Text>
                                <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                    İçilen su : {activityData?.waterIntake ? (activityData?.waterIntake / 1000).toFixed(1) : 0} L
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: '49%', height: 100, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Image source={require('@/assets/images/FoodImg.png')} />
                            <View>
                                <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                    {dayCalories?.toFixed(0)} Kcal
                                </Text>
                                <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                    Almalısın
                                </Text>
                            </View>
                        </View>
                    </View>
                </MealPlanner>
                <WidgetContainer setHeight={100} customStyle={{ paddingBottom: 10 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', gap: 10 }}>
                        <View style={{ paddingTop: 8, width: '100%', paddingLeft: 6, alignItems: 'center', gap: 8, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: 'white', paddingLeft: 8 }}>Su Takibi</Text>
                            <CustomModal renderButton={<AntDesign name="pluscircleo" size={24} color="white" />} customFontSize={16} visible={visible2} setVisible={setVisible2} buttonText='+'>
                                <View style={{ width: Dimensions.get('window').width * .8, height: 400, backgroundColor: 'white', borderRadius: 20, padding: 4, alignItems: 'center', justifyContent: 'center', gap: 40 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                        İçilen su : {activityData?.waterIntake ? (activityData?.waterIntake / 1000).toFixed(1) : 0} L
                                    </Text>
                                    <TextInput value={waterIntake_} onChangeText={(text: any) => setWaterIntake(text)} keyboardType='numeric' placeholder='ml Giriniz' style={{ borderWidth: 1, width: '80%', borderRadius: 10, height: 40, paddingLeft: 4 }} />
                                    <CustomButton title='Ekle' onP={() => waterSubmit()} customStyle={{ backgroundColor: COLOR.appContainerColor }} disabled={waterIntake_ ? false : true} />
                                </View>
                            </CustomModal>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 6, rowGap: 4 }}>
                            <ProgressBar progress={activityData?.waterIntake ? parseInt((((activityData?.waterIntake) / ((userData.weight * 0.06) * 1000)) * 100).toFixed(1)) : 0} />
                        </View>
                    </View>
                </WidgetContainer>
                <WidgetContainer customStyle={{ alignItems: 'center', paddingVertical: 6 }} >
                    <View></View>
                </WidgetContainer>

                <WidgetContainer customStyle={{ marginBottom: 40 }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Ekipmanlara Göre Haraketler</Text>
                        </View>
                        {
                            data.map((v: any, i: number) => (
                                <Link key={i} href={{ pathname: '/(mainapp)/(otherscreens)/fitnessInfoScreen/', params: { name: v } }} style={{ paddingBottom: 15 }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>Ekipmanlar: <Text style={{ color: 'black', fontSize: 14 }}>{capitalizeFirstLetter(v)}</Text></Text>
                                </Link>
                            ))
                        }
                    </View>
                </WidgetContainer>
            </ScrollView>
        </SafeAreaView>
    )
}