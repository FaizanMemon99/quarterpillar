import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'

const AdvertiserRegistration = ()=>{
    const navigation = useNavigation()
    const gotoOtherDetails = ()=>{

        navigation.navigate( '/other-details' )

    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Advertiser Registration</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <TextInput placeholder='GST Number' style={globatStyles.inputText} />
            <TextInput placeholder='Pan Card Number' style={globatStyles.inputText} />
            <TextInput placeholder='Company Name' style={globatStyles.inputText} />
            <TextInput placeholder='Website' style={globatStyles.inputText} />
            <TextInput placeholder='Company Address' style={globatStyles.inputText} />
            <TextInput placeholder='Owner Name' style={globatStyles.inputText} />
            <Pressable style={globatStyles.button} onPress={gotoOtherDetails}><Text style={globatStyles.btnText}>Next</Text></Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        paddingTop: 28,
        flex: 1,
        backgroundColor: Constants.colors.bodyBg,
    },
    heading: {
        fontSize: 24,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        marginTop: 12,
    },
    subHeading: {
        fontSize: 14,
        fontFamily: Constants.fontFamily,
        marginTop: 18,
        marginBottom: Constants.padding,
    },
})


export default AdvertiserRegistration