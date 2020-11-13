import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DetailProduct from '../views/DetailProduct';
import List from '../views/ListOfProducts';
import Profil from '../views/Profil';
import Basket from '../views/Basket';
import SummaryBasket from '../views/SummaryBasket';
import Payement from '../views/Payement';
import ChangeStock from '../views/ChangeStock';
import Stock from '../views/Stock'
import { AuthContext } from './Context';

const ProductsStack = createStackNavigator();
const ProductsStackScreen = ({ navigation }) => (
    <ProductsStack.Navigator >
        <ProductsStack.Screen name="Magasin" component={List} options={{
            title: "Magasin",
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }} onPress={() => navigation.navigate("Panier")}>
                    <Icon name='basket' size={25} color='black' />
                </TouchableOpacity>
            )
        }} />
        <ProductsStack.Screen name="DetailProduct" component={DetailProduct} options={({ route }) => ({ title: route.params.product.name })} />
    </ProductsStack.Navigator>
);

const profilStack = createStackNavigator();
const profilStackScreen = ({ navigation }) => (
    <profilStack.Navigator >
        <profilStack.Screen name="Profil" component={Profil} options={{
            title: "Profil",
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }} onPress={() => navigation.navigate("Panier")}>
                    <Icon name='basket' size={25} color='black' />
                </TouchableOpacity>
            )
        }} />
    </profilStack.Navigator>
);
const stockStack = createStackNavigator();
const stockStackScreen = ({ navigation }) => (
    <stockStack.Navigator >
        <stockStack.Screen name="Stock" component={ChangeStock} options={{
            title: "Stock",
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }} onPress={() => navigation.navigate("Stock")}>
                    <Icon name='basket' size={25} color='black' />
                </TouchableOpacity>
            )
        }} />
        <stockStack.Screen name="sendChangeOfStock" component={Stock} options={{title: "résumé du stock"}}/>
    </stockStack.Navigator>
);
const basketStack = createStackNavigator();
const basketStackScreen = ({ navigation }) => {

    const { removeBasket } = React.useContext(AuthContext);
    return (
    <basketStack.Navigator >
        <basketStack.Screen name="Panier" component={Basket} options={{
            title: "Panier",
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 10, paddingTop: 5 }} onPress={() => removeBasket()}>
                    <Icon name='remove-circle-sharp' size={25} color='black' />
                </TouchableOpacity>
            ),
        }} />
        <basketStack.Screen name="Résumé" component={SummaryBasket} options={{
            title: "résumé du panier",
        }} />
        <basketStack.Screen name="payement" component={Payement} options={{
            title: "Payer",
        }} />
    </basketStack.Navigator>
)};

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
    <Drawer.Navigator initialRouteName="Profil"
        drawerType="back"
        drawerContentOptions={{
            labelStyle: {
                fontSize: 20,
            },
            activeBackgroundColor: "rgba(160, 187, 194, 0.5)",
            activeTintColor: "rgb(0, 94, 146)"
        }}
        drawerStyle={{ position: "absolute", top: 60 }} >
        <Drawer.Screen name="Profil" component={profilStackScreen} />
        <Drawer.Screen name="Panier" component={basketStackScreen} />
        <Drawer.Screen name="Magasin" component={ProductsStackScreen} />
        <Drawer.Screen name="Stock" component={stockStackScreen} />
    </Drawer.Navigator>
);
