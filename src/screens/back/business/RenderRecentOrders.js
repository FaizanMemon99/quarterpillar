import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Constants from '../../../shared/Constants'

const RenderRecentOrders = ({order})=>{
    return (
        <View style={styles.wrapper}>
            <Image source={order.item.img} />
            <Text style={styles.productName}>{order.item.name}</Text>
            <Text style={styles.quantity}>{order.item.quantity}</Text>
            <View style={styles.growing}>
                <Text style={styles.buyers}>{order.item.buyers}</Text>
                <AntDesign name='arrowup' color={Constants.colors.primaryColor} />
                <Text style={styles.growinText}>5.6%</Text>
            </View>
        </View>
    )
}
const styles= StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    productName: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    quantity: {
        fontFamily: Constants.fontFamily,
    },
    buyers: {
        marginEnd: 4,
    },
    growing: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    growinText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
    },
})

export default RenderRecentOrders