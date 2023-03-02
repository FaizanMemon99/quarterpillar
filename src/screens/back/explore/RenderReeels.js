import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Modal,
    ActivityIndicator,
    Share,
    ScrollView,
    RefreshControl,
    Button,
    StatusBar,

} from 'react-native'
import Images from '../../../assets/images/Images'
// import VideoPlayer from 'react-native-video-player'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import RenderReelsComment from './RenderReelsComment'
import moment from 'moment/moment'
import axios from 'axios'
import StoriesPage from './StoriesPage'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Video from 'react-native-video'
import DashBoardLoader from '../business/DashBoardLoader'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useRef } from 'react'
import ReelsComments from './ReelsComments'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SearchBar from '../../../components/explore/SearchBar'
import { EventRegister } from 'react-native-event-listeners'
export const emitConfig = { API_CALLING: "API_CALLING", PRODUCT_REMOVED: "product removed" }
//  mujataba App stack
import { AppState } from 'react-native';
import { current } from '@reduxjs/toolkit'
// import { LazyloadView } from 'react-native-lazyload'
//  mujataba App stack

const RenderReeels = ({ item, userDetails, likeData, commentData, getLikeData, setbadgeCount, closePopup, currentindex }) => {
    const [refresh, setrefresh] = useState(false)
    const [like, setLike] = useState(item.item.IsLiked === "No")
    const [loader, setLoader] = useState(false)
    const [followLoader, setfollowLoader] = useState(false)
    const [VideoLoader, setVideoLoader] = useState(false)
    const [videoVar, setvideoVar] = useState()
    const [LikeCount, setLikeCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)
    const [shareCount, setshareCount] = useState(0)
    const [showCommentPopup, setShowCommentPopup] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [doubleTapCounter, setdoubleTapCounter] = useState(0)
    const [follows, setfollows] = useState(true)
    const [islike, setisLike] = useState(false)
    const [save, setsave] = useState(true)
    const [postid, setpostid] = useState('')
    const [currentpostid, setcurrentpostid] = useState()
   
    //  mujataba App stack
    const [appState, setAppState] = useState(AppState.currentState);
    //  mujataba App stack
    // const [postview, setpostview] = useState([])
    const navigation = useNavigation()
    // const [followLoader,setfollowLoader] = useState(false)
    const comments = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
    ]
    const refRBSheet = useRef();
    const gotoMore = () => {
    }

    // mujataba App stack
    useEffect(() => {
        setVideoLoader(true)
        getCartCount()
        setLikeCount(item?.item?.likes)
        setshareCount(item?.item?.share)
        const emitSubscribe = EventRegister.addEventListener(
            emitConfig.API_CALLING, (msg) => {
                getCartCount()
            })
        const removeSubscribe = EventRegister.addEventListener(
            emitConfig.PRODUCT_REMOVED, (msg) => {
                getCartCount()
            });
        const productPurchased = EventRegister.addEventListener(
            emitConfig.PURCHASED, (msg) => {
                getCartCount()
            });
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            EventRegister.removeEventListener(emitSubscribe)
            EventRegister.removeEventListener(removeSubscribe);
            EventRegister.removeEventListener(productPurchased);
            AppState.removeEventListener('change', handleAppStateChange);
        }
    }, [])
    const handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            getCartCount();
        }
        setAppState(nextAppState);
    }

    // mujataba App stack

    //  VIEW OF POSt

    const fetchpostview = () => {
        axios.post(`${Constants.BASE_URL}influencer/influencerPosts-post-view`, {
            user_id: userDetails?.id,
            post_id: item?.item?.id
        })
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const Addfollow = () => {

        axios.post(`${Constants.BASE_URL}influencer/influencerPosts/User/FollowInfluencer`, {
            user_id: userDetails?.id,
            influencer_id: item?.item?.influencer_id,
        }).then((response) => {

            setfollows(true)
            setfollows(!follows)
        })
    }

    const unfollow = () => {
        axios.post(`${Constants.BASE_URL}influencer/influencerPosts/User/UnFollowInfluencer`, {
            user_id: userDetails?.id,
            influencer_id: item?.item?.influencer_id,
        }).then((response) => {

            setfollows(false)
            setfollows(!follows)
        })
    }

    //  VIEW OF POSt    

    const follow = () => {
        setfollowLoader(true)
        setTimeout(() => {
            setfollowLoader(false)
            setfollows(!follows)
        }, 500);
    }

    const gotoProductDetails = () => {
        navigation.navigate('/product-details', {
            productDetails: item.item, userDetails: userDetails,
            LikeCount: LikeCount,
            commentCount: commentCount,
            isLiked: like,
            shareCount: shareCount,
            gotoComments: gotoComments, onShare: onShare,
            removeLikeFn: removeLikeFn,
            addLikeFn: addLikeFn
        })
    }
    const gotoSavedCollection = () => {
        navigation.navigate('/Saved-Collection')
    }

    const gotoDescription = () => {
        navigation.navigate('/product-description')
    }
    const gotoReview = () => {
        navigation.navigate('/explore-review')
    }
    const gotoComments = () => {
        navigation.navigate('/reels-comments', { userDetails: userDetails, postDetails: item?.item })
    }
    const gotoVistelike = () => {
        navigation.navigate('/LikeProfile-Visit', { userDetails: userDetails, postDetails: item?.item?.id })
    }
    const shareFn = () => {

        axios.post(`${Constants.BASE_URL}post/share-post`, {
            post_id: item?.item?.id
        }).then((response) => {
            setshareCount(shareCount + 1)
        })
        // setLike(!like)
    }
    const onShare = async () => {
        try {



            const result = await Share.share({
                message:
                    "Hi, check this awesome " + item?.item?.title + " post " + `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`
                    + JSON.parse(item?.item?.image).map((daata, ind) => (
                        `, ${Constants.BASE_IMAGE_URL + daata} ${ind != (JSON.parse(item?.item?.image) - 1) ? ', ' : null}`
                    ))
                //   +", "+JSON.parse(item?.item?.image).map((imageData,index)=>`${Constants.BASE_IMAGE_URL}${imageData}`+index==JSON.parse(item?.item?.image).length-1?"":", "),
                //   ,url:"http://google.com",
                , title: "Post Share"
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    shareFn()
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const addLikeFn = () => {
        axios.post(`${Constants.BASE_URL}post/add-like`, {
            user_id: userDetails?.id,
            post_id: item?.item?.id
        }).then((response) => {
            setLike(!like)
            // setLike(true)
            setLikeCount(LikeCount + 1)
            getLikeData()
        })
       
    }

    const removeLikeFn = () => {
        axios.post(`${Constants.BASE_URL}post/dis-like`, {
            user_id: userDetails?.id,
            post_id: item?.item?.id
        }).then((response) => {
            setLike(!like)
            // setLike(false)
            setLikeCount(LikeCount - 1)
            getLikeData()
        })

        // 
    }

    const gotoStoriespage = () => {
        // navigation.navigate('/StoriesPage')
        setModalVisible(!modalVisible);
    };


    const getCartCount = () => {
        setVideoLoader(true)
        axios.post(`${Constants.BASE_URL}auth/get-cart-item`, {
            user_id: userDetails?.id
        }).then((response) => {
            if (response.data.data.cart_item && response.data.data.cart_item.length > 0) {
                setbadgeCount(response.data.data.cart_item.length)
            }
        })
            .catch((error) => {
                setbadgeCount(0)
            })
        setLikeCount(item?.item?.likes)
        setshareCount(item?.item?.share)
    }

    // useEffect(() => {
    //     // setLikeCount(likeData.filter((i)=>i.post_id==item?.item?.id).length)
    //     setCommentCount(commentData.filter((i) => i.post_id == item?.item?.id).length)
    //     if (likeData.filter((i) => i.user_id == userDetails?.id && i.post_id == item?.item?.id).length > 0) {
    //         setLike(true)
    //     }
    //     else {
    //         setLike(false);
    //     }
    // }, [likeData, commentData])


    const SavedCollection = async () => {
        await axios.post(`${Constants.BASE_URL}influencer/influencerPosts/User/Save/Post`, {
            user_id: userDetails?.id,
            post_id: item?.item?.id
        }).then((response) => {
            setsave(false)
        })
    }

    const UnSavedCollection = () => {
        axios.post(`${Constants.BASE_URL}influencer/influencerPosts/User/RemoveSavePost`, {
            user_id: userDetails?.id,
            post_id: item?.item?.id
        }).then((response) => {
            setsave(true)
        })
    }

    return (
        <>
            {loader ? <View style={{ display: 'flex', width: Constants.width, height: Constants.height, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} color={'#80FFB9'} style={{ marginTop: 30 }} /></View> :
                <ScrollView onTouchCancel={() => closePopup()}>
                    <StatusBar translucent={true} backgroundColor='black' />


                    <RBSheet
                        height={500}
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            draggableIcon: {
                                backgroundColor: "#000"
                            },
                        }}
                    >
                        <ReelsComments
                            userDetails={userDetails}
                            postDetails={item?.item}
                        />
                    </RBSheet>

                    <Pressable style={{ flex: 1, width: Constants.width, height: Constants.height, zIndex: 999, }}
                        onLongPress={gotoStoriespage}
                        onPress={() => { closePopup(), setpostid(item?.item?.id) }}
                    // onPress={()=> fetchpostview() } 
                    >
                        {/* {console.log("reels_data",item)} */}

                        <View style={[globatStyles.overlay, { zIndex: 9, height: '100%', backgroundColor: 'transparent' }]}>

                        </View>
                        {
                            VideoLoader ?
                                <DashBoardLoader height={Constants.height} /> : null
                        }

                        <View style={styles.iconGroup}>

                            {like ?
                                <AntDesign name={'heart'} style={[styles.icon, { color: '#f54295' }]}

                                    onPress={() => removeLikeFn()}
                                />
                                : null
                            }

                            {!like ?
                                <AntDesign name={'hearto'}
                                    style={[styles.icon, { color: '#FFF' }]}
                                    onPress={() => addLikeFn()}
                                />
                                : null}
                            <Pressable onPress={gotoVistelike} >
                                <Text style={[styles.iconText, {
                                    textAlign: "center",
                                    fontWeight: "900"
                                }]}>{LikeCount ? LikeCount : 0}
                                </Text>
                            </Pressable>
                            <AntDesign name='message1' style={styles.icon}
                                // onPress={gotoComments} 
                                onPress={() => refRBSheet.current.open()}
                            />
                            <Text style={[styles.iconText, {
                                textAlign: "center",
                                fontWeight: "900"
                            }]}>{commentCount ? commentCount : 0}</Text>
                            <Feather name='send' style={styles.icon}
                                onPress={onShare}
                            />
                            <Text style={[styles.iconText, { textAlign: "center", fontWeight: "900" }]}>{shareCount}</Text>

                            {save ?
                                <FontAwesome name='bookmark-o' style={styles.icon}
                                    onPress={SavedCollection}
                                />
                                : null
                            }

                            {!save ?
                                <FontAwesome name='bookmark' style={[styles.icon, { color: '#fff' }]}
                                    onPress={UnSavedCollection}
                                /> : null}
                        </View>

                        <Video
                            source={{ uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}` }}
                            onReadyForDisplay={() => {
                                fetchpostview();
                                setcurrentpostid(item?.item?.id)
                            }}
                            onLoad={() => closePopup()}

                            autoplay
                            repeat={true}
                            loop
                            muted={currentpostid == item?.item?.id ? false : true}
                            disableSeek
                            resizeMode={'cover'}
                            fullscreen
                            style={{ width: "100%", height: "100%" }}
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


                        <View style={styles.productDetailsContainer}>
                            <View style={styles.imgContainer}>
                                <View style={{ height: responsiveHeight(3.5), width: responsiveWidth(17), bottom: 18, right: 10 }}>
                                    <Pressable onPress={() => navigation.navigate('/visit-profile', {
                                        userDetails: item?.item?.influencer_details
                                    })} >
                                        <Image source={
                                            item?.item?.influencer_details?.influencer?.avatar ? {
                                                uri: `${Constants.BASE_IMAGE_URL}${item?.item?.influencer_details?.influencer?.avatar}`
                                            } :
                                                Images.avatar} style={{ marginTop: responsiveHeight(1.4), marginLeft: responsiveWidth(4), width: "65%", height: responsiveHeight(5), borderRadius: responsiveWidth(80), }} />
                                    </Pressable>

                                </View>
                                <Pressable onPress={() => navigation.navigate('/visit-profile', {
                                    userDetails: item?.item?.influencer_details
                                    // userDetails:item?.item?.influencer_name ,
                                })} >

                                    <Text style={styles.titlename}>{item?.item?.influencer_details?.influencer?.name ? item?.item?.influencer_details?.influencer?.name : 'fizaninfluencer'}</Text>
                                </Pressable>


                                {follows ? <Pressable style={globatStyles.followBtn} onPress={Addfollow}>
                                    {/* onPress={follow}
                                    style={globatStyles.followBtn}><Text style={[globatStyles.followBtnText, { fontSize: responsiveFontSize(1.2) }]}>{
                                        follows ? "Following" :
                                            "Follow"}
                                        {followLoader ? <ActivityIndicator size={10} color={"#fff"} /> : ""}
                                    </Text> */}



                                    <Text style={[globatStyles.followBtnText, { fontSize: responsiveFontSize(1.2) }]} >
                                        follow
                                    </Text>



                                </Pressable>
                                    : null
                                }

                                {!follows ? <Pressable style={globatStyles.followBtn} onPress={unfollow}>

                                    <Text style={[globatStyles.followBtnText, { fontSize: responsiveFontSize(1.2) }]} >
                                        Following
                                    </Text>

                                </Pressable>
                                    : null
                                }

                            </View>
                            <Text style={styles.desc}>
                                {item?.item?.description}...<Text onPress={gotoMore}><Text style={styles.moreBtn}>more</Text></Text>
                            </Text>
                            <Text style={styles.minsAgo}>{moment(new Date(item?.item?.created_at)).fromNow()}</Text>
                            {item?.item?.influencer_id === userDetails?.id ? null :
                                <Pressable onPress={gotoProductDetails} style={{
                                    backgroundColor: Constants.colors.primaryColor,
                                    padding: 14,
                                    width: responsiveWidth(83),
                                    borderRadius: responsiveWidth(3),
                                    marginBottom: responsiveHeight(1),
                                    marginTop: responsiveHeight(1),
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}><Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={20} color={Constants.colors.whiteColor} /></Pressable>}
                        </View>

                        <Modal
                            animationType="slide"
                            // transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                //   Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}>
                            <StoriesPage
                                images={item?.item?.image}
                                gotoStoriespage={gotoStoriespage}
                            />
                        </Modal>
                    </Pressable>
                </ScrollView>
            }
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
        right: Constants.padding + 5,
        zIndex: 99,
    },
    icon: {
        marginTop: 8,
        fontSize: responsiveFontSize(3.2),
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
        // marginTop : responsiveHeight(4),
        // paddingBottom: 2,
        opacity: 0.9,
        position: 'absolute',
        width: '92%',
        bottom: 0,
        left: '3%',
        zIndex: 99,
        marginBottom: responsiveHeight(-1),
        borderTopLeftRadius: Constants.borderRadius,
        borderTopRightRadius: Constants.borderRadius,

    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    titlename: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        color: Constants.colors.whiteColor,
        fontSize: responsiveFontSize(2.3),
        marginRight: 15,
        textTransform: 'capitalize',
    },
    desc: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        marginTop: 14,
        marginLeft: responsiveWidth(2)
    },
    moreBtn: {
        color: '#F1F1F1',
        fontFamily: Constants.fontFamily,
    },
    minsAgo: {
        fontSize: 13,
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        marginLeft: responsiveWidth(2)


    },
})

export default RenderReeels