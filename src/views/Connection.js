import React from 'react';
import { View, ScrollView, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Login from '../components/Login';
import Register from '../components/Register';
import HorizontalSeparation from '../components/HorizontalSeparation';

export default function Connection() {
    return (
        <ImageBackground
            source={require('../pictures/Moutains.jpg')}
            style={styles.background}
        >
            <View>
                <ScrollView>
                    <HorizontalSeparation title='Register' color='rgba(255, 255, 255, 0.7)' />
                    <Register />
                    <HorizontalSeparation title='Login' color='rgba(0, 0, 0, 0.7)' />
                    <Login />
                </ScrollView>
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
});
