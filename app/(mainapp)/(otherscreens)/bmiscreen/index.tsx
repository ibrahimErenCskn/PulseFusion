import { View, Text } from 'react-native'
import React from 'react'
import { PieChart } from "react-native-gifted-charts";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BmiDetails from '@/components/BmiDetails';


export default function BmiScreen() {
    const { t } = useTranslation()
    const { bmiIndex } = useSelector((state: any) => state.calculate)
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
                        data={[
                            {
                                value: bmiIndex?.bmi,
                                color: '#009FFF',
                                gradientCenterColor: '#006DFF',
                                focused: true,
                            },
                            { value: bmiIndex?.bmi > 32 ? 0 : 32 - bmiIndex?.bmi, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
                        ]}
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
                                        {bmiIndex?.bmi.toFixed(1)}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'white' }}>{t(`homeScreen.bmiWidget.bmiIndexName.${bmiIndex.bmiName.toLowerCase()}`)}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <BmiDetails bmiDetailsName={bmiIndex.bmiName} />
            </View>
        </View>
    )
}