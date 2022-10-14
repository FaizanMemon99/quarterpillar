import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'
import Constants from '../../../shared/Constants'

const ProfileScreen=(props)=>{
    const [showDrawer, setShowDrawer] = useState(false)
    const [loader,setLoader]=useState(false)
    const [businessImage,setBusinessImage]=useState([])
    const [productImages,setproductImages]=useState([])
    const navigation=useNavigation()
    
    const UserType=Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length-1]
    const openDrawer = ()=>{
        setShowDrawer(!showDrawer)
    }
    console.log("props values",props?.route?.params?.userDetails);
    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
      useEffect(()=>{
        setLoader(true)
        setBusinessImage([])
        setproductImages([])
        axios.get(props?.route?.params?.type?`${Constants.BASE_URL}business/get-product-details/${props?.route?.params?.userDetails?.business_id}`:`${Constants.BASE_URL}business/get-product-details/${props?.route?.params?.userDetails?.business?.business_id}`)
        .then((response)=>{
            setLoader(false)
            if(response.data[0].user_product.length>0){
                setBusinessImage(response.data[0].user_product)
                response.data[0].user_product.map((item)=>{
                    productImages.push(`${Constants.BASE_IMAGE_URL}${JSON.parse(item.product_image)[0]}`)
                })
                setproductImages([...productImages])
            }
        })
        .catch((error)=>{
            console.log("get img error",error.response)
            setBusinessImage([])
            setLoader(false)
        })
      },[props])
      useEffect(()=>{
        console.log("images val",productImages.map((item)=>typeof(item)));
      },[productImages])
    return (
        <View style={{flex:1}}>
        <CustomAppBar title={props?.route?.params?.type?'':'Hello!'} isInfluencer={props?.route?.params?.type?true:false} type={UserType} editable={props?.route?.params?.type?false:true} name={props?.route?.params?.type?props?.route?.params?.userDetails?.username:props?.route?.params?.userDetails?.name} navigation={navigation} isMainscreen={false} isReel={false} openDrawer={openDrawer} userDetails={props?.route?.params?.userDetails} showDrawer={showDrawer}/>           
        <View style={styles.container}>
         <ScrollView style={{paddingBottom:10}}>
         <View style={styles.companyDetails}>
         <Image source={isImage(props?.route?.params?.type?`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business_profile_pic}`:`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business?.business_profile_pic}`)?
                            {uri:props?.route?.params?.type?`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business_profile_pic}`:`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business?.business_profile_pic}`}:Images.profileIcon} style={styles.companyLogo} />
                    <View style={styles.companyInfo}>
                        <Text style={styles.email}>{props?.route?.params?.type?props?.route?.params?.userDetails?.username:props?.route?.params?.userDetails?.name}</Text>
                        <Text style={styles.phone}>{props?.route?.params?.type?props?.route?.params?.userDetails?.catorige:UserType}</Text>
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
               {loader?
               <ActivityIndicator/>
               :
            //     <View style={styles.profileSection}>
            //        {
            //         productImages.map((item,i)=>{
            //             <View key={i+1}>
            //             <Image source={{uri:item}} 
            //             style={styles.profileBgImg} />
            //             </View>
            //             // :
            //             // <Image source={Images.profileOne} 
            //             // style={styles.profileBgImg} />
            //         })
            //        }
            //    </View>
            <View style={[styles.profileSection,{paddingBottom:props?.route?.params?.type&&100}]}>
                    {
                        productImages?productImages.map((img,i)=>(
                            <>
                                {props?.route?.params?.type?<Pressable onPress={()=>navigation.navigate('/open-camera',{category:props?.route?.params?.userDetails?.catorige,productData:img})} style={{width:'50%'}}>
                                <Image source={{uri: img}} alt='Img' style={styles.profileBgImg} />
                                </Pressable>:
                                <Image source={{uri: img}} alt='Img' style={styles.profileBgImg} />
                            }
                            </>
                            )
                        ):null
                    }
                    </View>
               }
            </ScrollView>
           
        </View>
      {!props?.route?.params?.type&&
        <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer} activeTab='profile'
                propValue={props?.route?.params?.userDetails}
                />}
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
        paddingBottom:200
    },
    profileBgImg: {
        width: '100%',
        height: 280,
        resizeMode: 'cover',
    },
})

export default ProfileScreen