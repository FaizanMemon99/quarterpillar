import React, { useRef, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Pressable,
    Animated,
    ScrollView,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native'

const Product=(props)=>{
    const [newPost, setNewPost] = useState(false)
    const navigation=useNavigation()
    const [showDrawer, setShowDrawer] = useState(false)
    const [activeMenu, setActiveMenu] = useState('')
    const offsetValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current
    const openPopup = ()=>{
        setNewPost(!newPost)
    }
    const openDrawer = ()=>{
        setShowDrawer(!showDrawer)
    }
    return (
        <View style={globatStyles.wrapper}>
            {
                Animated.timing(scaleValue, {
                    toValue: showDrawer?0.88:1,
                    duration: 300,
                    useNativeDriver: false,
                }).start()
            }
            {
                Animated.timing(offsetValue, {
                    toValue: showDrawer?245:0,
                    duration: 300,
                    useNativeDriver: false,
                }).start()
            }
            <View style={styles.menubg}>
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                <View style={styles.header}>
                    <View style={styles.profileDetails}>
                        <View style={styles.profileIcon}>
                            <Image source={Images.avatar} />
                        </View>
                        <View>
                            <Text style={styles.preofileName}>{props?.route?.params?.userDetails?.advertiser?.name}</Text>
                            <Text style={styles.founder}>{Object.keys(props?.route?.params?.userDetails)[Object.keys(props?.route?.params?.userDetails).length-1]}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.drawerItemContainer}>
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'feather', 'bell', 'Notification', navigation, '/notification')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'feather', 'gift', 'Business List', navigation, '/business-list')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu,'ant', 'setting', 'Settings', navigation, '/settings')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'feather', 'help-circle', 'Help/Support', navigation, '/help-support')
                    }
                    {
                        setMenuItem(setActiveMenu, activeMenu, 'ant', 'infocirlceo', 'About', navigation, '/about')
                    }
                </ScrollView>
                <Pressable
                 onPress={()=>navigation.navigate("/")}
                style={{flexDirection: 'row', margin: 12, marginLeft: 0, marginBottom: 52, backgroundColor: 'rgba(60, 255, 106, 0.47)', padding: 16, width: '62%',}}>
                    <AntDesign name='logout' size={22} color={Constants.colors.whiteColor} />
                    <Text style={{color: Constants.colors.whiteColor, fontFamily: Constants.fontFamily, fontWeight: '700', fontSize: 18, marginLeft: 12,}}>Logout</Text>
                </Pressable>
            </View>
            <Animated.View style={{position: 'absolute', backgroundColor: '#F1F1F1', top: 0, right: 0, bottom: 0, left: 0, borderRadius: showDrawer?30:0, transform: [
                {scale: scaleValue},
                {translateX: offsetValue}
            ]}}>
                <ImageBackground source={Images.productExploer} style={[styles.productDetailsBg, ]}>
                    <CustomAppBar navigation={navigation} isMainscreen={true} isReel={false} headerRight={true} title='' openPopup={openPopup} newPost={newPost} openDrawer={openDrawer} showDrawer={showDrawer} />
                    <View style={styles.overlay}></View>
                    <View style={styles.iconGroup}>
                        <AntDesign name='hearto' style={styles.icon} />
                        <Text style={styles.iconText}>nnk</Text>
                        <AntDesign name='message1' style={styles.icon} />
                        <Text style={styles.iconText}>00n</Text>
                        <Feather name='send' style={styles.icon} />
                        <Text style={styles.iconText}>00n</Text>
                    </View>
                    <View style={styles.productDetailsContainer}>
                        <View style={styles.imgContainer}>
                            <Image source={Images.avatar} style={{marginRight: 20,}} />
                            <Text style={styles.titlename}>Robert Phan</Text>
                            <Pressable style={globatStyles.followBtn}><Text style={globatStyles.btnText}>Follow</Text></Pressable>
                        </View>
                        <Text style={styles.desc}>
                            Lolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lolor sit amet... <Text onPress={()=>gotoMore()} style={styles.moreBtn}>more</Text>
                        </Text>
                        <Text style={styles.ago}>10 minutes ago</Text>
                        <Pressable style={[globatStyles.button,{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between',}]}><Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={20} color={Constants.colors.whiteColor} /></Pressable>
                    </View>
                    {
                        newPost?<View style={[globatStyles.overlay, {zIndex: 999,}]}></View>:null
                    }
                </ImageBackground>
            </Animated.View>
        </View>
    )
}

const setMenuItem=(setActiveMenu, activeMenu, icon, iconName, title, navigation, url)=>{
    return(
        <Pressable style={[styles.drawerItem, {backgroundColor: activeMenu===title?'rgba(60, 255, 106, 0.47)':'transparent', padding: 14,}]} onPress={()=>{
            setActiveMenu(title)
            navigation.navigate(url)
        }}>
            {
                icon==='feather'?<Feather name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='fa5'?<FontAwesome5 name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='ant'?<AntDesign name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='en'?<Entypo name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='oct'?<Octicons name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            {
                icon==='fa'?<FontAwesome name={iconName} size={26} color={Constants.colors.whiteColor} />:null
            }
            <Text style={[styles.menuName]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    menubg: {
        flex: 1,
        backgroundColor: 'rgba(4,56,16,1)',
    },
    mainArea: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    drawerItemContainer: {
        marginTop: 12,
        padding: 12,
        paddingLeft: 0,
        flexGrow: 1,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuName: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontWeight: '700',
        fontSize: 18,
        marginLeft: 12,
    },
    productDetailsBg: {
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
    },
    container: {
        padding: Constants.padding,
    },
    category: {
        position: 'absolute',
        left: 90,
        top: -15,
        backgroundColor: '#BBFFDA',
        color: '#04751F',
        borderRadius: Constants.borderRadius,
        padding: 8,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        zIndex: 99,
    },
    iconGroup: {
        position: 'absolute',
        bottom: Constants.padding+200,
        right: Constants.padding+20,
        zIndex: 99,
    },
    icon: {
        marginTop: 25,
        fontSize: 25,
        color: Constants.colors.whiteColor,
    },
    iconText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 12,
        marginTop: 6,
    },
    productDetailsContainer: {
        padding: Constants.padding,
        opacity: 0.9,
        position: 'absolute',
        width: '94%',
        bottom: 0,
        left: '3%',
        zIndex: 99,
        borderTopLeftRadius: Constants.borderRadius,
        borderTopRightRadius: Constants.borderRadius,
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titlename: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        color: Constants.colors.whiteColor,
        fontSize: 20,
        marginRight: 10,
    },
    desc: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 13.4,
        marginTop: 12,
    },
    moreBtn: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
    },
    ago: {
        fontFamily: Constants.fontFamily,
        fontSize: 12,
        color: Constants.colors.whiteColor,
    },
    header: {
        padding: Constants.padding,
        paddingStart: 12,
        height: 120,
        marginTop: 20,
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#676767',
        width: '62%',
        paddingBottom: Constants.padding,
    },
    profileIcon: {
        borderRadius: Constants.borderRadius,
        borderWidth: 1,
        borderColor: '#000000',
        padding: 8,
        marginEnd: 6,
    },
    preofileName: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '700',
        color: Constants.colors.whiteColor,
        textTransform:'capitalize'
    },
    founder: {
        color: '#424242',
        opacity: 0.78,
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        textTransform:'capitalize'
    },
})

export default Product