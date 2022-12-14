import React, {useEffect, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AadhaarNo = (props)=>{
    
    
    const [aadhaarNo, setAadhaarNo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const gotoAadhaarNumber = async ()=>{
        if(aadhaarNo==='' || aadhaarNo===null){
            showToastmsg('Please enter owner aadhaar number')
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
                const response = await apiCall('POST', endPoints.AADHAAR_NUMBER, null, { business_id: user?user.userDetails.id: 0, aadhaar_number: aadhaarNo })
                if(response && response.error===false){
                    setIsLoading(false)
                    navigation.navigate( '/aadhar-verification', { aadhaarNumber: aadhaarNo, Mahareferid: response.data.Mahareferid[0].mahareferid} )
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
    }
    useEffect(() => {
        if(props.route.params.aadhaarNumber)
        setAadhaarNo(props.route.params.aadhaarNumber)
        console.log("maharef",props.route.params)
    }, [])
    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Aadhar Verification</Text>
            <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
            <TextInput placeholder='Owner Aadhar Card Number' keyboardType='number-pad' style={globatStyles.inputText} onChangeText={text=>setAadhaarNo(text)} />
            {
                isLoading?<ActivityIndicator size={30} color={Constants.colors.primaryColor} />:<Pressable style={globatStyles.button} onPress={gotoAadhaarNumber}><Text style={globatStyles.btnText}>Verify</Text></Pressable>
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
})


export default AadhaarNo