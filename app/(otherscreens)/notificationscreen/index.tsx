import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function NotifictionScreen() {
    const { t } = useTranslation()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 6, gap: 16, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)' }}>
                <Ionicons name="chevron-back" size={28} color="black" />
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {t('notificationScreen.notification')}
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}