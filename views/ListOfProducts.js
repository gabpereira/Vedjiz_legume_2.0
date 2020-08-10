import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import Product from "../components/Product";
export default class ListOfProduct extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    render() {
        return (
            <ImageBackground
                source={require('../src/pictures/Moutains.jpg')}
                style={styles.background}
                blurRadius={1}
            >
                <View>
                    <ScrollView>
                        <Product product={product} />
                        <Product product={product1} />
                        <Product product={product2} />
                        <Product product={product} />
                        <Product product={product1} />
                        <Product product={product2} />
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}
const product={
    name: "brocoli d'amérique",
    details: "It's a small description of an inexisting product but for the test i want a great product for ingenious people! please purpose ideas 😉",
    price: "2.3",
    unit: "pièce",
    stock: "26",
    picture: "broccoli.png",
    current: true,
    suppliers: ["diogo", "gabriel"],
    updatedAt: "08.08.2008 17:00:00.00",
};
const product1={
    name: "carrottes degueux",
    details: "It's a small description of an inexisting product but for the test i want a great product for ingenious people! please purpose ideas 😉",
    price: "2.3",
    unit: "pièce",
    stock: "26",
    picture: "carots.png",
    current: true,
    suppliers: ["diogo", "gabriel"],
    updatedAt: "08.08.2008 17:00:00.00",
};
const product2={
    name: "tomate coeur de boeuf",
    details: "It's a small description of an inexisting product but for the test i want a great product for ingenious people! please purpose ideas 😉",
    price: "2.3",
    unit: "pièce",
    stock: "26",
    picture: "tomatoes.png",
    current: true,
    suppliers: ["diogo", "gabriel"],
    updatedAt: "08.08.2008 17:00:00.00",
};
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,
    },
});