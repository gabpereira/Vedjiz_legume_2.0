import React from 'react';
import { FlatList, View, ImageBackground, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';

import BasketProduct from "../components/BasketProduct";
import TotalPriceBasket from "../components/TotalPriceBasket";
import { AuthContext } from '../components/Context';

export default function Basket(props) {
    const { basket, removeBasket } = React.useContext(AuthContext);
    const { navigation } = props;

    async function sendBasket() {
        try {
            navigation.navigate("payement")
        } catch (error) {
            Alert.alert("😨 Error panier", "Veuillez re-éssayer dans quelques instants,\nIl se peut qu'un problème de connection soit le problème")
        }
    }

    return (
        <ImageBackground
            source={require('../pictures/Moutains.jpg')}
            style={styles.background}
            blurRadius={1}
        >

            <View style={{ height: Dimensions.get('window').height * 0.8 }}>
                <TotalPriceBasket />
                <FlatList
                    data={basket}
                    keyExtractor={(product) => product.id.toString()}
                    ListEmptyComponent={
                        <View style={{
                            flex: 1,
                            height: Dimensions.get('window').height
                        }}>
                            <Text style={styles.error}>Veuillez tirer vers le bas pour raffraîchir la page</Text>
                        </View>
                    }
                    renderItem={(product) => (
                        <BasketProduct product={product.item} summary={true} />
                    )}
                />
            </View>
                <TouchableOpacity style={[styles.container, styles.backgroundButtonPaid]} onPress={() => sendBasket() }>
                    <Text style={styles.text}>PAYER</Text>
                </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,
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
    backgroundButtonPaid: {
        backgroundColor: "rgba(150, 150, 255, 0.8)",
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
    container: {
        padding: 20,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
});
