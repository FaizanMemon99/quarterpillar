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
import moment from 'moment/moment'
import axios from 'axios'
import StoriesPage from './StoriesPage'
import { responsiveFontSize, responsiveHeight , responsiveWidth  } from 'react-native-responsive-dimensions'

const RenderReeels = ({ item ,userDetails,likeData,commentData,getLikeData}) => {
    
    const [like, setLike] = useState(false)
    const [loader,setLoader]=useState(false)
    const [followLoader, setfollowLoader] = useState(false)
    const [videoVar,setvideoVar]=useState()
    const [LikeCount,setLikeCount]=useState(0)
    const [commentCount,setCommentCount]=useState(0)
    const [showCommentPopup, setShowCommentPopup] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [doubleTapCounter,setdoubleTapCounter]=useState(0)
    const [follows,setfollows]=useState(false)
    const navigation = useNavigation()
    // const [followLoader,setfollowLoader] = useState(false)
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
        setfollowLoader(true)
        setTimeout(() => {
            setfollowLoader(false)
            setfollows(!follows)            
        }, 500);
    }
    const gotoProductDetails = () => {
        navigation.navigate('/product-details',{productDetails:item.item,userDetails:userDetails,
        LikeCount:LikeCount,
        commentCount:commentCount,
        isLiked:like,
        gotoComments:gotoComments,onShare:onShare,
        removeLikeFn:removeLikeFn,
        addLikeFn:addLikeFn
        })
    }
    const gotoDescription = () => {
        navigation.navigate('/product-description')
    }
    const gotoReview = () => {
        navigation.navigate('/explore-review')
    }
    const gotoComments = ()=>{
        navigation.navigate('/reels-comments',{userDetails:userDetails,postDetails:item?.item})
    }
    const onShare = async () => {
        try {
            console.log("post data=>",item?.item);
          const result = await Share.share({
            message:
              "Hi, check this awesome "+item?.item?.title +" post "+`${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`
              +JSON.parse(item?.item?.image).map((daata,ind)=>(
                `, ${Constants.BASE_IMAGE_URL+daata} ${ind!=(JSON.parse(item?.item?.image)-1)?', ':null}`
              ))
            //   +", "+JSON.parse(item?.item?.image).map((imageData,index)=>`${Constants.BASE_IMAGE_URL}${imageData}`+index==JSON.parse(item?.item?.image).length-1?"":", "),
            //   ,url:"http://google.com",
              ,title:"Post Share"
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    const addLikeFn=()=>{
        axios.post(`${Constants.BASE_URL}post/add-like`,{
            user_id:userDetails?.id,
            post_id:item?.item?.id
        }).then((response)=>{
            setLike(true)
                setLikeCount(LikeCount+1)
            
            getLikeData()
        })
        
        // setLike(!like)
    }
    const removeLikeFn=async()=>{
        if(likeData.filter((i)=>i.user_id==userDetails?.id&&i.post_id==item?.item?.id).length>0){
       await axios.post(`${Constants.BASE_URL}post/${likeData.filter((i)=>i.user_id==userDetails?.id&&i.post_id==item?.item?.id)[0].id}/delete-like`,{
            user_id:userDetails?.id,
            post_id:item?.item?.id
        }).then(async(response)=>{
             getLikeData()
            setLike(false)
            if(LikeCount>0){
                setLikeCount(LikeCount-1)
            }
        })
        }
        
        // setLike(false)
    }
    const gotoStoriespage = () => {
        // navigation.navigate('/StoriesPage')
        setModalVisible(!modalVisible);
    };
    // const gotoBuy=()=>{
    //     navigation.navigate('/cart')
    // }
// navigate to guide screen 
    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate('/GuideScreen')
        }, 20000);

    },[])
// 
    useEffect(()=>{
        setLoader(true)
        setvideoVar(null)
        // console.log("video var",JSON.parse(item?.item?.video)[0]);
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
    useEffect(()=>{
        setLikeCount(likeData.filter((i)=>i.post_id==item?.item?.id).length)
        setCommentCount(commentData.filter((i)=>i.post_id==item?.item?.id).length)
        if(likeData.filter((i)=>i.user_id==userDetails?.id&&i.post_id==item?.item?.id).length>0){
            // console.log("user data");
            setLike(true)
        }
        else {
            setLike(false);
        }
    },[likeData,commentData])
    const handleClick = (e) => {
        switch (e.detail) {
          case 1:
            console.log("click");
            break;
          case 2:
            console.log("double click");
            break;
          case 3:
            console.log("triple click");
            break;
        }
      };
    return (
        <>
        {loader?<View style={{display:'flex',width:Constants.width,height:Constants.height,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={30} color={'#80FFB9'} style={{marginTop:30}}/></View>:
            <Pressable style={{ flex: 1, width: Constants.width, height: Constants.height+22, zIndex: 999, }} 
            onLongPress={gotoStoriespage}
            onPress={handleClick}
            >
                <View style={[globatStyles.overlay, { zIndex: 9, height: '103%',backgroundColor:'transparent' }]}></View>
                {videoVar?<VideoPlayer
                    video={videoVar}
                    autoplay
                    repeat={true}
                    loop
                    muted
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
                    {like?
                    <AntDesign name={'heart'} style={[styles.icon, { color:'#f54295' }]} onPress={() => removeLikeFn()} />
                    :null
                    }
                    {!like?
                    <AntDesign name={ 'hearto'} style={[styles.icon, { color:  '#FFF' }]} onPress={() => addLikeFn()} />
                    :null}
                    {/* <AntDesign name={like ? 'heart' : 'hearto'} style={[styles.icon, { color: like ? '#f54295' : '#FFF' }]} onPress={() => addLikeFn()} /> */}
                    <Text style={[styles.iconText,{position:"relative",left:"40%"}]}>{LikeCount?LikeCount:0}</Text>
                    <AntDesign name='message1' style={styles.icon} 
                    onPress={gotoComments} 
                    />
                    <Text style={[styles.iconText,{position:"relative",left:"40%"}]}>{commentCount?commentCount:0}</Text>
                    <Feather name='send' style={styles.icon} 
                    onPress={onShare}
                     />
                    {/* <Text style={styles.iconText}>00n</Text> */}
                    <Feather name='bookmark' style={styles.icon} 
                    onPress={gotoDescription} 
                    />
                </View>
                <View style={styles.productDetailsContainer}>
                    <View style={styles.imgContainer}>
                    <View style={{height:responsiveHeight(2),width:responsiveWidth(17),bottom:18,right:10}}>
                        <Image source={Images.avatar} style={{ marginRight: 20, }} />
                        </View>
                        <Text style={styles.titlename}>{item?.item?.influencer_name?item?.item?.influencer_name:'faizaninfluencer'}</Text>
                        

                        <Pressable 
                        onPress={follow}
                         style={globatStyles.followBtn}><Text style={[globatStyles.followBtnText,{fontSize:responsiveFontSize(1.2)}]}>{
                         follows?"Following":
                         "Follow"}
                         {followLoader?<ActivityIndicator size={10} color={"#fff"}/>:""}
                         </Text></Pressable>
                    </View>
                    <Text style={styles.desc}>
                        {item?.item?.description}...<Text onPress={gotoMore}><Text style={styles.moreBtn}>more</Text></Text>
                    </Text>
                    <Text style={styles.minsAgo}>{moment(new Date(item?.item?.created_at)).fromNow()}</Text>
                    <Pressable onPress={gotoProductDetails} style={{
                                backgroundColor: Constants.colors.primaryColor,
                                padding: 14,
                                width: responsiveWidth(83),
                                borderRadius: responsiveWidth(3),
                                marginBottom: responsiveHeight(1),
                                
                                 marginTop: responsiveHeight(1),
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                                
                                }}><Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={20} color={Constants.colors.whiteColor} /></Pressable>
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
        fontSize: responsiveFontSize(3.5),
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
        marginBottom:responsiveHeight(-2),
        borderTopLeftRadius: Constants.borderRadius,
        borderTopRightRadius: Constants.borderRadius,
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center"
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
        marginLeft : responsiveWidth(2)
    },
    moreBtn: {
        color: '#F1F1F1',
        fontFamily: Constants.fontFamily,
    },
    minsAgo: {
        fontSize: 13,
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        marginLeft : responsiveWidth(2)


    },
})

export default RenderReeels