import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    // FlatList,
    // TextInput,
    
    ActivityIndicator,
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

import axios from 'axios'

const RenderReeels = ({ item ,userDetails}) => {
    
    const [like, setLike] = useState(false)
    const [loader,setLoader]=useState(false)
    const [videoVar,setvideoVar]=useState()
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
        navigation.navigate('/product-details',{productDetails:item.item,userDetails:userDetails})
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
    // const gotoBuy=()=>{
    //     navigation.navigate('/cart')
    // }
    useEffect(()=>{
        setLoader(true)
        setvideoVar(null)
        console.log("video var",JSON.parse(item?.item?.video)[0]);
        axios.get(`${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`, { responseType:'stream' })
        .then((response)=> {
            setvideoVar({
                "bitrate": 154604, "duration": 1, 
                "fileName": JSON.parse(item?.item?.video)[0], 
                "fileSize": response.headers["content-length"], "height": 320, "type": "video/mp4", 
                "uri": `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`, 
                "width": 240
                })
            // setTimeout(() => {
                setLoader(false)        
            // }, 1000);    
            
    
            // setvideoVar(`${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`)
        }).catch((err)=>{setLoader(false)})
    },[])
    return (
        <>
        {loader?<View style={{display:'flex',width:Constants.width,height:Constants.height,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={30} color={'#80FFB9'} style={{marginTop:30}}/></View>:
            <Pressable style={{ flex: 1, width: Constants.width, height: Constants.height+22, zIndex: 999, }} 
            onPress={gotoProductDetails}
            >

                <View style={[globatStyles.overlay, { zIndex: 9, height: '103%',backgroundColor:'transparent' }]}></View>
                {videoVar?<VideoPlayer
                    video={videoVar}
                    autoplay
                    repeat={true}
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
                    }} />:null}
                <View style={styles.iconGroup}>
                    <AntDesign name={like ? 'heart' : 'hearto'} style={[styles.icon, { color: like ? '#f54295' : '#FFF' }]} onPress={() => setLike(!like)} />
                    <Text style={styles.iconText}>nnk</Text>
                    <AntDesign name='message1' style={styles.icon} 
                    // onPress={gotoComments} 
                    />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='send' style={styles.icon} 
                    // onPress={gotoReview}
                     />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='bookmark' style={styles.icon} 
                    // onPress={gotoDescription} 
                    />
                </View>
                <View style={styles.productDetailsContainer}>
                    <View style={styles.imgContainer}>
                        <Image source={Images.avatar} style={{ marginRight: 20, }} />
                        <Text style={styles.titlename}>{item?.item?.influencer_name?item?.item?.influencer_name:'faizaninfluencer'}</Text>
                        <Pressable 
                        // onPress={follow}
                         style={globatStyles.followBtn}><Text style={globatStyles.followBtnText}>Follow</Text></Pressable>
                    </View>
                    <Text style={styles.desc}>
                        {item?.item?.description}...<Text onPress={gotoMore}><Text style={styles.moreBtn}>more</Text></Text>
                    </Text>
                    <Text style={styles.minsAgo}>10 minutes ago</Text>
                    <Pressable onPress={gotoProductDetails} style={[globatStyles.button, { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', }]}><Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={20} color={Constants.colors.whiteColor} /></Pressable>
                </View>
            </Pressable>}
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
        textTransform:'capitalize'
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