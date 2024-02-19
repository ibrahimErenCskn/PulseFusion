import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface BmiDetailsProps {
    bmiDetailsName: "Underweight" | "Normal" | "Overweight" | "Obese"
}

export default function BmiDetails({ bmiDetailsName }: BmiDetailsProps) {
    const { t } = useTranslation()

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="human-male-board-poll" size={28} color="#009FFF" />
                <Text style={{ color: '#009FFF', fontWeight: '700', fontSize: 16 }}>
                    {bmiDetailsName}
                </Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                    {t('bmiIndexScreen.target')}: <Text style={{ fontWeight: '300' }}>{t(`bmiIndexScreen.${bmiDetailsName.toLocaleLowerCase()}.target`)}</Text>
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                    {t('bmiIndexScreen.motivation')}: <Text style={{ fontWeight: '300' }}>{t(`bmiIndexScreen.${bmiDetailsName.toLocaleLowerCase()}.motivation`)}</Text>
                </Text>
            </View>
        </View>
    )
}