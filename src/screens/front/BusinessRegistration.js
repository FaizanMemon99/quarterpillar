import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BusinessRegistration = (props)=>{
    const [companyName, setCompanyName] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [year, setYear] = useState('')
    const [emailId, setEmailId] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassowrd] = useState('')
    const categories = ['Travel', 'Fashion', 'LifeStyle', 'Food']
    const years = [ '20012', '2013', '2015', '2016', '2017' ]
    const navigation = useNavigation()
    const userRegistration = async ()=>{
        if(companyName==='' && companyName===null){
            showToastmsg('Please enter company name')
        }
        else if(subCategory==='' && subCategory===null){
            showToastmsg('Please select a subcategory')
        }
        else if(year==='' && year===null){
            showToastmsg('Please select a yesr')
        }
        else if(emailId==='' && emailId===null){
            showToastmsg('Please email ID')
        }
        else if(ownerName==='' && ownerName===null){
            showToastmsg('Please enter owner name')
        }
        else if(password==='' && password===null){
            showToastmsg('Please enter your password')
        }
        else if(password.length<6){
            showToastmsg('Password must be 6 character or more')
        }
        else if(password!==confirmPassowrd){
            showToastmsg('Password did not match')
        }
        else{
            try{
                const response = await apiCall( 'POST', endPoints.BUSINESS_REGISTRATION, null, { company_name: companyName, mobile_number: props.route.params.mobileNumber, sub_category: subCategory, select_year: year, email_id: emailId, owner_name: ownerName, password: password } )
                if(response.error===false){
                    try {
                        await AsyncStorage.setItem('users', JSON.stringify({ token: response.data.token, userRole: 'businesss', userDetails: response.data.user }))
                    } catch (error) {
                        console.log(error)
                    }
                    navigation.navigate( '/addhaar-no' )
                }
                else{
                    showToastmsg(response.msg)
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Business Registration</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <TextInput placeholder='Company Name' style={globatStyles.inputText} onChangeText={text=>setCompanyName(text)} />
            <SelectDropdown
                data={categories}
                defaultButtonText='Sub-Select Category'
                buttonStyle={globatStyles.dropDownBox}
                buttonTextStyle={globatStyles.dropdownTextStyle}
                rowTextStyle={globatStyles.dropDownListStyle}
                renderDropdownIcon={()=><AntDesign name='down' />}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setSubCategory(selectedItem)
            }} />
            <SelectDropdown
                data={years}
                defaultButtonText='Select Year'
                buttonStyle={globatStyles.dropDownBox}
                buttonTextStyle={globatStyles.dropdownTextStyle}
                rowTextStyle={globatStyles.dropDownListStyle}
                renderDropdownIcon={()=><AntDesign name='down' />}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setYear(selectedItem)
            }} />
            <TextInput placeholder='Email ID' style={globatStyles.inputText} onChangeText={text=>setEmailId(text)} />
            <TextInput placeholder='Owner Name' style={globatStyles.inputText} onChangeText={text=>setOwnerName(text)} />
            <TextInput placeholder='Create Password' style={globatStyles.inputText} onChangeText={text=>setPassword(text)} secureTextEntry={true} />
            <TextInput placeholder='Confirm Password' style={globatStyles.inputText} onChangeText={text=>setConfirmPassowrd(text)} secureTextEntry={true} />
            <Pressable style={globatStyles.button} onPress={userRegistration}><Text style={globatStyles.btnText}>Next</Text></Pressable>
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


export default BusinessRegistration