import { Stack } from 'expo-router/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function Layout() {
    const { t } = useTranslation()
    return (
        <Stack screenOptions={{
            statusBarTranslucent: true, statusBarStyle: 'dark', animation: 'ios',
            headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                </Pressable>
            )
        }}>
            <Stack.Screen name='splashscreen/index' options={{ headerShown: false }} />
            <Stack.Screen name='loginscreen/index' options={{ headerStyle: { backgroundColor: '#B5C9FF' }, headerTitle: t('loginScreen.login'), headerTitleAlign: 'center', headerShadowVisible: false }} />
            <Stack.Screen name='registerscreen/index' options={{ headerStyle: { backgroundColor: '#B5C9FF' }, headerTitle: t('registerScreen.register'), headerTitleAlign: 'center', headerShadowVisible: false }} />
        </Stack>
    )
}