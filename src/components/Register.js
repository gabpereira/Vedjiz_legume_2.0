import React from 'react';
import Styles from '../styles/Register_Login';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { isEmpty } from './Helpers';
import { AuthContext } from './Context';

export default function Register() {

    const [firstname, setFirstname] = React.useState(null);
    const [lastname, setLastname] = React.useState(null);
    const [phonenumber, setPhonenumber] = React.useState(null);
    const [submitHover, setSubmitHover] = React.useState(false);
    const {signUp} = React.useContext(AuthContext);

    function register(firstname, lastname, phonenumber) {
        signUp({firstname, lastname, phonenumber})
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.inputGroups}>
                <Text style={Styles.label}>Prénom:</Text>
                <TextInput
                    style={Styles.textInput}
                    value={firstname}
                    placeholderTextColor="rgb(180, 180, 180)"
                    placeholder="Diogo"
                    onChangeText={setFirstname} />
                {!isEmpty(firstname) &&
                <TouchableOpacity
                    style={Styles.btnEye}
                    onPress={()=>setFirstname(null)}
                >
                    <Icon name={"close-outline"} size={26} color="white" />
                </TouchableOpacity>}

            </View>
            <View style={Styles.inputGroups}>
                <Text style={Styles.label}>Nom:</Text>
                <TextInput
                    style={Styles.textInput}
                    value={lastname}
                    placeholderTextColor="rgb(180, 180, 180)"
                    placeholder="Vieira"
                    onChangeText={setLastname} />
                {!isEmpty(lastname) &&
                <TouchableOpacity
                    style={Styles.btnEye}
                    onPress={()=>setLastname(null)}
                >
                    <Icon name={"close-outline"} size={26} color="white" />
                </TouchableOpacity>}
            </View>
            <View style={Styles.inputGroups}>
                <Text style={Styles.label}>N°:</Text>
                <TextInput
                    style={Styles.textInput}
                    value={phonenumber}
                    placeholder="Numéro de téléphone"
                    placeholderTextColor="rgb(180, 180, 180)"
                    keyboardType="phone-pad"
                    onChangeText={setPhonenumber} />
                    {!isEmpty(phonenumber) &&
                <TouchableOpacity
                    style={Styles.btnEye}
                    onPress={()=>setPhonenumber(null)}
                >
                    <Icon name={"close-outline"} size={26} color="white" />
                </TouchableOpacity>}
            </View>

            <View
                pointerEvents={isEmpty(firstname, lastname, phonenumber) ? "none" : "auto"}
                style={submitHover ? Styles.submitHover : Styles.submit}
                onTouchStart={() => {
                    setSubmitHover(true),
                    register(firstname, lastname, phonenumber)
                }}
                onTouchEnd={() => setSubmitHover(false)}
            >
                <Text style={Styles.label} >S'inscrire</Text>
            </View>
        </View>
    )
}
