import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import showToastmsg from '../../shared/showToastmsg'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BankDetails = ()=>{
    const navigation = useNavigation()
    const [gstNumber, setGstNumber] = useState('')
    const [panCardNo, setPancardNo] = useState('')
    const [bankAccountNo, setBankAccountNo] = useState('')
    const [accountHolderName, setAccountHoldername] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    const [branchName, setBranchName] = useState('')
    const [servicesDetails, setServicesDetails] = useState('')
    const addbankAccountDetails = async ()=>{
        if(gstNumber==='' || gstNumber===null){
            showToastmsg('Please enter gst number')
        }
        else if(panCardNo==='' || panCardNo===null){
            showToastmsg('Please enter PAN number')
        }
        else if(bankAccountNo==='' || bankAccountNo===null){
            showToastmsg('Please enter bank account number')
        }
        else if(accountHolderName==='' || accountHolderName===null){
            showToastmsg('Please enter bank account holder name')
        }
        else if(ifscCode==='' || ifscCode===null){
            showToastmsg('Please enter bank\'s IFSC code')
        }
        else if(branchName==='' || branchName===null){
            showToastmsg('Please enter branch name of the bank')
        }
        else if(servicesDetails==='' || servicesDetails===null){
            showToastmsg('Please enter service/product details')
        }
        else{
            try {
                const user = await AsyncStorage.getItem('users')
                if(user!==null){
                    user = JSON.parse(user)
                }
            } catch (error) {
                console.log(error)
            }
            try {
                const response = await apiCall('POST', endPoints.AVED_BANK_ACCOUNT_DETAILS, null, {business_id: user.userDetails.id, gst_number: gstNumber, pan_number: panCardNo, bank_account_number: bankAccountNo, bank_account_holder_name: accountHolderName, bank_ifsc_code: ifscCode, bank_branch: branchName, product_or_service_details: servicesDetails })
                if(response.error===false){
                    props.route.params.authentication('business')
                }
            }catch(err){
                console.log(err)
            }
        }
    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Bank Details</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <TextInput placeholder='GST Number' style={globatStyles.inputText} onChangeText={(text)=>setGstNumber(text)} />
            <TextInput placeholder='PAN Card Number' style={globatStyles.inputText} onChangeText={(text)=>setPancardNo(text)} />
            <TextInput placeholder='Bank Account Number' style={globatStyles.inputText} onChangeText={(text)=>setBankAccountNo(text)} />
            <TextInput placeholder='Bank Account Holder Name' style={globatStyles.inputText} onChangeText={(text)=>setAccountHoldername(text)} />
            <TextInput placeholder='Bank IFSC' style={globatStyles.inputText} onChangeText={(text)=>setIfscCode(text)} />
            <TextInput placeholder='Bank Branch' style={globatStyles.inputText} onChangeText={(text)=>setBranchName(text)} />
            <TextInput placeholder='Product/Service Detail' style={globatStyles.inputText} onChangeText={(text)=>setServicesDetails(text)} />
            <Pressable style={globatStyles.button} onPress={addbankAccountDetails}><Text style={globatStyles.btnText}>Next</Text></Pressable>
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


export default BankDetails