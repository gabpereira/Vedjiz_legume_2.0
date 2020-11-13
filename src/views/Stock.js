import React from 'react';
import axios from 'axios';

import { FlatList, View, ImageBackground, StyleSheet, Dimensions, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';

import Splash from './Splash';

export default function Stock( props ) {
    const { navigation } = props;
    const [isLoading, setIsLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [products, setProducts] = React.useState(async () => getProducts());

    const [quantity, setQuantity] = React.useState(null);

    function getChangeStock({ navigation }, product) {
        navigation.navigate('Stock', { product: product })
    }
    async function changeStock(quantity) {
        setQuantity()
        var data = []
        products.forEach(({id, stock}) =>{
            data = [data, {id: id, quantity: stock}]
        });
        try{
            await axios.post(`/products/stock`, { quantity: data })
            Alert.alert('Les quantités ont été enregistrées')
        } catch (e) {
            console.log(e.message)
            Alert.alert("Une erreur s'est produite")
        }
    }


    async function getProducts() {
        try {
            setRefreshing(true)
            setIsLoading(true)
            var res = await axios.get('/products')
            setProducts(res.data.data)
        }
        catch (e) {
            console.log(e.message)
            Alert.alert("😵 Erreur de connexion", "Une erreur est survenue lors de la connexion!\nMerci de vérifier que vous ayez bien une connexion internet...")
            setProducts([])
        }
        finally {
            setRefreshing(false)
            setIsLoading(false)
        }
    }
    if (isLoading) {
        return <Splash />;
    }
    return (
        <ImageBackground
            source={require('../pictures/Moutains.jpg')}
            style={styles.background}
            blurRadius={1}
        >
            <View style={styles.userBackground}>
                <Text style={styles.title}>Validation du Stock</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => getChangeStock({ navigation }, props.product)} style={{flex: 1, paddingLeft: 2, paddingRight: 2}}>
                        <Text style={[styles.back]}>Recommencer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeStock()} style={{flex: 1, paddingLeft: 2, paddingRight: 2}}>
                        <Text style={[styles.back]}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={products}
                    keyExtractor={(product) => product.id.toString()}
                    ListEmptyComponent={
                        <View style={{ flex: 1, }}>
                            <Text style={styles.error}>Un problème est survenu, veuillez revenir en arrière et tester à nouveau</Text>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                                <Text>Revenir en arrière</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <Text style={ styles.list }>{item.name}: {item.stock} {item.unit}</Text>
                    )}
                />
            </View>
        </ImageBackground>
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
        paddingBottom: 10,
    },
    back: {
        backgroundColor: "rgba(150, 150, 150, 0.8)",
        borderRadius: 20,
        padding: 10,
        width: "100%",
        textAlign: 'center',
        fontSize: 15,
    },
    list: {
        width: "100%",
        textAlign: 'left',
        fontSize: 20,
        color: 'black'
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
