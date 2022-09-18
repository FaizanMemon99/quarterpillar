import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Image
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'

import endPoints from '../../shared/endPoints'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
const BusinessRegistration = (props)=>{
    const [companyName, setCompanyName] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [year, setYear] = useState('')
    const [emailId, setEmailId] = useState('')
    const [businessemailId, setBusinessEmailId] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassowrd] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showCPass, setShowCPass] = useState(false)
    const [address, setAddress] = useState('')
    const [city, setcity] = useState('')
    const [state, setstate] = useState('')
    const [aadharNo, setaadharNo] = useState('')
    const [gstNo, setgstNo] = useState('')
    const categories = ['Xyz', 'abc', 'xyz123', 'abc123']
    const [isgst, setisgst] = useState('No')
    const [businessType, setbusinessType] = useState("Product")
    const [businessDocId, setbusinessDocId] = useState(1)
    // const years = [ '20012', '2013', '2015', '2016', '2017' ]
    const [filePath, setFilePath] = useState();
    const usernamePattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailIdPattern=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/; 
    const navigation = useNavigation()
    const userRegistration = async ()=>{
        if(companyName==='' || companyName===null){
            showToastmsg('Please enter company name')
        }
        else if(ownerName==='' || ownerName===null){
            showToastmsg('Please enter owner name')
        }
        else if(subCategory==='' || subCategory===null){
            showToastmsg('Please select a subcategory')
        }
        else if(emailId==='' || emailId===null){
            showToastmsg('Please enter email ID')
        }
        else if(!emailIdPattern.test(emailId)){
            showToastmsg('Please enter valid email id')
        }
        else if(businessemailId==='' || businessemailId===null){
            showToastmsg('Please enter business email ID')
        }
        else if(!emailIdPattern.test(businessemailId)){
            showToastmsg('Please enter valid business email id')
        }
        else if(PhoneNumber===''||PhoneNumber===null){
            showToastmsg('Please enter phone number')
        }
        else if(PhoneNumber.length<10){
            showToastmsg('Please enter 10 digit phone number')
        }
        else if(aadharNo===''||aadharNo===null){
            showToastmsg('Please enter aadhar number')
        }
        else if(aadharNo.length<12){
            showToastmsg('Please enter valid aadhar number')
        }
        else if(address===''||address===null){
            showToastmsg('Please enter address')
        }
        else if(state===''||state===null){
            showToastmsg('Please enter state')
        }
        else if(city===''||city===null){
            showToastmsg('Please enter city')
        }
        
        // else if(year==='' && year===null){
        //     showToastmsg('Please select a yesr')
        // }
      else if(isgst==="Yes"&&(gstNo===''||gstNo===null)){
            showToastmsg("Please enter gst number")
      }
      else if(isgst==="Yes"&&!(gstPattern.test(gstNo))){
        showToastmsg("Please enter valid gst number")
    }
        else if(username===''||username===null){
            showToastmsg('Username cannot be empty')
        }
        // else if(!usernamePattern.test(username)){
        //     showToastmsg('Username should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        // }
       
       
        else if(password==='' || password===null){
            showToastmsg('Please enter your password')
        }
        else if(!usernamePattern.test(password)){
            showToastmsg('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        }
        else if(confirmPassowrd==='' || confirmPassowrd===null){
            showToastmsg('Please enter confirm password')
        }
        else if(password!==confirmPassowrd){
            showToastmsg('Password did not match')
        }
        else{
            try{
                const response = await apiCall( 'POST', 'business/registration', null, 
                {    
                    "catorige":props.route.params.category,
                    "sub_category":subCategory,
                    "company_name":companyName,
                    "owner_name":ownerName,
                    "business_email":businessemailId,
                    "owner_email":emailId,
                    "owner_phone":PhoneNumber,
                    "is_biz_email_verified":"false",
                    "is_owner_email_verified":"false",
                    "is_phone_no_verified":"false",
                    "owner_adhar":aadharNo,
                    "is_adhar_verifed":"false",
                    "business_doc_id":businessDocId,
                    "is_business_doc_verfied":"false",
                    "has_gst":isgst==="Yes"?gstNo:"",
                    "is_gst_verfied":"false",
                    "business_profile_pic":filePath.path,
                    "business_password":password,
                    "business_address":address,
                    "username":username,
                    "is_product":businessType==="Product",
                    "is_service":businessType==="Service",
                    "city":city,
                    "state":state,
                    "country":"india"
                }
                 )
               
                if(response.error===false){
                    try {
                        if(response.data.registration_success){
                            axios.post(`${Constants.BASE_URL}auth/mobile-number`,{mobile_number:PhoneNumber}).then((res)=>{
                                
                                if(res.data.response==200){
                                    navigation.navigate('/business-otp',{userDetails: response.data.user,phoneNumber:PhoneNumber})
                                    showToastmsg(res.data.msg)
                                    console.log("mobile otp value",res.data.data.otp)
                                }
                                else {
                                    showToastmsg(res.msg)
                                }
                                
                            }).catch((err)=>{
                                console.log("phone number otp error",err)
                            })
                            
                            await AsyncStorage.setItem('users', JSON.stringify({ token: response.data.token, userRole: props.route.params.category, userDetails: response.data.user }))
                        }
                        
                    } catch (error) {
                        console.log(error)
                    }
                    // navigation.navigate( '/addhaar-no' )
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
    
    
    const chooseFile = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log("image value",image)
            
            setFilePath(image);
          });
      };
      const businessDocarray=["With GST","With Shopact License","With MCA"]
    return (
        <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Business Registration</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <TextInput placeholder='Company Name' style={globatStyles.inputText} onChangeText={text=>setCompanyName(text)} />
            <TextInput placeholder='Owner Name' style={globatStyles.inputText} onChangeText={text=>setOwnerName(text)} />
            <SelectDropdown
                data={categories}
                defaultButtonText='Sub-Select Category'
                buttonStyle={globatStyles.dropDownBox}
                buttonTextStyle={globatStyles.dropdownTextStyle}
                rowTextStyle={globatStyles.dropDownListStyle}
                renderDropdownIcon={()=><AntDesign name='down' />}
                onSelect={(selectedItem, index) => {
                    setSubCategory(selectedItem)
            }} />
            
            <TextInput keyboardType={'email-address'} placeholder='Email ID' style={globatStyles.inputText} onChangeText={text=>setEmailId(text)} />
            <TextInput keyboardType={'email-address'} placeholder='Business Email ID' style={globatStyles.inputText} onChangeText={text=>setBusinessEmailId(text)} />
            <TextInput keyboardType={'phone-pad'} style={globatStyles.inputText} placeholder='Mobile Phone' onChangeText={(e)=>setPhoneNumber(e)} />
            <TextInput keyboardType={'numeric'} style={globatStyles.inputText} placeholder='Aadhar Number' onChangeText={(e)=>setaadharNo(e)} />
            <TextInput style={globatStyles.inputText} placeholder='Address' onChangeText={(e)=>setAddress(e)} />
            <TextInput style={globatStyles.inputText} placeholder='State' onChangeText={(e)=>setstate(e)} />
            <TextInput style={globatStyles.inputText} placeholder='City' onChangeText={(e)=>setcity(e)} />
            <Text style={styles.subHeading}>
                How do you want to verify your business
            </Text>
             <SelectDropdown
                data={businessDocarray}
                defaultButtonText='Business verification'
                buttonStyle={globatStyles.dropDownBox}
                buttonTextStyle={globatStyles.dropdownTextStyle}
                rowTextStyle={globatStyles.dropDownListStyle}
                renderDropdownIcon={()=><AntDesign name='down' />}
                defaultValue={businessDocarray[businessDocId-1]}
                onSelect={(index) => {
                    setbusinessDocId(index+1)
            }} />
            <Text style={styles.subHeading}>
                Has Gst
            </Text>
             <SelectDropdown
                data={["Yes","No"]}
                defaultButtonText='Has Gst'
                buttonStyle={globatStyles.dropDownBox}
                buttonTextStyle={globatStyles.dropdownTextStyle}
                rowTextStyle={globatStyles.dropDownListStyle}
                renderDropdownIcon={()=><AntDesign name='down' />}
                defaultValue={isgst}
                onSelect={(selectedItem, index) => {
                    setisgst(selectedItem)
            }} /> 
            {isgst==="Yes"&&
            <TextInput placeholder='Gst number *' style={globatStyles.inputText}
            defaultValue={gstNo}
            onChangeText={text=>setgstNo(text)} />
            }
            <Text style={styles.subHeading}>
                Business Type
            </Text>
            <SelectDropdown
                data={["Product","Service"]}
                defaultButtonText='Business Type'
                buttonStyle={globatStyles.dropDownBox}
                buttonTextStyle={globatStyles.dropdownTextStyle}
                rowTextStyle={globatStyles.dropDownListStyle}
                renderDropdownIcon={()=><AntDesign name='down' />}
                defaultValue={businessType}
                onSelect={(selectedItem, index) => {
                    setbusinessType(selectedItem)
            }} /> 
                {filePath?
                <>
                <Text style={styles.subHeading}>
                Business profile image
            </Text>
                <Pressable onPress={chooseFile}><Image source={{uri:filePath.path}} style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    margin: 5,marginBottom:20
                  }} /></Pressable></>:
                <Pressable style={[globatStyles.button,{marginTop:0,marginBottom:15}]} onPress={chooseFile}><Text style={globatStyles.btnText}>Add profile photo</Text></Pressable>}
            <TextInput placeholder='Username' style={globatStyles.inputText} onChangeText={text=>setusername(text)} />
            <View style={{flex: 1, width: '100%',justifyContent:"center",position:"relative"}}>
                        <TextInput style={globatStyles.inputText} placeholder='Create Password' onChangeText={text=>setPassword(text)} secureTextEntry={!showPass} />
                        <FontAwesome name={showPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setShowPass(!showPass)} />
                    </View>
                    <View style={{flex: 1, width: '100%', justifyContent: 'center',position:"relative"}}>
                        <TextInput style={globatStyles.inputText} placeholder='Confirm Password' onChangeText={text=>setConfirmPassowrd(text)} secureTextEntry={!showCPass} />
                        <FontAwesome name={showCPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setShowCPass(!showCPass)} />
                    </View>   
            <Pressable style={[globatStyles.button,{marginTop:10}]} 
            onPress={userRegistration}
            // onPress={()=>navigation.navigate('/business-otp')}
            ><Text style={globatStyles.btnText}>Next</Text></Pressable>
        </View>
        </ScrollView>
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
    eyeIcon: {
        position: 'absolute',
        top: 15,
        right: 25,
        color: '#999999',
        fontSize: 24,
    },
})


export default BusinessRegistration