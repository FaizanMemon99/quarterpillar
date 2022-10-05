import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Pressable,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'
import Constants from '../../../shared/Constants'

const ProfileScreen=(props)=>{
    const [showDrawer, setShowDrawer] = useState(false)
    const navigation=useNavigation()
    const openDrawer = ()=>{
        setShowDrawer(!showDrawer)
    }
    console.log("props values",props?.route?.params?.userDetails);
    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
    return (
        <View style={{flex:1}}>
        <CustomAppBar name={props?.route?.params?.userDetails?.name} navigation={navigation} isMainscreen={true} isReel={false} openDrawer={openDrawer} showDrawer={showDrawer}/>           
        <View style={styles.container}>
         <ScrollView style={{paddingBottom:10}}>
               <View style={styles.companyDetails}>
                    <Image source={isImage(`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business?.business_profile_pic}`)?{uri:`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business?.business_profile_pic}`}:Images.companyLogo} style={styles.companyLogo} />
                    <View style={styles.companyInfo}>
                        <Text style={styles.email}>{props?.route?.params?.userDetails?.email}</Text>
                        <Text style={styles.phone}>+91-{props?.route?.params?.userDetails?.mobile_number}</Text>
                        <Pressable><Text style={styles.moreInfo}>More Info</Text></Pressable>
                    </View>
               </View>
               <View style={styles.socialDetails}>
                    <View style={styles.socialContainer}>
                        <Text style={styles.socialValue}>1.2M</Text>
                        <Text style={styles.socialActivity}>Follower</Text>
                    </View>
                    <View style={styles.socialContainer}>
                        <Text style={styles.socialValue}>98</Text>
                        <Text style={styles.socialActivity}>Following</Text>
                    </View>
                    <View style={{...styles.socialContainer, borderRightWidth: 0,}}>
                        <Text style={styles.socialValue}>250</Text>
                        <Text style={styles.socialActivity}>Posts</Text>
                    </View>
               </View>
               <View style={styles.divider}></View>
               <View style={styles.profileSection}>
                    <Image source={Images.profileOne} style={styles.profileBgImg} />
                    <Image source={Images.profileTwo} style={styles.profileBgImg} />
                    <Image source={Images.profileThree} style={styles.profileBgImg} />
                    <Image source={Images.profileFour} style={styles.profileBgImg} />
               </View>
            </ScrollView>
           
        </View>
        <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer} activeTab='profile'
                propValue={props?.route?.params?.userDetails}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
        paddingLeft:0,
        paddingRight:0,
        // marginBottom: 130,
    },
    companyDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    companyLogo: {
        padding: Constants.padding+12,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
    },
    companyInfo: {
        marginLeft: Constants.margin,
    },
    email: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    phone: {
        fontFamily: Constants.fontFamily,
        marginTop: 8,
        color: '#A4A4B2',
    },
    moreInfo: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        marginTop: 8,
        fontWeight: '800',
        textDecorationColor: Constants.colors.primaryColor,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',

    },
    socialDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialContainer:{
        padding: Constants.padding,
        paddingTop: 0,
        paddingBottom: 12,
        borderRightWidth: 2,
        borderRightColor: '#D9D9D9',
        marginTop: Constants.margin,
        alignItems: 'center',
    },
    socialValue: {
        color: '#007635',
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 22,
    },
    socialActivity: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        marginTop: 12,
    },
    divider: {
        height: 2,
        width: '65%',
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    profileSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom:210
    },
    profileBgImg: {
        width: '50%',
        height: 280,
        resizeMode: 'cover',
    },
})

export default ProfileScreen