import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'

const RenderOrders = ()=>{
    return (
        <View style={styles.container}>
            <Image source={Images.orderImg} />
            <View style={styles.orderDescription}>
                <View style={styles.inline}>
                    <Text style={styles.textBold}>Statue of Boris</Text>
                    <View style={styles.oldPriceContainer}>
                        <FontAwesome name='rupee' style={styles.rupeeIcon} />
                        <Text style={styles.beforeOfferPrice}>1500</Text>
                        <View style={styles.strikeThrough}></View>
                    </View>
                    <FontAwesome name='rupee' style={[styles.rupeeIcon, {color: '#000000'}]} />
                    <Text style={[styles.beforeOfferPrice, {color: '#000000'}]}>1500</Text>
                    <FontAwesome name='rupee' style={[styles.rupeeIcon, {color: Constants.colors.primaryColor, fontSize: 12, marginLeft: 6,}]} />
                    <Text style={[styles.beforeOfferPrice, {color: Constants.colors.primaryColor, fontSize: 12}]}>300 off</Text>
                </View>
                <View style={styles.inline}>
                    <Text style={styles.font}>Qty</Text>
                    <Text style={[styles.textBold, {marginLeft: 5,}]}>23</Text>
                    <Text style={[styles.font, {marginLeft: 18,}]}>Buyers</Text>
                    <Text style={[styles.textBold, {marginLeft: 12,}]}>45</Text>
                    <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} style={{marginLeft: 16,}} />
                    <Text style={{color: Constants.colors.primaryColor, fontSize: 12}}>5.65%</Text>
                </View>
                <View style={styles.inline}>
                    <Text style={styles.font}>Rated</Text>
                    <Text style={[styles.textBold, {marginLeft: 12,}]}>3.5</Text>
                    <AntDesign name='star' size={18} color='#E7CC3E' style={{marginLeft: 16,}} />
                </View>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        marginTop: 20,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
    },
    orderDescription: {
        marginStart: 14,
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    font: {
        fontFamily: Constants.fontFamily,
    },
    textBold: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '700',
    },
    rupeeIcon: {
        color: '#D9D9D9',
        fontSize: 16,
        marginTop: 3,
        marginLeft: 10,
    },
    beforeOfferPrice: {
        color: '#D9D9D9',
        fontSize: 15,
    },
    oldPriceContainer: {
        flexDirection: 'row',
    },
    strikeThrough: {
        position: 'absolute',
        left: 8,
        top: 10,
        height: 2,
        width: '90%',
        backgroundColor: '#D9D9D9',
    },
})

export default RenderOrders