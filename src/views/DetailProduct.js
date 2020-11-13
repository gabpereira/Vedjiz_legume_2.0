import React from 'react';
import { View, Text, ScrollView, ImageBackground, Image, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import {ip, port} from '../../app.json';
import { AuthContext } from '../components/Context';

export default function DetailProduct({ route }) {
    const { product } = route.params;
    const { addToBasket, basket } = React.useContext(AuthContext);

    async function addToMarket(product) {
        addToBasket(product)
        Alert.alert('Market 👍', `Ajout de ${product.name} au panier`);
    }
    return (
        <ImageBackground
            source={require('../pictures/Moutains.jpg')}
            style={styles.background}
            blurRadius={1}
        >
            <View style={styles.detailProduct}>
                <View style={styles.productBackground}>
                    <Image source={{ uri: `http://${ip}:${port}/storage/pictures/${product.picture}` }} style={styles.picture} />
                    <View style={styles.details}>
                        <Text>💰 {product.price} CHF / {product.unit}</Text>
                        <Text>📦 {product.stock} disponibles(s)</Text>
                    </View>
                    <ScrollView style={styles.description}>
                        <Text style={styles.descriptionText}>{product.details}</Text>
                    </ScrollView>
                    <View style={styles.providerGroup}>
                        <Text style={styles.providerTitle}>Fournisseur(s):</Text>

                        <FlatList style={styles.providers}
                            data={product.suppliers}
                            keyExtractor={(supplier) => supplier.pivot.supplier_id.toString()}
                            ListEmptyComponent={
                                <Text style={styles.error}>Aucun fournisseur pour ce produit</Text>
                            }
                            renderItem={(supplier) => (
                                <View style={styles.provider}>
                                    <Text>Compagnie: {supplier.item.company_name}</Text>
                                    <Text>ville: {supplier.item.city}</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.market}>
                        <TouchableOpacity
                            onPress={() => addToMarket(product)}>
                            <Icon name='shopping-basket-add' size={26} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,
    },
    detailProduct: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    productBackground: {
        marginTop: 20,
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 120,
        backgroundColor: "rgba(200, 200, 200, 0.8)",
        padding: 40
    },
    picture: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        overflow: "hidden",

        borderWidth: 1,
        borderRadius: 100,
    },
    details: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    description: {
        height: '20%',
        marginBottom: 20,
    },
    descriptionText: {
        lineHeight: 25,
    },
    providerGroup: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderTopColor: "rgba(0, 0, 0, 0.2)",
        paddingTop: 20,
    },
    providerTitle: {
        fontSize: 20,
        textDecorationLine: 'underline',
        marginBottom: 10
    },
    providers: {
        height: 100,
    },
    provider: {
        padding: 2,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: "rgba(0, 0, 0, 0.2)",
    },
    noBorders: {
        borderBottomColor: 'transparent',
    },
    market: {
        position: 'absolute',
        right: 20,
        top: 20,
        width: 40,
        height: 40,
        paddingTop: 7,
        paddingLeft: 2,
        borderRadius: 100,
        overflow:'hidden',
        backgroundColor: "rgb(109, 116, 220)",

    }
});
