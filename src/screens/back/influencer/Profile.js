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

const Profile=({navigation})=>{
    return (
        <View>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Profile' />
            <ScrollView style={styles.container}>
               <View style={styles.companyDetails}>
                    <Image source={Images.profileIcon} style={styles.companyLogo} />
                    <View style={styles.companyInfo}>
                        <Text style={styles.email}>Ruchika Das</Text>
                        <Text style={styles.phone}>Fashion Blogger</Text>
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
                    <View style={styles.profileBgImg} >
                        <Image source={Images.profileOne} />
                        <View style={styles.comments}>
                            <AntDesign name='hearto' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 16,}}>62k</Text>
                            <FontAwesome name='comment-o' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,}}>125</Text>
                        </View>
                    </View>
                    <View style={styles.profileBgImg}>
                        <Image source={Images.profileTwo} />
                        <View style={styles.comments}>
                            <AntDesign name='hearto' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 16,}}>62k</Text>
                            <FontAwesome name='comment-o' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,}}>125</Text>
                        </View>
                    </View>
                    <View style={styles.profileBgImg}>
                        <Image source={Images.profileThree} />
                        <View style={styles.comments}>
                            <AntDesign name='hearto' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 16,}}>62k</Text>
                            <FontAwesome name='comment-o' size={22} color={Constants.colors.whiteColor} />
                            <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,}}>125</Text>
                        </View>
                    </View>
                    <View style={styles.profileBgImg}>
                        <Image source={Images.profileFour} />
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
        marginBottom: 110,
    },
    companyDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    profileBgImg: {
        width: '50%',
        height: 252,
        resizeMode: 'cover',
    },
    comments: {
        flexDirection: 'row',
        position: 'absolute',
        top: 20,
        left: 30,
    },
})

export default Profile