import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface BmiDetailsProps {
    bmiDetailsName: "Underweight" | "Normal" | "Overweight" | "Obese"
}

export default function BmiDetails({ bmiDetailsName }: BmiDetailsProps) {
    if (bmiDetailsName === "Underweight") {
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
                        Hedefiniz: <Text style={{ fontWeight: '300' }}>Sağlıklı bir kiloya ulaşmak.</Text>
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                        Motivasyon: <Text style={{ fontWeight: '300' }}>Yeterli besin aldığınızdan emin olun ve kas kütlesi kazanmaya odaklanın. Dengeli ve besleyici bir diyet uygulayın ve düzenli egzersiz yapın.</Text>
                    </Text>
                </View>
            </View>
        )
    }
    else if (bmiDetailsName === "Normal") {
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
                        Hedefiniz: <Text style={{ fontWeight: '300' }}>Mevcut kilonuzu korumak.</Text>
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                        Motivasyon: <Text style={{ fontWeight: '300' }}>Sağlıklı yaşam tarzınızı sürdürün. Dengeli ve besleyici bir diyet uygulayın ve düzenli egzersiz yapın.</Text>
                    </Text>
                </View>
            </View>
        )
    }
    else if (bmiDetailsName === "Overweight") {
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
                        Hedefiniz: <Text style={{ fontWeight: '300' }}>Fazla kilolardan kurtulmak ve sağlıklı bir kiloya ulaşmak.</Text>
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                        Motivasyon: <Text style={{ fontWeight: '300' }}>Sağlıklı bir kiloya ulaşmak için küçük ve sürdürülebilir değişiklikler yapmaya başlayın. Kalori alımınızı kontrollü bir şekilde azaltın ve düzenli egzersiz yapın.</Text>
                    </Text>
                </View>
            </View>
        )
    }
    else {
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
                        Hedefiniz: <Text style={{ fontWeight: '300' }}>Fazla kilolardan kurtulmak ve sağlıklı bir kiloya ulaşmak.</Text>
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                        Motivasyon: <Text style={{ fontWeight: '300' }}>Uzun vadeli sağlık için kilo verme yolculuğuna çıkın. Doktorunuza veya diyetisyeninize danışarak size özel bir plan oluşturun. Düzenli egzersiz ve sağlıklı beslenmeyle hedefinize ulaşabilirsiniz.</Text>
                    </Text>
                </View>
            </View>
        )
    }
}