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

const RenderProducts = ({products,userDetails})=>{
    var imageUrl=`${Constants.BASE_IMAGE_URL}${JSON.parse(products.item.product_image)[0]}`
    const navigation = useNavigation()
    const gotoProductDetails = ()=>{
        navigation.navigate('/product-details',{productDetails:products})
    }
    // console.log("userddd",userDetails);
    return (
        <View style={styles.wrapper} 
        // onPress={()=>navigation.navigate("/product-preview",{userDetails:userDetails})}
        >
            
            <Image source={{uri:imageUrl}} style={{width: '20%', height: '90%',borderRadius:10}}/>
            <View>
                <Text style={styles.productName}>{products.item.product_name}</Text>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Color: </Text>
                    <Text style={styles.value}>{products.item.color_id}</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Unit Price: </Text>
                    <FontAwesome name='rupee' style={styles.rupeeIcon} /><Text style={styles.value}>{products.item.unit_price}</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Qty: </Text>
                    <Text style={styles.value}>{products.item.qty}</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <View style={parseInt(products.item.qty)>=parseInt(products.item.warning_qty)?styles.inStockOuter:styles.outOfStockOuter}>
                        <View style={parseInt(products.item.qty)>=parseInt(products.item.warning_qty)?styles.inStockInner:styles.outOfStockInner}></View>
                    </View>
                    <Text style={styles.inStockText}>{parseInt(products.item.qty)>=parseInt(products.item.warning_qty)?`In`:`Out of`} Stock</Text>
                </View>
                
            </View>
            <View style={styles.divider}></View>
            <View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Size: </Text>
                    <Text style={styles.value}>
                    {products.item.size_id}
                    </Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Selling Price: </Text>
                    <FontAwesome name='rupee' style={styles.rupeeIcon} /><Text style={styles.value}>{products.item.sales_price}</Text>
                </View>
                <View style={styles.lavelAndValue}>
                    <Text style={styles.lavel}>Available Qty: </Text>
                    <Text style={styles.value}>{products.item.minimum_qty}</Text>
                </View>
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
        backgroundColor: Constants.colors.whiteColor,
        padding: 12,
        borderRadius: 20,
    },
    productName: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 16,
        textTransform:'capitalize'
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
        textTransform:'capitalize'
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
    outOfStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        marginTop: 2,
        backgroundColor: Constants.colors.inputBgColor,
    }, 
    outOfStockInner: {
        width: 18,
        height: 18,
        backgroundColor: Constants.colors.whiteColor,
        borderWidth: 1,
        borderColor: Constants.colors.bodyBg,
        borderRadius: 18,
        position: 'absolute',
        top: 2,
        left: 2,
    },
})

export default RenderProducts