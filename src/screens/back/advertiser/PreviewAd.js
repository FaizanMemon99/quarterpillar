import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    Image,
} from 'react-native'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Slider from 'react-native-slider'
import Images from '../../../assets/images/Images'

const PreviewAd = (props) => {
    const navigation = useNavigation()

    const gotoAdPayment = () => {
        navigation.navigate('/payment-details')
    }
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Preview' />
            <ScrollView style={styles.container}>
                <Text style={{ fontFamily: Constants.fontFamily, flexWrap: 'wrap',}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={styles.boxContainer}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 22, marginBottom: 12,}}>Post Details</Text>
                    <View style={styles.imgContainer}>
                        <Image source={Images.nature} style={styles.img} />
                        <View style={{flex: 1,}}>
                            <Text style={{fontFamily: Constants.fontFamily, fontSize: 20, marginBottom: 4,}}>Sample Title</Text>
                            <Text style={{fontFamily: Constants.fontFamily,}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                        <View>
                            <Text style={{fontSize: 22, fontFamily: Constants.fontFamily, marginBottom: 10,}}>Goal</Text>
                            <Text style={{fontWeight: '700', fontSize: 20, fontFamily: Constants.fontFamily,}}>More profile visits</Text>
                        </View>
                        <FontAwesome name='angle-right' size={24} />
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                        <View>
                            <Text style={{fontSize: 22, fontFamily: Constants.fontFamily, marginBottom: 10,}}>Audience</Text>
                            <Text style={{fontWeight: '700', fontSize: 20, fontFamily: Constants.fontFamily,}}>Automatic</Text>
                        </View>
                        <FontAwesome name='angle-right' size={24} />
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                        <View>
                            <Text style={{fontSize: 22, fontFamily: Constants.fontFamily, marginBottom: 10,}}>Budget & Duration</Text>
                            <Text style={{fontWeight: '700', fontSize: 20, fontFamily: Constants.fontFamily,}}><FontAwesome name='rupee' size={22} /> 3,000 / 2 weeks</Text>
                        </View>
                        <FontAwesome name='angle-right' size={24} />
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 22, marginBottom: 12,}}>Cost Summary</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Advertisement Cost (14days)</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}><FontAwesome name='rupee' size={16} /> 3000</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Discount</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}><FontAwesome name='rupee' size={16} /> 600</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Estimated Tax</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}><FontAwesome name='rupee' size={16} /> 100</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,}}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Total Amount to be Paid</Text>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}><FontAwesome name='rupee' size={16} /> 2400</Text>
                    </View>
                </View>
                <Pressable style={[globatStyles.button, {marginBottom: 50,}]} onPress={gotoAdPayment}><Text style={globatStyles.btnText}>Proceed to pay</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    boxContainer: {
        marginTop: Constants.margin,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginBottom: Constants.margin,
    },
    imgContainer: {
        flexDirection: 'row',
    },
    img: {
        width: 120,
        height: 200,
        borderRadius: 10,
        marginRight: 12,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: Constants.colors.primaryColor,
    },
})

export default PreviewAd