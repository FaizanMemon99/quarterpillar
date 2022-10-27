import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
} from 'react-native'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'

const PaymentSuccess = (props)=>{
    const navigation=useNavigation()
    const gotoProduct = ()=>{
        navigation.navigate('/product')
    }
    const retryPayment=()=>{
        navigation.navigate('/payment-details',{price:props?.route?.params?.price,
            couponCode:props?.route?.params?.couponCode,
            couponCodeValue:props?.route?.params?.couponCodeValue,
            selectedAddress:props?.route?.params?.selectedAddress,
            discount:props?.route?.params?.discount,
            totalPrice:props?.route?.params?.totalPrice,
            cartItems:props?.route?.params?.cartItems,
            userDetails:props?.route?.params?.userDetails,
            error:true
        })
    }
    return (
        <View style={[styles.container,{backgroundColor:props?.route?.params?.error?'red':Constants.colors.primaryColor}]}>
            <StatusBar backgroundColor={props?.route?.params?.error?'red':Constants.colors.primaryColor} />
            <View style={styles.middleContant}>
                <View style={[styles.circle,{
                    color:props?.route?.params?.error?'rgba(255,0,0,0.6)':'rgba(255,255,255,0.6)'
                }]}>
                    <Feather name={props?.route?.params?.error?
                        'x'
                        :'check'} size={35} color={Constants.colors.whiteColor} />
                </View>
                <Text style={styles.successHeading}>Payment {props?.route?.params?.error?'failed':'successful'}</Text>
                <Text style={styles.successText}>
                    It Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . It Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . It Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <Pressable onPress={
                    props?.route?.params?.error?retryPayment:
                    gotoProduct} style={[globatStyles.button, {backgroundColor:Constants.colors.whiteColor, marginTop: 40,}]}>
                    <Text style={[globatStyles.btnText, { color:props?.route?.params?.error?'red': Constants.colors.primaryColor}]}>{props?.route?.params?.error?
                    'Retry payment'
                    :'Explore More'}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.colors.primaryColor,
    },
    middleContant: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Constants.padding,
    },
    circle:{
        padding: 35,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 100,
    },
    successHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        color: Constants.colors.whiteColor,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    successText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
})

export default PaymentSuccess