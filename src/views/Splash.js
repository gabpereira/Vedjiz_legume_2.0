import React from 'react';
import { View, Dimensions, ImageBackground } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';

export default function Homepage() {
    return (
        <ImageBackground
            source={require('../pictures/Moutains.jpg')}
            style={{
                flex: 1,
                width: null,
                height: Dimensions.get('window').height,
            }}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <PacmanIndicator color='yellow' size={100} />
            </View>

        </ImageBackground>
    )
}
