import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import Clipboard from '@react-native-clipboard/clipboard'

const Coupons = ({navigation})=>{
    const copyCode = (text)=>{
        Clipboard.setString(text)
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Coupon Code' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={styles.couponConatiner}>
                    <View style={{flexDirection: 'row',}}>
                        <Text style={styles.rupees}><FontAwesome name='rupee' size={25} /> 600 off</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.code}>FESTIVENEW</Text>
                    </View>
                    <Pressable onPress={()=>copyCode('Hello')}><Text style={styles.copy}>Copy Code</Text></Pressable>
                </View>
                <View style={[globatStyles.divider, {marginTop: 5, marginBottom: 5,}]}></View>
                <View style={styles.couponConatiner}>
                    <View style={{flexDirection: 'row',}}>
                        <Text style={styles.rupees}><FontAwesome name='rupee' size={25} /> 600 off</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.code}>FESTIVENEW</Text>
                    </View>
                    <Pressable onPress={()=>copyCode('Hello')}><Text style={styles.copy}>Copy Code</Text></Pressable>
                </View>
                <View style={[globatStyles.divider, {marginTop: 5, marginBottom: 5,}]}></View>
                <View style={styles.couponConatiner}>
                    <View style={{flexDirection: 'row',}}>
                        <Text style={styles.rupees}><FontAwesome name='rupee' size={25} /> 600 off</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.code}>FESTIVENEW</Text>
                    </View>
                    <Pressable onPress={()=>copyCode('Hello')}><Text style={styles.copy}>Copy Code</Text></Pressable>
                </View>
                <View style={[globatStyles.divider, {marginTop: 5, marginBottom: 5,}]}></View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
    },
    wrapper: {
        padding: Constants.padding,
    },
    heading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        marginTop: 12,
        marginBottom: 12,
    },
    addressDetails: {
        fontFamily: Constants.fontFamily,
    },
    couponConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 20,
    },
    rupees: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
    },
    code: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
    },
    divider: {
        fontSize: 24,
        marginLeft: 10,
        marginRight: 10,
        color: '#A4A4A4'
    },
    copy: {
        fontFamily: Constants.fontFamily,
        fontStyle: 'italic',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        color: Constants.colors.primaryColor,
    },
})

export default Coupons