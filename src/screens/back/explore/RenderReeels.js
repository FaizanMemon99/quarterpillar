import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    FlatList,
    TextInput,
} from 'react-native'
import Images from '../../../assets/images/Images'
import VideoPlayer from 'react-native-video-player'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import RenderReelsComment from './RenderReelsComment'

const RenderReeels = ({ item }) => {
    const [like, setLike] = useState(false)
    const [showCommentPopup, setShowCommentPopup] = useState(false)
    const navigation = useNavigation()
    const comments = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
    ]
    const gotoMore = () => {

    }
    const follow = () => {
        navigation.navigate('/follow')
    }
    const gotoProductDetails = () => {
        navigation.navigate('/product-details')
    }
    const gotoDescription = () => {
        navigation.navigate('/product-description')
    }
    const gotoReview = () => {
        navigation.navigate('/explore-review')
    }
    const gotoComments = ()=>{
        navigation.navigate('/reels-comments')
    }

    return (
        <>
            <Pressable style={{ flex: 1, width: Constants.width, height: Constants.height, zIndex: 999 }} onPress={gotoProductDetails}>
                <View style={[globatStyles.overlay, { zIndex: 9, height: '103%', }]}></View>
                <VideoPlayer
                    video={{ uri: item.item.video }}
                    autoplay
                    loop
                    disableSeek
                    resizeMode={'cover'}
                    customStyles={{
                        wrapper: {
                            width: '100%',
                            height: '100%',
                            paddingBottom: Constants.padding,
                        },
                        video: {
                            width: '100%',
                            height: '103%',
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
                <View style={styles.iconGroup}>
                    <AntDesign name={like ? 'heart' : 'hearto'} style={[styles.icon, { color: like ? '#f54295' : '#FFF' }]} onPress={() => setLike(!like)} />
                    <Text style={styles.iconText}>nnk</Text>
                    <AntDesign name='message1' style={styles.icon} onPress={gotoComments} />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='send' style={styles.icon} onPress={gotoReview} />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='bookmark' style={styles.icon} onPress={gotoDescription} />
                </View>
                <View style={styles.productDetailsContainer}>
                    <View style={styles.imgContainer}>
                        <Image source={Images.avatar} style={{ marginRight: 20, }} />
                        <Text style={styles.titlename}>Robert Phan</Text>
                        <Pressable onPress={follow} style={globatStyles.followBtn}><Text style={globatStyles.followBtnText}>Follow</Text></Pressable>
                    </View>
                    <Text style={styles.desc}>
                        Lolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lolor...<Text onPress={gotoMore}><Text style={styles.moreBtn}>more</Text></Text>
                    </Text>
                    <Text style={styles.minsAgo}>10 minutes ago</Text>
                    <Pressable style={[globatStyles.button, { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', }]}><Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={20} color={Constants.colors.whiteColor} /></Pressable>
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    left: {
        position: 'absolute',
        right: Constants.margin,
        bottom: 20,
        alignItems: 'center',
        zIndex: 999,
    },
    iconGroup: {
        position: 'absolute',
        bottom: Constants.padding + 200,
        right: Constants.padding + 20,
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
        paddingBottom: 2,
        opacity: 0.9,
        position: 'absolute',
        width: '92%',
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
        fontSize: 25,
        marginRight: 12,
    },
    desc: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        marginTop: 14,
    },
    moreBtn: {
        color: '#F1F1F1',
        fontFamily: Constants.fontFamily,
    },
    minsAgo: {
        fontSize: 13,
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
})

export default RenderReeels