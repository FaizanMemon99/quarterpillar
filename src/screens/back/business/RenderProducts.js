import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Constants from '../../../shared/Constants'

const RenderProducts = ({products})=>{
    const navigation = useNavigation()
    const gotoProductDetails = ()=>{
        navigation.navigate('/product-details')
    }
    return (
        <Pressable onPress={gotoProductDetails} style={styles.wrapper}>
            <Image source={products.item.img} style={styles.productImg} />
            <View>
                <Text style={styles.productName}>Statue of Boris</Text>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Color: </Text>
                    <Text style={styles.value}>Grey</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Unit Price: </Text>
                    <FontAwesome name='rupee' style={styles.rupeeIcon} /><Text style={styles.value}>1500</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Qty: </Text>
                    <Text style={styles.value}>5</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <View style={styles.inStockOuter}>
                        <View style={styles.inStockInner}></View>
                    </View>
                    <Text style={styles.inStockText}>In Stock</Text>
                </View>
            </View>
            <View style={styles.divider}></View>
            <View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Size: </Text>
                    <Text style={styles.value}>23”x 23”x 23”</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Selling Price: </Text>
                    <FontAwesome name='rupee' style={styles.rupeeIcon} /><Text style={styles.value}>1500</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Available Qty: </Text>
                    <Text style={styles.value}>15</Text>
                </View>
            </View>
        </Pressable>
    )
}
const styles= StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: Constants.colors.whiteColor,
        padding: 12,
        borderRadius: 20,
    },
    productName: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 16,
    },
    divider: {
        height: 70,
        width: 1,
        backgroundColor: '#9F9F9F',
    },
    lavelAndValue: {
        flexDirection: 'row',
        marginTop: 5,
    },
    lavel: {
        fontFamily: Constants.fontFamily,
    },
    value: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    inStockText: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
    },
    inStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 2,
        marginRight: 6,
    },
    inStockInner: {
        width: 18,
        height: 18,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 18,
        position: 'absolute',
        top: 2,
        right: 2,
    },
    rupeeIcon:{
        marginTop: 5,
    },
})

export default RenderProducts