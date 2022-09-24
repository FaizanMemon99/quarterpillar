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

const SelectAddress = ({navigation})=>{
    const addAddress = ()=>{
        navigation.navigate('/add-address')
    }
    const gotoPayment = ()=>{
        navigation.navigate('/payment-details')
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Select Address' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <Pressable onPress={addAddress} style={globatStyles.btnAddAddress}><Text style={globatStyles.btnTextAddress}><FontAwesome name='plus' /> Add Address</Text></Pressable>
                <Text style={styles.heading}>Saved Address</Text>
                <Text style={styles.addressDetails}>House One</Text>
                <Text style={styles.addressDetails}>Blk 35 Mandalay Road # 13–37 Mandalay Towers Singapore 308215</Text>
                <View style={globatStyles.divider}></View>
                <Text style={styles.addressDetails}>House Two</Text>
                <Text style={styles.addressDetails}>Blk 35 Mandalay Road # 13–37 Mandalay Towers Singapore 308215</Text>
                <View style={globatStyles.divider}></View>
            </ScrollView>
            <Pressable onPress={gotoPayment} style={[globatStyles.button, {marginTop: 10}]}><Text style={globatStyles.btnText}>Place Order ( <FontAwesome name='rupee' /> 1250 )</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
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
})

export default SelectAddress