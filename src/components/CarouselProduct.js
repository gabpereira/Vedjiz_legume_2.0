import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {ip, port} from '../../app.json';

export default function CarouselProduct( props ) {
    const [quantity, setQuantity] = React.useState(null);

    function getChangeStock({ navigation }, product) {
        navigation.navigate("sendChangeOfStock", { product: product })
    }

    const { navigation } = props;
    return (
        <View style={styles.background}>
            <Image style={styles.picture} source={{ uri: `http://${ip}:${port}/storage/pictures/${props.product.picture}` }} />
            <Text style={styles.cash}>{props.product.name}</Text>
            <TouchableOpacity onPress={() => this.SwapSlide.snapToPrev()}><Icon name='arrow-back-outline' size={25} color='black' /></TouchableOpacity>
            <TouchableOpacity onPress={() => this.SwapSlide.snapToNext()}><Icon name='arrow-forward-outline' size={25} color='black' /></TouchableOpacity>
            <Text>Stock: </Text>
            <TextInput placeholder={String(props.product.stock)} onChangeText={setQuantity} keyboardType="phone-pad"/>
            <Text>{props.product.unit}</Text>
            <TouchableOpacity onPress={() => getChangeStock({ navigation }, props.product)}>
                <Text style={[styles.back]}>Ok</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,
        justifyContent: "center",
        alignItems: "center",
    },
    userBackground: {
        marginTop: 20,
        width: Dimensions.get("window").width - 20,
        height: Dimensions.get("window").height - 120,
        backgroundColor: "rgba(200, 200, 200, 0.8)",
        padding: 40
    },
    title: {
        width: '100%',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: "bold",
        textDecorationLine: "underline",
        textTransform: "capitalize",
    },
    info: {
        width: "100%",
        textAlign: 'left',
        lineHeight: 150,
        fontSize: 30,
    },
    cash: {
        width: "100%",
        textAlign: 'center',
        fontSize: 25,
    },
    back: {
        backgroundColor: "rgba(150, 150, 150, 0.8)",
        borderRadius: 20,
        marginTop: 20,
        padding: 30,
        width: "100%",
        textAlign: 'center',
        fontSize: 20,
    },
    logout: {
        backgroundColor: "rgba(150, 0, 0, 0.8)",
    },
    error: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: '50%',
        textShadowColor: '#000',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 7,
    },
    picture: {
        height: 200,
        width: 200
    }
});
