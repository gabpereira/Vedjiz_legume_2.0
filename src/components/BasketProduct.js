import React from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { ip, port } from '../../app.json';
import { AuthContext } from '../components/Context';


export default function BasketProduct(props) {
    const { navigation } = props;
    const { removeOnBasket, updateBasketProduct, basket } = React.useContext(AuthContext);
    const [quantity, setQuantity] = React.useState(props.product.quantity)
    React.useEffect(() => {
        if(props.product.quantity == undefined)
            updateQuantity(1)
    }, [])
    async function removeFromBasket(product) {
        removeOnBasket(product)
    }
    function updateQuantity(quantity){
        if(isNaN(quantity) || quantity<0)
        {
            setQuantity(props.product.quantity)
            return
        }

        setQuantity(quantity)
        props.product.quantity = quantity
        updateBasketProduct(props.product)
    }
    return (
        <View style={[styles.background, styles.product]}>
            <Image style={props.summary ? styles.pictureSummary : styles.picture} source={{ uri: `http://${ip}:${port}/storage/pictures/${props.product.picture}` }} />
            <View style={styles.informations}>
                <Text style={styles.title} numberOfLines={2}>{props.product.name}</Text>
                <Text>💰 {props.product.price} CHF / {props.product.unit}</Text>
                { props.summary ? (<Text style={styles.label}>Quantité: {Number(props.product.quantity).toFixed(2)}</Text>) : null}
            </View>
            { props.summary ? null : (
            <View style={styles.quantity}>
                <Text style={styles.label}>Quantité:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor="rgb(180, 180, 180)"
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={updateQuantity}
                />
            </View> )}
            { props.summary ? null : (
            <View style={styles.trash}>
                <TouchableOpacity
                    onPress={() => removeFromBasket(props.product)}>
                    <Icon name="trash" size={26} />
                </TouchableOpacity>
            </View> )}
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
    },
    pictureSummary: {
        borderColor: "rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        borderWidth: 1,
        top: 5,
        width: 65,
        height: 65,
        borderRadius: 100,
    },
    picture: {
        borderColor: "rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        borderWidth: 1,
        top: 15,
        width: 65,
        height: 65,
        borderRadius: 100,
    },
    informations: {
        position: "absolute",
        left: 100,
        top: 10
    },
    quantity: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        left: 90
    },
    label: {
        top: 5,
    },
    title: {
        width: "70%",
        paddingBottom: 10,
        fontSize: 15,
        textDecorationLine: "underline",
        fontStyle: 'italic',
        textTransform: "capitalize",
    },
    textInput: {
        textAlign: "center",
        position: "relative",
        left: 5,
        // borderRadius: 100,
        padding: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        color: 'white',
        width: "10%",
        paddingLeft: 10
    },
    trash: {
        position: "absolute",
        right: 15,
        top: 40,
        width: 40,
        height: 40,
        paddingTop: 7,
        paddingLeft: 8,
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 255, 0.4)",
    }
});
