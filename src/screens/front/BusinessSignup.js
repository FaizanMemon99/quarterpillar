import React, {useState} from 'react'
import { 
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    TextInput,
    ActivityIndicator,
 } from 'react-native'
import VideoPlayer from 'react-native-video-player'
import { useNavigation } from '@react-navigation/native'
import Images from '../../assets/images/Images'
import SelectDropdown from 'react-native-select-dropdown'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'

const BusinessSignup=()=>{
    const navation  = useNavigation()
    const countries = ["+91", "+92", "+93", "+94", "+95"]
    const [mobileNumber, setMobileNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const generateOtpBusiness = ()=>{
        if(mobileNumber==='' || mobileNumber===null){
            showToastmsg('Please enter your mobile number')
        }
        else if(mobileNumber.length<10){
            showToastmsg('Please enter 10 digits mobile number')
        }
        else{
            setIsLoading(true)
            userSignup()
        }
    }
    const userSignup = async () =>{
        try {
            const response = await apiCall('POST', endPoints.USER_LOGIN, null, { mobile_number: mobileNumber})
            if(response.error===null && response.data.otp){
                setIsLoading(false)
                navation.navigate('/business-otp', {mobileNumber: mobileNumber})
            }
            else{
                setIsLoading(false)
                showToastmsg(response.msg)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    return (
        <View style={styles.background}>
            <VideoPlayer
                 video={{ uri: 'http://qp.flymingotech.in/public/videos/pexels-artem-podrez-6780089.mp4' }}
                 autoplay
                 loop
                 disableSeek
                 resizeMode={'cover'}
                 customStyles={{
                     wrapper: {
                         width: Constants.width,
                         height: Constants.height,
                         paddingBottom: Constants.padding,
                     },
                     video: {
                         width: Constants.width,
                         height: Constants.height+25,
                     },
                     controls: {
                         display: 'none',
                     },
                     seekBarBackground: {
                         backgroundColor: 'transparent',
                     },
                     seekBarProgress: {
                         backgroundColor: 'transparent',
                     },
                }} />
            <View style={globatStyles.overlay}></View>
            <View style={styles.container}>
                <Image source={Images.logo} />
                <Text style={styles.textBelowLogo}>Welcome to Quarterpillars</Text>
                <View style={styles.business}>
                    <Text style={styles.businessText}>Business</Text>
                    <Image source={Images.businessIcon} />
                </View>
                <Text style={styles.textBelowBusiness}>Enter Mobile Number and Sign In</Text>
                <View style={styles.phoneNumberContainer}>
                    <View style={styles.countryCode}>
                        <Image source={Images.indiaFlag} style={styles.countryFlag} />
                        <SelectDropdown
                            data={countries}
                            buttonStyle={styles.countryDropdown}
                            defaultValue={+91}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                        }} />
                        <Image source={Images.dropdownIcon} style={styles.dropdownIcon} />
                    </View>
                    <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder='Mobile Phone' onChangeText={(e)=>setMobileNumber(e)} />
                </View>
                <Text style={styles.belowPhoneNumber}>We will send you an OTP to validate your mobile number.</Text>
                {
                    isLoading?<ActivityIndicator size={30} color={Constants.colors.whiteColor} />:<Pressable style={[globatStyles.button, {width: '92%'}]} onPress={generateOtpBusiness}><Text style={globatStyles.btnText}>Generate OTP</Text></Pressable>
                }
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        height: Constants.width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: Constants.padding,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    textBelowLogo: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '700',
        color: Constants.colors.whiteColor,
        maxWidth: '60%',
        textAlign: 'center',
        marginTop: 12,
    },
    business: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: 'rgba(51, 51, 51, 0.2)',
        padding:8,
        paddingStart: 16,
        paddingEnd: 16,
        borderRadius: 5,
    },
    businessText: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        color: Constants.colors.whiteColor,
        fontWeight: '700',
        marginRight: Constants.margin,
    },
    textBelowBusiness: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 20,
    },
    phoneNumberContainer: {
        flexDirection: 'row',
    },
    countryDropdown: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        width: 75,
        position: 'absolute',
        left: 14,
        top: 0,
    },
    countryCode: {
        flexDirection: 'row',
        backgroundColor: Constants.colors.whiteColor,
        width: 90,
        borderRadius: Constants.borderRadius,
        height: 50,
    },
    countryFlag: {
        position: 'absolute',
        left: 5,
        top: 12,
    },
    textInput: {
        backgroundColor: Constants.colors.whiteColor,
        width: '60%',
        borderRadius: Constants.borderRadius,
        marginLeft: 20,
        paddingLeft: 12,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 6,
        top: 23,
    },
    belowPhoneNumber: {
        fontSize: 13,
        color: Constants.colors.whiteColor,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
    },
})

export default BusinessSignup