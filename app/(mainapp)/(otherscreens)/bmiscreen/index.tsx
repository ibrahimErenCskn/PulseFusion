import { View, Text } from 'react-native'
import React from 'react'
import { PieChart } from "react-native-gifted-charts";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BmiDetails from '@/components/BmiDetails';


export default function BmiScreen() {
    const { t } = useTranslation()
    const { bmiIndex } = useSelector((state: any) => state.allData)
    return (
        <View
            style={{
                paddingVertical: 100,
                backgroundColor: '#34448B',
                flex: 1,
                justifyContent: 'center'
            }}>
            <View
                style={{
                    margin: 20,
                    padding: 16,
                    borderRadius: 20,
                    backgroundColor: '#232B5D',
                }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    BMİ-{t('homeScreen.bmiWidget.bmi')}
                </Text>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <PieChart
                        data={bmiIndex ? bmiIndex[0] : []}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        innerCircleColor={'#232B5D'}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                        {bmiIndex[0][0]?.value.toFixed(1)}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>{t(`homeScreen.bmiWidget.bmiIndexName.${bmiIndex[1].bmiName.toLowerCase()}`)}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <BmiDetails bmiDetailsName={bmiIndex[1].bmiName} />
            </View>
        </View>
    )
}