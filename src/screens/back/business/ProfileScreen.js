import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
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
    TouchableOpacity,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ProfileScreen = (props) => {
    const [showDrawer, setShowDrawer] = useState(false)
    const [loader, setLoader] = useState(false)
    const [userData, setuserData] = useState()
    const navigation = useNavigation()

    const UserType = Object.keys(props.route.params.userDetails)[Object.keys(props.route.params.userDetails).length - 1]
    const openDrawer = () => {
        setShowDrawer(!showDrawer)
    }
    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    const createPost = () => {
        navigation.navigate('/add-product', { userDetails: props?.route?.params?.userDetails })
    }
    useEffect(() => {
        setLoader(true)

        axios.get(`${Constants.BASE_URL}business/get-my-business-profile/${props?.route?.params?.type ? props?.route?.params?.userDetails?.business_id : props?.route?.params?.userDetails?.id}`)
            .then((response) => {
                setLoader(false)
                setuserData(response.data.data.business);
                // console.log("reponse=>", response.data.data.business);
            })
            .catch((error) => {
                console.log("get img error", error.response)
                setLoader(false)
            })
    }, [props?.route?.params])

    return (
        <View style={{ flex: 1 }}>
            <CustomAppBar title={props?.route?.params?.type ? '' : 'Hello!'}
                editable={!props?.route?.params?.type}
                shareble={!props?.route?.params?.type}
                isInfluencer={props?.route?.params?.type}
                type={UserType}
                name={props?.route?.params?.type ? props?.route?.params?.userDetails?.username : props?.route?.params?.userDetails?.name} navigation={navigation} isMainscreen={false} isReel={false} openDrawer={openDrawer} userDetails={props?.route?.params?.userDetails} showDrawer={showDrawer} />
            <View style={styles.container}>
                <ScrollView style={{ marginBottom: 80 }}>
                    <View style={styles.companyDetails}>
                        <Pressable onPress={() => props.navigation.navigate('/edit-user-info', { userDetails: props?.route?.params?.userDetails, type: UserType })}>
                            <Image source={isImage(props?.route?.params?.type ? `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business_profile_pic}` : `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business?.business_profile_pic}`) ?
                                { uri: props?.route?.params?.type ? `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business_profile_pic}` : `${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.business?.business_profile_pic}` } : Images.profileIcon} style={styles.companyLogo} />
                        </Pressable>
                        <View style={styles.companyInfo}>
                            <Text style={styles.email}>{props?.route?.params?.type ? props?.route?.params?.userDetails?.username : props?.route?.params?.userDetails?.name}</Text>
                            <Text style={styles.phone}>{props?.route?.params?.type ? props?.route?.params?.userDetails?.catorige : UserType}</Text>
                        </View>
                    </View>
                    <View style={styles.socialDetails}>
                        <View style={styles.socialContainer}>
                            <Text style={styles.socialValue}>{userData?.products ? userData?.products.length : 0}</Text>
                            <Text style={styles.socialActivity}>Posts</Text>
                        </View>

                        <View style={styles.socialContainer}>
                            <Text style={styles.socialValue}>{userData?.following ? userData?.following : 0}</Text>
                            <Text style={styles.socialActivity}>Following</Text>
                        </View>
                        <View style={{ ...styles.socialContainer, borderRightWidth: 0, }}>
                            <Text style={styles.socialValue}>{userData?.followers ? userData?.followers : 0}</Text>
                            <Text style={styles.socialActivity}>Follower</Text>
                        </View>
                    </View>
                    <View style={styles.divider}></View>
                    {loader ?
                        <ActivityIndicator size={30} />
                        : <>
                            <View style={styles.profileSection}>
                                {userData?.products?.length > 0 ?
                                    <FlashList
                                        data={userData?.products}
                                        keyExtractor={(item, index) => index?.toString()}
                                        numColumns={2}
                                        estimatedItemSize={2}
                                        renderItem={item => (
                                            <View style={styles.profileBgImg} >
                                                <Pressable
                                                    onPress={() => {
                                                        props?.route?.params?.type ?
                                                        navigation.navigate
                                                            ('/open-camera', { userDetails: props?.route?.params?.userDetails, category: props?.route?.params?.userDetails?.catorige, productData: item?.item }
                                                            ) : null
                                                    }}
                                                >
                                                    <Image
                                                        source={{ uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.product_image)[0]}` }}
                                                        style={{ width: "100%", height: "100%" }}
                                                    />
                                                </Pressable>
                                                {/* {console.log("item=>",item?.item)} */}
                                                {/* <Image source={Images.profileOne} style={{width:'100%',height:"100%"}}/> */}
                                                <View style={styles.comments}>
                                                    <AntDesign name='dropbox' size={15} color={Constants.colors.whiteColor} style={{ fontWeight: "900" }} />
                                                    <Text style={{
                                                        fontFamily: Constants.fontFamily, color: Constants.colors.whiteColor, marginStart: 8, marginEnd: 10,
                                                        fontSize: 15, fontWeight: "800"
                                                    }}>
                                                        {item?.item?.qty ? item?.item?.qty : 0}
                                                    </Text>
                                                    <FontAwesome name='rupee' size={15} color={Constants.colors.whiteColor} style={{ fontWeight: "900" }} />
                                                    <Text style={{
                                                        fontFamily: Constants.fontFamily, color: Constants.colors.whiteColor, marginStart: 8,
                                                        fontSize: 15, fontWeight: "800"
                                                    }}>{item?.item?.sales_price ? item?.item?.sales_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</Text>
                                                </View>

                                            </View>
                                        )}
                                    />
                                    :
                                    <View style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
                                        <Text style={[styles.socialValue, { color: '#000' }]}>
                                            No post found
                                        </Text>
                                        {props?.route?.params?.type ? null : <Pressable onPress={createPost}><Text style={[styles.menuName, { color: 'blue', fontSize: 14, textDecorationLine: 'underline', paddingTop: 10 }]}>Create Post</Text></Pressable>}
                                    </View>

                                }
                            </View>
                        </>}
                </ScrollView>

            </View>
            {!props?.route?.params?.type &&
                <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer} activeTab='profile'
                    propValue={props?.route?.params?.userDetails}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
        paddingLeft: 0,
        paddingRight: 0,
        // marginBottom: 130,
    },
    companyDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    companyLogo: {
        padding: Constants.padding + 12,
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
        textTransform: 'capitalize'
    },
    phone: {
        fontFamily: Constants.fontFamily,
        marginTop: 8,
        color: '#A4A4B2',
        fontSize: 20,
        textTransform: 'capitalize'
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
        alignItems: 'center',
    },
    socialContainer: {
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
        // paddingBottom:200
    },
    profileBgImg: {
        width: '100%',
        height: 252,
        resizeMode: 'cover',
    },
    comments: {
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
        // left: 30,
    },
})

export default ProfileScreen