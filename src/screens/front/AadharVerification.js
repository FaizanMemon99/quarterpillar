import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Pressable,
    ActivityIndicator
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import OTPTextInput from 'react-native-otp-textinput'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import Images from '../../assets/images/Images'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AdharVerification = (props)=>{

    const [isEditable, setIsEditable] = useState(false)
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [coundownTime, setCountDownTime] = useState(30)
    const navigation = useNavigation()
    useEffect(()=>{
        let timer = setInterval(()=>{
            if(coundownTime>0){
                clearInterval(timer)
                let  coundownT=coundownTime - 1
                setCountDownTime(coundownT)
            }
        }, 1000)
        
    },[coundownTime])
    const verifyAddhaar = async ()=>{
        if(!otp){
            showToastmsg('Please enter OTP')
        }
        else{
            setIsLoading(true)
            let user
            try {
                user = await AsyncStorage.getItem('users')
                if(user!==null){
                    user = JSON.parse(user)
                }
            } catch (error) {
                console.log(error)
            }
            try{
                const response = await apiCall('POST', endPoints.VERIFY_AADHAAR, null, { business_id: user.userDetails.id, Mahareferid: props.route.params.MahaRefId, otp: otp, mobile_number: user.userDetails.mobile_number })
                setIsLoading(false)
                console.log( response)
                if(response && response.error===false && response.has_ban_details){
                    props.route.params.authentication('business')
                }
                else if(response && response.error===false && response.has_bank_details===false){
                    navigation.navigate('/bank-details')
                }
                else{
                    showToastmsg(response.msg)
                }
            }
            catch(err){
                setIsLoading(false)
                console.log(err)
            }
            
        }
    }
    const resendOtp = async ()=>{
        setIsLoading(true)
        let user
        try {
            user = await AsyncStorage.getItem('users')
            if(user!==null){
                user = JSON.parse(user)
            }
        } catch (error) {
            console.log(error)
        }
        try{
            const response = await apiCall('POST', endPoints.AADHAAR_NUMBER, null, { business_id: user?user.userDetails.id: 0, aadhaar_number: props.route.params.aadhaarNumber })
            if(response && response.error===false){
                setIsLoading(false)
                navigation.navigate( '/aadhar-verification', { aadhaarNumber: aadhaarNo, Mahareferid: response.data.mahareferid } )
            }
            else{
                setIsLoading(false)
                showToastmsg(response.msg)
            }
        }
       catch(err){
            setIsLoading(false)
            console.log(err)
       }
    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Aadhar Verification</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <View>
                <TextInput placeholder='Owner Aadhar Card Number' style={globatStyles.inputText} value={props.route.params.aadhaarNumber} editable={isEditable} />
                <Pressable style={styles.editIcon} onPress={()=>setIsEditable(!isEditable)}>
                    <Image source={Images.editAadharIcon} />
                </Pressable>
            </View>
            <View>
                <Text style={styles.textStyle}>Enter OTP sent to registered no.</Text>
                <OTPTextInput inputCount={6} inputCellLength={10} textInputStyle={styles.otpField} handleTextChange={(otp)=>setOtp(otp)}/>
            </View>
            {
                coundownTime === 0?
                <Text onPress={resendOtp} style={styles.countdown}>Resend OTP</Text>:
                <Text style={{color: Constants.colors.whiteColor, alignSelf: 'flex-end',marginRight: 20}}>Resend In <Text style={styles.countdown}>{coundownTime}</Text></Text>
            }
            {
                isLoading?<ActivityIndicator size={30} color={Constants.colors.primaryColor} />:<Pressable style={globatStyles.button} onPress={verifyAddhaar}><Text style={globatStyles.btnText}>Verify</Text></Pressable>
            }
            
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
    editIcon: {
        position: 'absolute',
        right: 10,
        top: 16,
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Constants.fontFamily,
        marginBottom: 18,
    },
    otpField: {
        borderBottomWidth: 0,
        backgroundColor: Constants.colors.inputBgColor,
        borderRadius: Constants.borderRadius,
    },
    belowOtp: {
        fontSize: 14,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
        alignSelf: 'flex-end',
        marginEnd: '2%',
    },
    countdown: {
        color: Constants.colors.primaryColor,
        alignSelf: 'flex-end',
        marginRight: 20,
    }
})


export default AdharVerification