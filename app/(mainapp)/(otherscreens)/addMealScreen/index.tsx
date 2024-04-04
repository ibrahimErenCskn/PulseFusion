import { View, Text, FlatList, SafeAreaView, TextInput, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import COLOR from '@/constants/Colors';

export default function MealAddScreen() {
    const DATA = require('@/services/utils/fitnessDb/food_data.json')
    const [searchText, setSearchText] = React.useState('');
    const [data, setData] = React.useState(DATA);
    const [addMealData, setAddMealData] = React.useState<any>([]);
    const searchFunction = (text: any) => {
        setSearchText(text);
        text = text.toLowerCase();
        if (text === "") {
            setData(DATA);
        }
        else {
            setData(data.filter((language: any) => (language.name.toLowerCase().includes(text))));
        }
    }

    const renderItem = ({ item }: any) => (
        <View style={styles.box} key={item.id}>
            <Text style={styles.title}> {item.name} </Text>
            <View style={{ alignItems: 'center' }}>
                <Text>gr</Text>
                <Text>100</Text>
            </View>
            <View style={{ flex: 1, gap: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text>Protin</Text>
                    <Text>{item.protein}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>Şeker</Text>
                    <Text>{item.suger}</Text>
                </View>
            </View>
            <View style={{ flex: 1, gap: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text>Yağ</Text>
                    <Text>{item.fat}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>Kalori</Text>
                    <Text>{item.calories}</Text>
                </View>
            </View>
            <Pressable style={{ marginRight: 6, height: '100%', justifyContent: 'center' }} onPress={() => {
                if (addMealData.find((data: any) => data.id === item.id)) return
                setAddMealData([...addMealData, item])
            }}>
                <Ionicons name="add-sharp" size={24} color="black" />
            </Pressable>
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholderTextColor="black"
                    placeholder="Besin Ara"
                    value={searchText}
                    onChangeText={text => searchFunction(text)}
                />
            </View>
            <View style={styles.listDataContainer}>
                <FlatList
                    data={data}
                    extraData={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLOR.appContainerColor, width: '95%', alignSelf: 'center', marginBottom: 8, borderRadius: 16 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 6, fontSize: 24 }}>Eklenenler</Text>
                <FlatList
                    data={addMealData}
                    extraData={addMealData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.box}>
                            <Text style={{ color: 'white' }}> {item.name} </Text>
                            <TextInput keyboardType='numeric' placeholder='gram' style={{ borderWidth: 1, width: 50, height: 40, borderRadius: 10, paddingLeft: 6 }} />
                            <Pressable style={{ marginRight: 6, height: '100%', justifyContent: 'center' }} onPress={() => {
                                setAddMealData(addMealData.filter((data: any) => data.id !== item.id))
                            }}>
                                <Ionicons name="close-sharp" size={24} color="white" />
                            </Pressable>
                        </View>
                    )}
                    initialNumToRender={5}
                    keyExtractor={(item) => item.id}
                />
                <Pressable style={{ backgroundColor: COLOR.buttonColor, width: 200, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 6 }} onPress={() => {
                    console.log(addMealData)
                }}>
                    <Text>Kaydet</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchBarContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    },
    title: {
        color: 'black',
    },
    searchBar: {
        width: 200,
        height: 50,
        borderColor: '#999999',
        backgroundColor: '#ffffff',
        marginTop: 20,
        paddingLeft: 10,
        color: 'black',
        borderWidth: 1,
        borderRadius: 15,
    },
    listDataContainer: {
        height: 205,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    box: {
        width: Dimensions.get('window').width * .9,
        height: 100,
        marginBottom: 4,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 15,
        gap: 10
    },
});