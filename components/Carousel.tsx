import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
const { height } = Dimensions.get('window');
const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

interface CarouselItemsProps {
    carouselItem: Array<object>
    setMaxHeight?: number
    renderItems: any
}
export default function Caursel({ carouselItem, setMaxHeight, renderItems }: CarouselItemsProps) {
    let flatListRef = useRef<any | null>();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Only needed if want to know the index
    const onViewRef = useRef(({ changed }: { changed: any }) => {
        if (changed[0].isViewable) {
            setCurrentIndex(changed[0].index);
        }
    });
    const scrollToIndex = (index: number) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={carouselItem ? carouselItem : [{}]}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ref={(ref) => {
                    flatListRef.current = ref;
                }}
                style={{ maxHeight: setMaxHeight ? setMaxHeight : height * 0.3 }}
                viewabilityConfig={viewConfigRef}
                onViewableItemsChanged={onViewRef.current}
            />

            <View style={styles.dotView}>
                {carouselItem?.map(({ }, index: number) => (
                    <TouchableOpacity
                        key={index.toString()}
                        style={[
                            styles.circle,
                            { backgroundColor: index == currentIndex ? 'black' : 'grey' },
                        ]}
                        onPress={() => scrollToIndex(index)}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    circle: {
        width: 10,
        height: 10,
        backgroundColor: 'grey',
        borderRadius: 50,
        marginHorizontal: 5,
    },
});
