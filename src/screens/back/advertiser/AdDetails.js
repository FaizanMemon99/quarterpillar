import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,

} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import Fontisto from 'react-native-vector-icons/Fontisto'

const  AdDetails=(props)=>{
    const [profileVisit, setProfileVisit] = useState(true)
    const [websiteVisit, setWebsiteVisit] = useState(false)
    const [moreMessage, setMoreaMessage] = useState(false)
    const [automatic, setAutomatic] = useState(true)
    const [createOwn, setCreateOwn] = useState(false)
    const navigation = useNavigation()

    const gotoCreateAudience = ()=>{
        navigation.navigate('/create-audience',{userDetails:props?.route?.params?.userDetails})
    }
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Ad Details' />
            <ScrollView style={styles.container}>
                <Text style={{fontFamily: Constants.fontFamily,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <Text style={{fontFamily: Constants.fontFamily, fontSize: 22, marginTop: 20, marginBottom: 5,}}>Select A Goal</Text>
                <View style={styles.boxContainer}>
                    <View style={styles.radioGroup}>
                        {
                            profileVisit?<Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={()=>{
                                setProfileVisit(true),
                                setWebsiteVisit(false),
                                setMoreaMessage(false)
                            }} />:<Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={()=>{
                                setProfileVisit(true),
                                setWebsiteVisit(false),
                                setMoreaMessage(false)
                            }} />
                        } 
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>More profile visits</Text>
                    </View>
                    <View style={styles.radioGroup}>
                        {
                            websiteVisit?<Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={()=>{
                                setProfileVisit(false),
                                setWebsiteVisit(true),
                                setMoreaMessage(false)
                            }} />:<Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={()=>{
                                setProfileVisit(false),
                                setWebsiteVisit(true),
                                setMoreaMessage(false)
                            }} />
                        } 
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>More website visits</Text>
                    </View>
                    <View style={styles.radioGroup}>
                        {
                            moreMessage?<Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={()=>{
                                setProfileVisit(false),
                                setWebsiteVisit(false),
                                setMoreaMessage(true)
                            }} />:<Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={()=>{
                                setProfileVisit(false),
                                setWebsiteVisit(false),
                                setMoreaMessage(true)
                            }} />
                        } 
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>More website visits</Text>
                    </View>
                </View>
                <Text style={{marginTop: 20, marginBottom: 12, fontFamily: Constants.fontFamily, fontSize:22,}}>Select Target Audience</Text>
                <View style={styles.boxContainer}>
                    <View style={styles.radioGroup}>
                        {
                            automatic?<Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={()=>{
                                setAutomatic(true),
                                setCreateOwn(false)
                            }} />:<Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={()=>{
                                setAutomatic(true),
                                setCreateOwn(false)
                            }} />
                        } 
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Automatic Selection</Text>
                    </View>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 12, marginLeft: 35,}}>Targets people like your followers</Text>
                    <View style={styles.radioGroup}>
                        {
                            createOwn?<Fontisto style={styles.radioBtn} name='radio-btn-active' onPress={()=>{
                                setAutomatic(false),
                                setCreateOwn(true)
                            }} />:<Fontisto style={styles.radioBtn} name='radio-btn-passive' onPress={()=>{
                                setAutomatic(false),
                                setCreateOwn(true)
                            }} />
                        } 
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 16,}}>Create Your Own</Text>
                    </View>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 12, marginLeft: 35,}}>Manually enter your targeting options</Text>
                </View>
                <Pressable style={globatStyles.button} onPress={gotoCreateAudience}><Text style={globatStyles.btnText}>Next</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    boxContainer: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginBottom: Constants.margin,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 9,
        marginTop: 9,
    },
    radioBtn: {
        fontSize: 22,
        marginRight: 12,
    },
})

export default AdDetails