import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const RenderOrders = ({item})=>{
    return (
        <View style={styles.container}>
            <Image source={Images.orderImg} />
            <View style={styles.productDetails}>
                <View style={styles.productFirstRow}>
                    <Text style={styles.producname}>{item.item.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.priceicon}><FontAwesome name='rupee' /></Text>
                        <Text style={styles.oldPrice}>1500</Text>
                        <View style={styles.strikethrough}></View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.priceicon}><FontAwesome name='rupee' /></Text>
                        <Text style={styles.price}>1500</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.priceicon, {color: Constants.colors.primaryColor}]}><FontAwesome name='rupee' /></Text>
                        <Text style={[styles.price, {color: Constants.colors.primaryColor}]}>300 Off</Text>
                    </View>
                </View>
                <View style={styles.productSecondRow}>
                    <View style={{flexDirection: 'row', marginRight: 12, alignItems: 'center',}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 11,}}>Qty : </Text><Text>1</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginRight: 12, alignItems: 'center',}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 11,}}>Qty : </Text><Text>500ml</Text>
                    </View>
                </View>
                <View style={styles.productSecondRow}>
                    <View style={{flexDirection: 'row', marginRight: 12, alignItems: 'center',}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 11,}}>Rate : </Text>
                        <FontAwesome name='star' style={styles.star} />
                        <FontAwesome name='star' style={styles.star} />
                        <FontAwesome name='star' style={styles.star} />
                        <FontAwesome name='star' style={styles.star} />
                        <FontAwesome name='star-o' style={styles.star} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginTop: 12,
        flexDirection: 'row',
    },
    productDetails: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 12,
    },
    productFirstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    producname: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '700',
    },
    priceicon: {
        marginLeft: 12,
        marginTop: 5,
        color: '#979797',
    },
    oldPrice: {
        color: '#979797',
    },
    strikethrough: {
        width: 40,
        height: 1,
        backgroundColor: '#979797',
        position: 'absolute',
        left: '25%',
        top: '48%',
    },
    productSecondRow: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 15,
        color: '#999999',
        marginRight: 12,
    },
})

export default RenderOrders