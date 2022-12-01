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
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const Profile=(props)=>{
    const navigation=useNavigation()
    const UserType=Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length-1]
    // console.log('props value',props?.route?.params?.userDetails);
    function isImage() {
        var url=''
        if(Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length-1]=='influencer'){
url=`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}`
console.log('images',`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}`);
        }
        else
        {
            url=`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`
        console.log('images111',`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`);
        }
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
    return (
        <View>
            <CustomAppBar editable={true} navigation={navigation} isMainscreen={false} isReel={false} title='Profile' userDetails={props?.route?.params?.userDetails} type={Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length-1]} />
            <Text style={styles.summaryDesc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
            <ScrollView style={styles.container}>
               <View style={styles.companyDetails}>
                    <Image source={isImage?
                            {uri:Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length-1]=='influencer'?`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}`:`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.explore?.avatar}`}:Images.profileIcon} style={styles.companyLogo} />
                    <View style={styles.companyInfo}>
                        <Text style={styles.email}>{props?.route?.params?.userDetails?.name}</Text>
                        <Text style={styles.phone}>{UserType}</Text>
                    </View>
               </View>
               <View style={styles.socialDetails}>
                    <View style={styles.socialContainer}>
                        <Text style={styles.socialValue}>250</Text>
                        <Text style={styles.socialActivity}>Posts</Text>
                    </View>
                    <View style={styles.socialContainer}>
                        <Text style={styles.socialValue}>98</Text>
                        <Text style={styles.socialActivity}>Following</Text>
                    </View>
                    <View style={{...styles.socialContainer, borderRightWidth: 0,}}>
                        <Text style={styles.socialValue}>1.2M</Text>
                        <Text style={styles.socialActivity}>Follower</Text>
                    </View>
               </View>
               <View style={styles.divider}></View>
               <View style={styles.profileSection}>
                    <View style={styles.profileBgImg} >
                        <Image source={Images.profileOne} style={styles.ImgContainer}/>
                        <View style={styles.comments}>
                            <AntDesign name='hearto' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 16,}}>62k</Text>
                            <FontAwesome name='comment-o' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,}}>125</Text>
                        </View>
                    </View>
                    <View style={styles.profileBgImg}>
                        <Image source={Images.profileTwo} style={styles.ImgContainer}/>
                        <View style={styles.comments}>
                            <AntDesign name='hearto' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 16,}}>62k</Text>
                            <FontAwesome name='comment-o' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,}}>125</Text>
                        </View>
                    </View>
                    <View style={styles.profileBgImg}>
                        <Image source={Images.profileThree} style={styles.ImgContainer} />
                        <View style={styles.comments}>
                            <AntDesign name='hearto' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 16,}}>62k</Text>
                            <FontAwesome name='comment-o' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,}}>125</Text>
                        </View>
                    </View>
                    <View style={styles.profileBgImg}>
                        <Image source={Images.profileFour} style={styles.ImgContainer}/>
                        <View style={styles.comments}>
                            <AntDesign name='hearto' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 16,}}>62k</Text>
                            <FontAwesome name='comment-o' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,}}>125</Text>
                        </View>
                    </View>
               </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 190,
    },
    companyDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImgContainer: {
        width : '98%',
        height : '100%',
 
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
        fontSize: 20,
        textTransform:'capitalize'
    },
    phone: {
        fontFamily: Constants.fontFamily,
        marginTop: 8,
        color: '#A4A4B2',
        fontSize:20,
        textTransform:'capitalize'
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
        alignItems:'center',
        // paddingLeft:46
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
    },
    profileBgImg: {
        width: '50%',
        height: 252,
        resizeMode: 'cover',
        marginBottom : 4,
    },
    comments: {
        flexDirection: 'row',
        position: 'absolute',
        top: 20,
        left: 30,
    },
    summaryDesc: {
        padding:Constants.padding,
        fontFamily: Constants.fontFamily,
    },
})

export default Profile