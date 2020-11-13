import React from 'react';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';
import { View, ScrollView, ImageBackground, StyleSheet, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../components/Context';
import { TextInput } from 'react-native-gesture-handler';
import { isEmpty } from '../components/Helpers';

import HorizontalSeparation from '../components/HorizontalSeparation';
import TotalPriceBasket from '../components/TotalPriceBasket';

export default function Payement({ navigation }) {
    const { basket, removeBasket } = React.useContext(AuthContext);
    const [envelopeNumber, setEnvelopeNumber] = React.useState(null);
    const [price, setPrice] = React.useState('0');
    const [isGood, setIsGood] = React.useState(false);
    const [hasToConfirme, setHasToConfirme] = React.useState(false);

    async function sendBasket() {
        try {
            var list = []
            basket.forEach(({ id, quantity }) => {
                list = [...list, { product_id: id, quantity: quantity }]
            });
            axios.post('/baskets', { purchases: list })
            removeBasket()
            navigation.navigate('Panier')
            navigation.navigate('Profil')
        } catch (error) {
            Alert.alert('😨 Error panier', "Veuillez re-éssayer dans quelques instants,\nIl se peut qu'un problème de connection soit le problème")
        }
    }
    return (
        <ImageBackground
            source={require('../pictures/Moutains.jpg')}
            style={styles.background}
            blurRadius={1}
        >
            <ScrollView style={[styles.container]}>
                <View style={[styles.inputGroups]}>
                    <Text style={styles.label}>N° Enveloppe:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={envelopeNumber}
                        placeholderTextColor='rgb(180, 180, 180)'
                        placeholder='QjbOeytSgJI0cyh0e55'
                        onChangeText={setEnvelopeNumber}
                    />
                    {!isEmpty(envelopeNumber) &&
                        <TouchableOpacity
                            style={styles.btnEye}
                            onPress={() => setEnvelopeNumber(null)}
                        >
                            <Icon name={'close-outline'} size={26} color='white' />
                        </TouchableOpacity>
                    }
                </View>

                <TouchableOpacity style={{ width: "100%", backgroundColor: "rgb(180, 180, 180)", borderRadius: 10, padding: 10 }}
                    onPress={async () => {
                        // mon code peut-être fonctionnel
                        var res;
                        try{
                            res = await axios.post('/payments',{key: envelopeNumber, amount: "abc"})
                        }
                        catch(error)
                        {
                            //I CAN'T dev because api return always 400 :D have a nice day
                            console.log(error.response.status)
                            if(error.response.status == 400)
                                setIsGood(true)
                        }
                        //


                        //if incorrect or existing message
                        //Alert.alert("Enveloppe incorrecte 🤯", "Veuillez vérifier que le numéro d'enveloppe saisie est correct ou n'est pas utilisé par une autre personne")
                        //else
                        // setIsGood(true)
                    }}
                >
                    <Text style={{ fontSize: 20, textAlign: "center" }}>Vérifier enveloppe</Text>
                </TouchableOpacity>

                {isGood &&
                    <View>
                        <HorizontalSeparation title="Combien ?" color="rgba(0, 0, 0, 0.7)" />
                        <TotalPriceBasket />
                        <View style={[styles.inputGroups, { marginTop: 20 }]}>
                            <Text style={styles.label}>Prix:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={price}
                                placeholderTextColor="rgb(180, 180, 180)"
                                placeholder="50"
                                keyboardType="numeric"
                                onChangeText={setPrice}
                            />
                            {!isEmpty(price) &&
                                <TouchableOpacity
                                    style={styles.btnEye}
                                    onPress={() => setPrice(null)}
                                >
                                    <Icon name={"close-outline"} size={26} color="white" />
                                </TouchableOpacity>
                            }
                        </View>
                        <TouchableOpacity style={{ width: "100%", backgroundColor: "rgb(180, 180, 180)", borderRadius: 10, padding: 10 }}
                            onPress={() => {
                                console.log("WIP ask user confirmation")
                                Alert.alert(
                                    "Confirmation",
                                    `Confirmez-vous avoir déposé la somme suivante dans votre enveloppe : ${price}`,
                                    [
                                        {
                                            text: "Non",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "Oui",
                                            onPress: () => {
                                                console.log("User has confirmed, send to api")
                                                sendBasket()
                                            }
                                        }
                                    ],
                                    { cancelable: false }
                                )
                                //if ok
                                // send to api
                                // clear basket
                                // return to profil page
                                //else
                                // nothing is happening
                            }}
                        >
                            <Text style={{ fontSize: 20, textAlign: "center" }}>Valider la somme</Text>
                        </TouchableOpacity>
                    </View>

                }
            </ScrollView>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: null,
        height: Dimensions.get('window').height,

    },
    container: {
        margin: 20,
        color: 'white',
    },
    inputGroups: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        color: 'white',
    },
    textInput: {
        flex: 1,
        color: 'white',
    },
    label: {
        flex: 0,
        fontSize: 15,
        paddingRight: 10,
        color: 'white',
    },
    btnEye: {
        paddingLeft: 10,
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
