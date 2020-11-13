import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {ip, port} from '../../app.json';
import { AuthContext } from '../components/Context';


export default function Produc(props) {
    const { addToBasket, basket } = React.useContext(AuthContext);
    function getDetails({ navigation }, product) {
        navigation.navigate("DetailProduct", { product: product })
    }
    async function addToMarket(product) {
        addToBasket(product)
        Alert.alert("Market 👍", `Ajout de ${product.name} au panier`);
    }
    const { navigation } = props;
    return (
        <View style={styles.background}>
            <TouchableOpacity style={styles.product} onPress={() => getDetails({ navigation }, props.product)}>
                <Image style={styles.picture} source={{ uri: `http://${ip}:${port}/storage/pictures/${props.product.picture}` }} />
                <View style={styles.informations}>
                    <Text style={styles.title} numberOfLines={2}>{props.product.name}</Text>
                    <Text style={styles.lastUpdate} numberOfLines={1} ellipsizeMode="clip" >{props.product.updated_at}</Text>
                    <Text style={styles.description} ellipsizeMode="tail" numberOfLines={1}>{props.product.details}</Text>
                    <Text style={styles.stock} >📦 {props.product.stock} disponibles(s)</Text>
                    <Text style={styles.price} >💰 {props.product.price} CHF / {props.product.unit}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.market}>
                <TouchableOpacity
                    onPress={() => addToMarket(props.product)}>
                    <Icon name="shopping-basket-add" size={26} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "rgba(200, 200, 200, 0.5)",
        borderColor: 'transparent',
        marginTop: 3,
        borderWidth: 1,
        color: 'white',
        borderRadius: 1,
        shadowColor: 'black',
        shadowOpacity: 10,
        elevation: 2,
        padding: 10,
    },
    product: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    picture: {
        borderColor: "rgba(0, 0, 0, 0.2)", //TODO to remove later
        backgroundColor: "white",
        borderWidth: 1,
        width: 150,
        height: 150,
        resizeMode: 'contain',
        overflow:"hidden"
    },

    informations: {
        flex:1,
        padding: 15,
        paddingTop: 5
    },
    title: {
        width: "70%",
        fontSize: 15,
        textDecorationLine: "underline",
        fontStyle: 'italic',
        textTransform: "capitalize",
    },
    lastUpdate: {
        position: "absolute",
        right: 15,
        top: 8,
        width: 60,
        fontSize: 12,
        overflow: "hidden",
        color: "rgba(0, 0, 0, 0.6)"
    },
    description: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    stock: {
        height: 40,
    },
    price:{
        position: "absolute",
        left: 15,
        bottom: 5
    },
    market: {
        position: "absolute",
        right: 15,
        bottom: 15,
        width: 40,
        height: 40,
        paddingTop: 7,
        paddingLeft: 2,
        borderRadius: 100,
        overflow:"hidden",
        backgroundColor: "rgba(0, 0, 255, 0.4)",
    }
});
