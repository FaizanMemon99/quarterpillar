import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Image,
    ScrollView,
} from 'react-native'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import DatePicker from 'react-native-date-picker'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import Images from '../../../assets/images/Images'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const InfluencerRegistration=()=>{
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const [gender,setGender] = useState('m')
    const [instaGram, setInstaGram] = useState(true)
    const [facebook, setFacebook] = useState(true)
    const [youtube, setYoutube] = useState(true)
    const [twitter, setTwitter] = useState(true)
    const [tictok, setTictok] = useState(true)
    const [pinterest, setPintesest] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const gotoDashboard = ()=>{
        navigation.navigate('/influencer-stack-navigation')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.influencerRegiHeading}>Influencer Registration</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <TextInput style={globatStyles.inputText} placeholder='Full Name' />
                <TextInput style={globatStyles.inputText} placeholder='Email ID' />
                <View style={{width: '100%'}}>
                    <Text style={[globatStyles.inputLabel, {position: 'absolute', left: 10, top: 15, zIndex: 999, color: '#999999',}]}>Date Of Birth</Text>
                    <AntDesign name='calendar' style={styles.calenderIcon} size={32} color='#999999' />
                    <Pressable style={[globatStyles.inputText,{height: 50,}]} onPress={()=>setOpen(true)}><Text></Text></Pressable>
                    <DatePicker
                        modal
                        mode='date'
                        open={open}
                        date={date}
                        onDateChange={setDate}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <Text style={globatStyles.inputLabel}>Gender</Text>
                <View style={styles.gender}>
                    {
                        gender==='m'?<Fontisto name='radio-btn-active' onPress={()=>setGender('m')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('m')} />
                    }<Text style={styles.genderLabel}> Male</Text>
                    {
                        gender==='f'?<Fontisto name='radio-btn-active' onPress={()=>setGender('f')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('f')} />
                    }<Text style={styles.genderLabel}> Female</Text>
                    {
                        gender==='o'?<Fontisto name='radio-btn-active' onPress={()=>setGender('o')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('o')} />
                    }<Text style={styles.genderLabel}> Others</Text>
                </View>
                <View style={{marginTop: 12,}}>
                    <Fontisto name='map-marker-alt' style={styles.calenderIcon} size={32} color='#999999' />
                    <TextInput placeholder='Location/Digital Nomad' style={globatStyles.inputText} />
                </View>
                <View style={{flexDirection: 'row', flex: 3, marginBottom: 10,marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                            <Image source={Images.instagram} />
                        </View>
                        {
                            instaGram?<MaterialCommunityIcons name='checkbox-marked' size={22} onPress={()=>setInstaGram(false)} style={styles.socialCheck} />:<MaterialCommunityIcons name='checkbox-blank-outline' size={22} onPress={()=>setInstaGram(true)} style={styles.socialCheck} />
                        }
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} placeholder='Copy the link' />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 3, marginBottom: 10, marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                            <Image source={Images.facebook} />
                        </View>
                        {
                            facebook?<MaterialCommunityIcons name='checkbox-marked' size={22} onPress={()=>setFacebook(false)} style={styles.socialCheck} />:<MaterialCommunityIcons name='checkbox-blank-outline' size={22} onPress={()=>setFacebook(true)} style={styles.socialCheck} />
                        }
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} placeholder='Copy the link' />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 3, marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                            <Image source={Images.youtube} />
                        </View>
                        {
                            youtube?<MaterialCommunityIcons name='checkbox-marked' size={22} onPress={()=>setYoutube(false)} style={styles.socialCheck} />:<MaterialCommunityIcons name='checkbox-blank-outline' size={22} onPress={()=>setYoutube(true)} style={styles.socialCheck} />
                        }
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} placeholder='Copy the link' />
                    </View>
                </View>
                <View style={{flexDirection: 'row',marginLeft: 10, marginTop: 20, }}>
                    <View style={{marginRight: 10,}}>
                        <View style={styles.socialIcon}>
                            <Image source={Images.twitter} />
                        </View>
                        {
                            twitter?<MaterialCommunityIcons name='checkbox-marked' size={22} onPress={()=>setTwitter(false)} style={styles.socialCheck} />:<MaterialCommunityIcons name='checkbox-blank-outline' size={22} onPress={()=>setTwitter(true)} style={styles.socialCheck} />
                        }
                    </View>
                    <View style={{marginRight: 10,}}>
                        <View style={styles.socialIcon}>
                            <Image source={Images.tiktok} />
                        </View>
                        {
                            tictok?<MaterialCommunityIcons name='checkbox-marked' size={22} onPress={()=>setTictok(false)} style={styles.socialCheck} />:<MaterialCommunityIcons name='checkbox-blank-outline' size={22} onPress={()=>setTictok(true)} style={styles.socialCheck} />
                        }
                    </View>
                    <View>
                        <View style={styles.socialIcon}>
                            <Image source={Images.pinterest} />
                        </View>
                        {
                            pinterest?<MaterialCommunityIcons name='checkbox-marked' size={22} onPress={()=>setPintesest(false)} style={styles.socialCheck} />:<MaterialCommunityIcons name='checkbox-blank-outline' size={22} onPress={()=>setPintesest(true)} style={styles.socialCheck} />
                        }
                    </View>
                </View>
                <View style={{marginTop: 12,}}>
                    <TextInput style={globatStyles.inputText} secureTextEntry={!showPassword} placeholder='Enter Password' />
                    {
                        showPassword?(
                            <Entypo name='eye-with-line' color='#D0C9D6' size={22} style={styles.password} onPress={()=>setShowPassword(false)} />
                        ):(
                            <Entypo name='eye' color='#D0C9D6' size={22} style={styles.password} onPress={()=>setShowPassword(true)} />
                        )
                    }
                </View>
                <View>
                    <TextInput style={globatStyles.inputText} secureTextEntry={!showConfirmPassword} placeholder='Confirm Password' />
                    {
                        showConfirmPassword?(
                            <Entypo name='eye-with-line' color='#D0C9D6' size={22} style={styles.password} onPress={()=>setShowConfirmPassword(false)} />
                        ):(
                            <Entypo name='eye' color='#D0C9D6' size={22} style={styles.password} onPress={()=>setShowConfirmPassword(true)} />
                        )
                    }
                </View>
                <Pressable style={globatStyles.button} onPress={gotoDashboard}><Text style={globatStyles.btnText}>Save</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Constants.padding,
        paddingTop: 32,
    },
    influencerRegiHeading: {

        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 26,
    },
    desc: {
        fontFamily: Constants.fontFamily,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    calenderIcon: {
        position: 'absolute',
        top: 8,
        right: 10,
        zIndex: 999,
    },
    gender: {
        flexDirection: 'row',
    },
    genderIcon:{
        fontSize: 24,
        marginTop: 10,
    },
    genderLabel: {
        marginLeft: 8,
        marginRight: Constants.margin+12,
        marginTop: 10,
    },
    socialIcon: {
        height: 60,
        width: 60,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialCheck: {
        position: 'absolute',
        top: -8,
        left: -8,
    },
    password: {
        position: 'absolute',
        top: 15,
        right: 10,
        zIndex: 999,
    },
})

export default InfluencerRegistration