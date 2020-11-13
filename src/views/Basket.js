import React from 'react';
import axios from 'axios';
import { FlatList, View, ScrollView, ImageBackground, StyleSheet, Dimensions, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Picker } from '@react-native-community/picker';

import BasketProduct from "../components/BasketProduct";
import TotalPriceBasket from "../components/TotalPriceBasket";
import { AuthContext } from '../components/Context';

export default function Basket(props) {
    const { basket, addToBasket, products } = React.useContext(AuthContext);
    const { navigation } = props;
    const [refreshing, setRefreshing] = React.useState(false);
    const [pickerList, setPickerList] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            await getProductsPickerList()
        }
        fetchData()
    }, [basket])
    async function getProductsPickerList() {
        try {
            var res = await axios.get('/products')
            let products = res.data.data
            if (basket === null) {
                setPickerList(products)
            }
            else {
                let pickerListTemp = products.filter(product => {
                    return !basket.find(({ id }) => product.id == id)
                })
                setPickerList(pickerListTemp)
            }
        }
        catch (e) {
            console.log(e.message)
            Alert.alert("😵 Erreur de connexion", "Une erreur est survenue lors de la connexion!\nMerci de vérifier que vous ayez bien une connexion internet...")
            setPickerList([])
        }
    }
    async function addProduct(id) {
        var res = await axios.get(`/products/${id}`)
        let product = res.data.data
        addToBasket(product)
    }
    async function sendBasket() {
        try {
            if (basket.length < 1 || basket.find(({ quantity }) => quantity == 0))
                return
            else {
                navigation.navigate("Résumé")
            }
        } catch (error) {
            Alert.alert("😨 Error panier", "Veuillez re-éssayer dans quelques instants,\nIl se peut qu'un problème de connection soit le problème")
            console.error(error)
        }
    }
    return (
        <ImageBackground
            source={require('../pictures/Moutains.jpg')}
            style={styles.background}
            blurRadius={1}
        >
            <ScrollView>
                <TotalPriceBasket />
                <FlatList
                    style={pickerList.length > 0 ? { height: Dimensions.get('window').height * 0.65 } : { }}
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
                        <BasketProduct product={product.item} />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={getProductsPickerList}
                        />
                    }
                />
                {pickerList.length > 0 ? (
                    <Picker
                        style={styles.picker}
                        onValueChange={(value) => addProduct(value)} >
                        <Picker.Item
                            label="Selectionnez un produit"
                            value="-1"
                            key="0" />
                        {pickerList.map((product) => (
                            <Picker.Item
                                label={product.name}
                                value={product.id}
                                key={String(product.id)}
                            />
                        ))}
                    </Picker>
                ) : null}
                <TouchableOpacity style={[styles.container, styles.backgroundButtonPaid]} onPress={() => sendBasket()}>
                    <Text style={styles.text}>Résumé de la commande</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

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
    picker: {
        backgroundColor: "rgba(200, 200, 200, 0.8)",
        borderWidth: 1,
        borderTopColor: "rgba(0, 0, 0, 1)",
        paddingTop: 20,
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
    },
    pickerTitle: {

        borderWidth: 1,
        borderColor: "transparent",
        borderTopColor: "rgba(0, 0, 0, 1)",
        paddingTop: 20,
        position: 'relative',
        left: 0,
        right: 0,

        fontSize: 20,
        textDecorationLine: "underline",
    },
});
