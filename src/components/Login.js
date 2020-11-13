import React, { useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Styles from '../styles/Register_Login';
import Icon from 'react-native-vector-icons/Ionicons';
import { isEmpty } from './Helpers';
import { AuthContext } from './Context';

export default function Login() {
    const [isHidden, setIsHidden] = React.useState(true);
    const [submitHover, setSubmitHover] = React.useState(false);
    const [token, setToken] = React.useState(null);
    const { signIn } = React.useContext(AuthContext);


    function showPassword() {
        setIsHidden(!isHidden);
    }

    function login(token) {
        signIn(token)
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.inputGroups}>
                <Text style={Styles.label}>Token:</Text>
                <TextInput
                    style={Styles.textInput}
                    placeholderTextColor="rgb(180, 180, 180)"
                    placeholder="re5t40-89sdf7-v96dc5"
                    value={token}
                    onChangeText={setToken}
                    secureTextEntry={isHidden} />
                <TouchableOpacity
                    style={Styles.btnEye}
                    onPress={showPassword}
                >
                    <Icon name={isHidden ? "ios-eye-off-outline" : "ios-eye-outline"} size={26} color="white" />
                </TouchableOpacity>

            </View>

            <View
                pointerEvents={isEmpty(token) ? "none" : "auto"}
                style={submitHover ? Styles.submitHover : Styles.submit}
                onTouchStart={() => {
                    setSubmitHover(true),
                        login(token)
                }}
                onTouchEnd={() => setSubmitHover(false)}
            >
                <Text style={Styles.label}>Se connecter</Text>
            </View>

        </View>
    )
}
