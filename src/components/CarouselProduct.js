import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {ip, port} from '../../app.json';

export default function CarouselProduct( props ) {

    const [quantity, setQuantity] = React.useState(null);


    function getChangeStock({ navigation }, product) {
        navigation.navigate("sendChangeOfStock", { product: product })
    }

    function snapToPrev(value){
    }

    function snapToNext(value){
    }

    const { navigation } = props;
    return (
        <View style={styles.background}>
            <Image style={styles.picture} source={{ uri: `http://${ip}:${port}/storage/pictures/${props.product.picture}` }} />
            <View style={{flexDirection: 'row', paddingTop: 20}}>
                <TouchableOpacity onPress={() => snapToPrev(index - 1)} style={{flex: 1, alignItems: 'center'}}><Icon name='arrow-back-outline' size={25} color='black'/></TouchableOpacity>
                <Text style={styles.cash}>{props.product.name}</Text>
                <TouchableOpacity onPress={() => snapToNext(index + 1)} style={{flex: 1, alignItems: 'center'}}><Icon name='arrow-forward-outline' size={25} color='black' /></TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 20, alignItems: 'center'}}>
                <Text style={{flex: 1}}>Stock: </Text>
                <TextInput placeholder={String(props.product.stock)} onChangeText={setQuantity} keyboardType='phone-pad' style={{flex: 1}}/>
                <Text style={{flex: 1}}>{props.product.unit}</Text>
                <TouchableOpacity onPress={() => getChangeStock({ navigation }, props.product)} style={{flex: 1}}>
                    <Text style={styles.back}>Ok</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
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
        fontSize: 18,
        flex: 1
    },
    back: {
        backgroundColor: 'rgba(150, 150, 150, 0.8)',
        borderRadius: 10,
        padding: 5,
        width: '50%',
        textAlign: 'center',
        fontSize: 15
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
