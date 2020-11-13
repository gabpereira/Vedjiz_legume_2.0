import React from 'react';
import axios from 'axios';

import { View, ScrollView, ImageBackground, StyleSheet, Dimensions, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { AuthContext } from '../components/Context';

import Splash from './Splash';
axios.defaults.timeout = 500;

export default function Profil({ navigation }) {
    const { signOut, userToken } = React.useContext(AuthContext);

    const [isLoading, setIsLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [error, setError] = React.useState(true);
    const [me, setMe] = React.useState("");


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setIsLoading(true)
            await getMyData()
            setIsLoading(false)
        });
        return unsubscribe;
    }, [navigation]);

    async function getMyData() {
        try {
            setIsLoading(true)
            setRefreshing(true)
            var myInformations = [];
            var me = await axios.get(`/me`, { headers: { Authorization: `Bearer ${userToken}` } })
            var balance = await axios.get(`/me/balance`, { headers: { Authorization: `Bearer ${userToken}` } })
            myInformations = me.data.data
            myInformations["balance"] = balance.data

            setMe(myInformations)
            setError(false)
        }
        catch (e) {
            console.log(e.message)
            Alert.alert("😵 Erreur de connexion", "Une erreur est survenue lors de la connexion!\nMerci de vérifier que vous ayez bien une connexion internet...")
            setError(true)
        }
        finally {
            setRefreshing(false)
            setIsLoading(false)
        }
    }
    if (isLoading) {
        return <Splash />;
    }
    if (error) {
        return (
            <ImageBackground
                source={require('../pictures/Moutains.jpg')}
                style={styles.background}
                blurRadius={1}
            >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={getMyData}
                        />
                    }
                >
                    <Text style={styles.error}>Veuillez tirer vers le bas pour raffraîchir la page</Text>
                </ScrollView>
            </ImageBackground>
        );
    }
    return (
        <ImageBackground
            source={require('../pictures/Moutains.jpg')}
            style={styles.background}
            blurRadius={1}
        >
            <View style={styles.userBackground}>
                <Text style={styles.title}>{me.firstname} {me.lastname}</Text>
                <Text style={styles.info}>💰balance:</Text>
                <Text style={styles.cash}>💵 Débit: {me.balance.debit}</Text>
                <Text style={styles.cash}>💰 Crédit: {me.balance.credit}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Magasin")}>
                    <Text style={styles.back}>Aller au Magasin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signOut()}>
                    <Text style={[styles.back, styles.logout]}>Déconnexion</Text>
                </TouchableOpacity>
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
    },
    info: {
        width: "100%",
        textAlign: 'left',
        lineHeight: 150,
        fontSize: 30,
    },
    cash: {
        width: "100%",
        textAlign: 'center',
        fontSize: 25,
    },
    back: {
        backgroundColor: "rgba(150, 150, 150, 0.8)",
        borderRadius: 20,
        marginTop: 20,
        padding: 30,
        width: "100%",
        textAlign: 'center',
        fontSize: 20,
    },
    logout: {
        backgroundColor: "rgba(150, 0, 0, 0.8)",
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
