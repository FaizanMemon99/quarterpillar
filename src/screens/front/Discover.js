import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Pressable,
} from 'react-native'
import VideoPlayer from 'react-native-video-player'
import { useNavigation } from '@react-navigation/native'
import Images from '../../assets/images/Images'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import { apiCall } from '../../service/service'
import endPoints from '../../shared/endPoints'
import Loading from '../../components/Loading'

const Discover = () => {

    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        const users = await apiCall('GET', endPoints.USER_TYPES, '', '')
        setUsers(users)
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    const navigation = useNavigation()
    const gotoExploer = () => {
        navigation.navigate('/exploer-registration')
    }
    const gotoBusinessSignup = () => {
        navigation.navigate('/business-login')
    }
    const gotoInfluencer = () => {
        navigation.navigate('/infliencer-signup')
    }
    const gotoAdvertiser = () => {
        navigation.navigate('/advertiser-signup')
    }
    const enterAsAdmin = () => {
        //navigation.navigate('/admin-signin')
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Discover</Text>
            {
                users.users && users.users.length > 0 ? users.users.map(user =>
                    user.role_name !== 'Admin' ? (
                        <Pressable style={{ marginBottom: Constants.margin, }} onPress={user.role_name === 'Explorer' ? gotoExploer : user.role_name === 'Influencer' ? gotoInfluencer : user.role_name === 'Business' ? gotoBusinessSignup : user.role_name === 'Advertiser' ? gotoAdvertiser : null} key={user.id}>
                            <VideoPlayer
                                video={{ uri: user.bg_video }}
                                autoplay
                                loop
                                disableSeek
                                resizeMode={'cover'}
                                customStyles={{
                                    wrapper: {
                                        width: Constants.width,
                                        height: 145,
                                        paddingBottom: Constants.padding,
                                    },
                                    video: {
                                        width: Constants.width,
                                        height: 145,
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
                            <View style={styles.discoverContent}>
                                <View style={styles.menuTextContainer}>
                                    <Text style={styles.menuTitle}>{user.role_name}</Text>
                                    <Text style={styles.menuText}>{user.role_description}</Text>
                                </View>
                                <View style={styles.menuIcon}>
                                    <Image source={user.role_name === 'Explorer' ? Images.explorerIcon : user.role_name === 'Influencer' ? Images.influencerIcon : user.role_name === 'Business' ? Images.businessIcon : user.role_name === 'Advertiser' ? Images.advertizerIcon : null} />
                                </View>
                            </View>
                        </Pressable>
                    ) : null
                ) : <Loading />
            }
            {
                users.users && users.users.length > 0 ? (
                    <Pressable style={styles.enterAsAdmin} onPress={enterAsAdmin}>
                        <Image source={Images.usaerIcon} style={styles.userIcon} />
                        <Text>Enter as Admin</Text>
                    </Pressable>
                ) : null
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    header: {
        color: Constants.colors.primaryColor,
        textAlign: 'center',
        fontSize: 26,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        marginBottom: Constants.margin,
    },
    discoverMenu: {
        height: 145,
        position: 'relative',
        marginBottom: Constants.padding,
    },
    discoverContent: {
        position: 'absolute',
        bottom: Constants.padding,
        justifyContent: 'space-between',
        paddingLeft: Constants.padding + 10,
        paddingRight: Constants.padding + 10,
        flexDirection: 'row',
    },
    menuTextContainer: {
        paddingEnd: 35,
        width: '90%',
    },
    menuTitle: {
        fontFamily: Constants.fontFamily,
        fontSize: 28,
        fontWeight: '800',
        color: Constants.colors.whiteColor,
    },
    menuText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
    menuIcon: {
        marginTop: 20,
        width: '10%',
    },
    enterAsAdmin: {
        flex: 1,
        width: '100%',
        padding: Constants.padding - 6,
        borderWidth: 1,
        borderColor: Constants.colors.primaryColor,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:40
    },
    userIcon: {
        marginRight: 12,
    },
})

export default Discover