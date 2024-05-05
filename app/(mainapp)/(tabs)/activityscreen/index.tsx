import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MealPlanner from '@/components/MealPlanner'
import { useDispatch, useSelector } from 'react-redux'
import WidgetContainer from '@/components/WidgetContainer'
import { Link } from 'expo-router'
import { writeDataInUsers } from '@/services/redux/reducers/firestore'
import ProgressBar from '@/components/ProgressBar'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons';
import { calculateFitnessProgram } from '@/services/utils/calculateFunc/deneme'

//Dil Desteği Ekle

export default function ActivityScreen() {
    const { userData, dayCalories, activityData, mealData } = useSelector((state: any) => state.allData)
    const data = ["abs", "lats", "pectorals", "hamstrings", "triceps", "quads", "biceps", "upper back", "glutes", "delts", "serratus anterior", "forearms", "calves", "traps", "adductors", "spine", "cardiovascular system", "abductors", "levator scapulae"]
    const dispatch = useDispatch()
    function capitalizeFirstLetter(word: any) {
        return word.substr(0, 1).toUpperCase() + word.substr(1);
    }

    const waterSubmit = () => {

        dispatch(writeDataInUsers({
            data: {
                waterIntake: activityData?.waterIntake ? parseInt(activityData?.waterIntake) + 200 : 200
            },
            writeType: "update",
            dataName: "activityData"
        }))
    }
    const waterRemove = () => {

        dispatch(writeDataInUsers({
            data: {
                waterIntake: parseInt(activityData?.waterIntake) - 200
            },
            writeType: "update",
            dataName: "activityData"
        }))
    }
    const waterReset = () => {

        dispatch(writeDataInUsers({
            data: {
                waterIntake: 0
            },
            writeType: "update",
            dataName: "activityData"
        }))
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                                <Text style={{ fontWeight: '700', fontSize: 14 }}>
                                    Alınan: {mealData?.calories ? mealData.calories : 0} Kcal
                                </Text>
                            </View>
                        </View>
                    </View>
                </MealPlanner>
                <WidgetContainer customStyle={{ paddingBottom: 10 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', gap: 10 }}>
                        <View style={{ paddingTop: 8, width: '100%', paddingLeft: 6, alignItems: 'center', gap: 24, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: 'black', paddingLeft: 8 }}>Su Takibi</Text>
                            <Pressable onPress={() => waterSubmit()}>
                                <AntDesign name="pluscircleo" size={24} color="white" />
                            </Pressable>

                            <Pressable onPress={() => waterRemove()} disabled={activityData?.waterIntake >= 200 ? false : true}>
                                <AntDesign name="minuscircleo" size={24} color="white" />
                            </Pressable>
                            <Pressable onPress={() => waterReset()} disabled={activityData?.waterIntake >= 200 ? false : true}>
                                <Text style={{ fontSize: 24, color: 'white' }}>Sıfırla</Text>
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'flex-start', justifyContent: 'flex-start', width: '92%' }}>
                            {
                                Array.from({ length: Math.floor(activityData?.waterIntake / 200) }).map((v, i) => <FontAwesome6 name="glass-water" size={24} color="white" key={i} />)
                            }
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 6, rowGap: 4 }}>
                            <ProgressBar progress={activityData?.waterIntake ? parseInt((((activityData?.waterIntake) / ((userData.weight * 0.06) * 1000)) * 100).toFixed(1)) : 0} />
                        </View>
                    </View>
                </WidgetContainer>
                <WidgetContainer customStyle={{ alignItems: 'center', paddingVertical: 6 }} >
                    <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 8 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: 'white', marginBottom: 6 }}>
                            Spor Programı
                        </Text>
                        <View style={{ width: '100%' }}>
                            {
                                calculateFitnessProgram({
                                    dayCount: activityData?.dayCount?.type,
                                    setCount: activityData?.setCount?.title,
                                    type: activityData?.type?.title
                                })?.map((v: any, i: number) => (
                                    <View key={i} style={{ gap: 3, borderWidth: 1, borderColor: 'white', borderRadius: 10, padding: 10, marginBottom: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>
                                            Gün : {v.day}
                                        </Text>
                                        {
                                            v.sets &&
                                            <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>
                                                Set : {v.sets}
                                            </Text>
                                        }
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
                                            {
                                                v.exercises.map((v: any, i: number) => (
                                                    <Text key={i} style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>
                                                        {v},
                                                    </Text>
                                                ))
                                            }
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </WidgetContainer>

                <WidgetContainer customStyle={{ marginBottom: 40 }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, fontWeight: '700' }}>Bölgelere Göre Haraketler</Text>
                        </View>
                        {
                            data.map((v: any, i: number) => (
                                <Link key={i} href={{ pathname: '/(mainapp)/(otherscreens)/fitnessInfoScreen/', params: { name: v } }} style={{ paddingBottom: 15 }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>Bölgeler: <Text style={{ color: 'black', fontSize: 14 }}>{capitalizeFirstLetter(v)}</Text></Text>
                                </Link>
                            ))
                        }
                    </View>
                </WidgetContainer>
            </ScrollView>
        </SafeAreaView >
    )
}