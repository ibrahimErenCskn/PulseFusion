import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MealPlanner from '@/components/MealPlanner'
import { useDispatch, useSelector } from 'react-redux'
import WidgetContainer from '@/components/WidgetContainer'
import { Link, router } from 'expo-router'
import { writeDataInUsers } from '@/services/redux/reducers/firestore'
import ProgressBar from '@/components/ProgressBar'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons';
import { calculateFitnessProgram } from '@/services/utils/calculateFunc/deneme'
import Body from "react-native-body-highlighter";
import COLOR from '@/constants/Colors'

//Dil Desteği Ekle

export default function ActivityScreen() {
    const { userData, dayCalories, activityData, mealData } = useSelector((state: any) => state.allData)
    const [flip, setFlip] = useState(false)
    const dispatch = useDispatch()
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
    const frontSide: any = [
        { slug: "chest", intensity: 2 },
        { slug: "abs", intensity: 2 },
        { slug: "quadriceps", intensity: 2 },
        { slug: "biceps", intensity: 2 },
        { slug: "forearm", intensity: 2 },
        { slug: "calves", intensity: 2 },
        { slug: "deltoids", intensity: 2 },
        { slug: "neck", intensity: 2 },
        { slug: "obliques", intensity: 2 },
        { slug: "tibialis", intensity: 2 },
        { slug: "adductors", intensity: 2 },
        { slug: "triceps", intensity: 2 },
    ]
    const backSide: any = [
        { slug: "triceps", intensity: 2 },
        { slug: "lower-back", intensity: 2 },
        { slug: "upper-back", intensity: 2 },
        { slug: "trapezius", intensity: 2 },
        { slug: "gluteal", intensity: 2 },
        { slug: "calves", intensity: 2 },
        { slug: "hamstring", intensity: 2 },
        { slug: "adductors", intensity: 2 },
        { slug: "deltoids", intensity: 2 },
        { slug: "neck", intensity: 2 },
        { slug: "forearm", intensity: 2 },
    ]
    const clickBodyPart = (bodyPart: any) => {
        const data = [
            {
                name: "chest",
                pathName: "pectorals"
            },
            {
                name: "abs",
                pathName: "abs"
            },
            {
                name: "quadriceps",
                pathName: "quads"
            },
            {
                name: "biceps",
                pathName: "biceps"
            },
            {
                name: "forearm",
                pathName: "forearms"
            },
            {
                name: "calves",
                pathName: "calves"
            },
            {
                name: "deltoids",
                pathName: "delts"
            },
            {
                name: "triceps",
                pathName: "triceps"
            },
            {
                name: "lower-back",
                pathName: "upper back"
            },
            {
                name: "upper-back",
                pathName: "upper back"
            },
            {
                name: "trapezius",
                pathName: "traps"
            },
            {
                name: "gluteal",
                pathName: "glutes"
            },
            {
                name: "hamstring",
                pathName: "hamstrings"
            },
            {
                name: "adductors",
                pathName: "adductors"
            },
            {
                name: "neck",
                pathName: "levator scapulae"
            },
            {
                name: "obliques",
                pathName: "abs"
            },
            {
                name: "tibialis",
                pathName: "calves"
            },
        ]
        router.push({ pathname: '/(mainapp)/(otherscreens)/fitnessInfoScreen/', params: { name: data.filter((item: any) => item.name === bodyPart)[0].pathName } })
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
                    <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 8 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: 'black', marginBottom: 6 }}>
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
                            flip ? <Body
                                data={backSide}
                                gender={userData.gender === "Male" ? "male" : "female"}
                                side="back"
                                scale={1.7}
                                onBodyPartPress={(bodyPart) => { bodyPart.color === "#74b9ff" ? clickBodyPart(bodyPart.slug) : null }}
                            /> :
                                <Body
                                    data={frontSide}
                                    gender={userData.gender === "Male" ? "male" : "female"}
                                    side="front"
                                    scale={1.7}
                                    onBodyPartPress={(bodyPart) => { bodyPart.color === "#74b9ff" ? clickBodyPart(bodyPart.slug) : null }}
                                />
                        }
                        <Pressable onPress={() => setFlip(!flip)} style={{ width: 100, height: 40, alignSelf: 'center', justifyContent: 'center', backgroundColor: COLOR.authColor, alignItems: 'center', borderRadius: 20, marginBottom: 15 }}>
                            <Text style={{ color: 'black', fontWeight: '700' }}>Çevir</Text>
                        </Pressable>
                    </View>
                </WidgetContainer>
            </ScrollView>
            <View>
            </View>
        </SafeAreaView >
    )
}