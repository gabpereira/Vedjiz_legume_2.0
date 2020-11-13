import React from 'react';

import { View, StyleSheet, Text } from 'react-native';

export default function StockProduct( props ) {
    return (
        <View style={styles.background}>
            <Text style={styles.cash}>{props.product.name}: {props.product.stock} {props.product.unit}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        padding: 10,
        alignItems: "center",
    },
    cash: {
        width: "100%",
        textAlign: 'left',
        fontSize: 20,
    },
});
