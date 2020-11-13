import React from 'react';
import axios from 'axios';

import { View, ScrollView, ImageBackground, StyleSheet, Dimensions, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import {AuthContext} from './Context';

export default function StockProduct( props ) {
    const [quantity, setQuantity] = React.useState(null);
    const {sendChange} = React.useContext(AuthContext);

    function getChangeStock({ navigation }, product) {
        navigation.navigate("Stock", { product: product })
    }
    function changeStock(quantity) {
        sendChange({quantity})
        getChangeStock()
    }
    const { navigation } = props;
    return (
        <View style={styles.background}>
            <Text style={styles.cash}>{props.product.name}</Text>
            <Text>: </Text>
            <Text value={quantity}>{props.product.stock} {props.product.unit}</Text>
            <TouchableOpacity onPress={() => getChangeStock({ navigation }, props.product)}>
                <Text style={[styles.back]}>Recommencer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeStock()}>
                <Text style={[styles.back]}>Enregistrer</Text>
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
    }
});
