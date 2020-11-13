import React from 'react';
import axios from 'axios';
import { FlatList, View, ImageBackground, StyleSheet, Dimensions, Text, Alert, RefreshControl } from 'react-native';

import Splash from './Splash';
import Product from "../components/Product";

export default function ListOfProduct(props) {
    const { navigation } = props;
    const [isLoading, setIsLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [products, setProducts] = React.useState(async () => getProducts());

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

            <View>
                <FlatList
                    data={products}
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
                        <Product navigation={navigation} product={product.item} />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={getProducts}
                        />
                    }
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
    },
    error:{
        flex: 1,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: '50%',
        textShadowColor: '#000',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 7,
    },
});
