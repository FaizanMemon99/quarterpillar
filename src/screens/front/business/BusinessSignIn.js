import React, { useState } from 'react'
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
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import showToastmsg from '../../../shared/showToastmsg'
import { apiCall } from '../../../service/service'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BusinessSignIn=(props)=>{
    const navigation  = useNavigation()
    const [showPass, setShowPass] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)
    const [LoginId, setLoginId] = useState('')
    const [Password, setPassword] = useState('')
    const signinverificatoin = async () => {
        setIsLoading(true)
        try {
            if(LoginId==''||LoginId==null||Password==''||Password==null){
                setIsLoading(false)
                showToastmsg('Please enter login id and password')
            }
           else{ const response = await apiCall('POST', 'auth/login', null, { data: LoginId, password: Password ,type:props?.route?.params?.login_type=='Influencer'?2:props?.route?.params?.login_type=='Explorer'?1:props?.route?.params?.login_type=='Business'?4:props?.route?.params?.login_type=='Advertiser'?3:5})
            if (response && response.error === false && response.data.token) {
                setIsLoading(false)
                try {
                    if( response.data.login_success)
                    {
                        if(props.route.params.login_type=='Business')
                        {navigation.navigate('/home',{"userDetails":response.data.user})}
                        else if(props.route.params.login_type=='Influencer'){navigation.navigate('/influencer-stack-navigation',{userDetails:response.data.user})}
                        else if(props.route.params.login_type=='Explorer'){navigation.navigate('/influencer-stack-navigation',{userDetails:response.data.user})}
                        else {
                            navigation.navigate('/advertiser-product',{userDetails:response.data.user})
                        }
                    await AsyncStorage.setItem('users', JSON.stringify({ token: response.data.token, userRole: 'businesss', userDetails: response.data.user }))}
                    else {
                        setIsLoading(false)
                        showToastmsg('Login cred. or password is invalid')
                    }
                } catch (error) {
                    console.log(error)
                }              
            }
            else {
                setIsLoading(false)
                showToastmsg(response.msg)
            }}
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    const gotoForgotPass = () =>{
        navigation.navigate('/email-verify',{userType:props.route.params.login_type,phoneType:"forgotpassword"})
    }
    const gotoCreateAccount = () =>{
        if(props?.route?.params?.login_type=='Business')
        {navigation.navigate('/advertiser-categories')}
        else if(props?.route?.params?.login_type=='Influencer'||props.route.params.login_type=='Explorer'){
            navigation.navigate('/influencer-registration',{type:props.route.params.login_type})
        }
        else {
            navigation.navigate('/advertise-registration',{type:props.route.params.login_type})
        }

    }
    return (
        <View style={styles.background}>
            <VideoPlayer
                 video={{ uri: props.route.params.login_type==="Business"?"https://acapp.in/uploads/biz1.mp4":props.route.params.login_type==="Influencer"?"https://acapp.in/uploads/influencer1.mp4":props.route.params.login_type==="Explorer"?"https://acapp.in/uploads/explore.mp4":"https://acapp.in/uploads/adv.mp4"}}
                 autoplay
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
                <Text style={styles.businessText}>{props?.route?.params?.login_type?props?.route?.params?.login_type:''}</Text>
                    <Image source={Images.businessIcon} />
                </View>
                <Text style={styles.textBelowBusiness}>Enter Mobile Number/Email Id/Username</Text>
                <View style={styles.phoneNumberContainer}>
                    <TextInput style={styles.textInput} placeholder='Login Credentials' onChangeText={setLoginId}/>
                    <View style={{flex: 1, width: '100%', alignItems: 'center',}}>
                        <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={!showPass} onChangeText={setPassword}/>
                        <FontAwesome name={showPass?'eye-slash':'eye'} style={styles.eyeIcon} onPress={()=>setShowPass(!showPass)} />
                    </View>
                    <Text style={styles.forgotPassLink} onPress={gotoForgotPass}>Forgot Password</Text>
                </View>
                <Text style={styles.belowPhoneNumber}></Text>
                {IsLoading?<ActivityIndicator size={30} color={Constants.colors.whiteColor} />:<Pressable style={[globatStyles.button, {width: '92%', marginTop: 0,}]} onPress={signinverificatoin}><Text style={globatStyles.btnText}>Sign In</Text></Pressable>}
                <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center',}}>
                    <View style={styles.divider}></View> 
                    <View><Text style={{fontFamily: Constants.fontFamily, color: '#FFFFFF',}}>&nbsp; or &nbsp;</Text></View>
                    
                    <View style={styles.divider}></View>
                </View>
                <Pressable onPress={gotoCreateAccount}><Text style={{fontFamily: Constants.fontFamily, color: '#FFFFFF',textDecoration:"underline",textTransform:"capitalize"}}> &nbsp;  create new account &nbsp; </Text></Pressable>
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
        width: '100%',
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
        textTransform:'capitalize'
    },
    textBelowBusiness: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 20,
    },
    phoneNumberContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: Constants.colors.whiteColor,
        width: '90%',
        borderRadius: Constants.borderRadius,
        marginTop: 20,
        padding: 12,
    },
    belowPhoneNumber: {
        fontSize: 13,
        color: Constants.colors.whiteColor,
        marginTop: 12,
        fontFamily: Constants.fontFamily,
    },
    eyeIcon: {
        position: 'absolute',
        top: 34,
        right: 25,
        color: '#999999',
        fontSize: 24,
    },
    forgotPassLink: {
        alignSelf: 'flex-end',
        marginEnd: '5%',
        fontSize: 16,
        color: Constants.colors.primaryColor,
        fontFamily: Constants.fontFamily,
        textDecorationLine: 'underline',
        textDecorationColor: Constants.colors.primaryColor,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: Constants.colors.whiteColor,
        width: '20%',
    },
})

export default BusinessSignIn