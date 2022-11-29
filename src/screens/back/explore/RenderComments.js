import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
const RenderComments = ({item,userDetails,commentLikeData,getAllLikes})=>{
    // console.log("item=>",item?.item);
    const [like,setLike]=useState(false)
    const addLikeFn=()=>{
        axios.post(`${Constants.BASE_URL}post/add-comment-lk`,{
            user_id:userDetails?.id,
            comment_id:item?.item?.id
        }).then((response)=>{
            setLike(true)
                // setLikeCount(LikeCount+1)
            
                getAllLikes()
        })
        .catch((error)=>{
            showToastmsg("Something went wrong.Please try again")
        })
        
        // setLike(!like)
    }
    const removeLikeFn=async()=>{
        
        if(like){
       await axios.post(`${Constants.BASE_URL}post/${commentLikeData.filter((i)=>i.comment_id==item?.item?.id&&i.user_id==userDetails?.id)[0].id}/delete-comment-lk`).then(async(response)=>{
            getAllLikes()
            setLike(false)
            // if(LikeCount>0){
            //     setLikeCount(LikeCount-1)
            // }
        }).catch((error)=>{
            showToastmsg("Something went wrong.Please try again")
        })
        }
        
        // setLike(false)
    }
   
    useEffect(()=>{
        // getAllLikes()
        if(commentLikeData.filter((i)=>i.comment_id==item?.item?.id&&i.user_id==userDetails?.id).length>0){
            setLike(true)
        }
        else {
            setLike(false)
        }
    },[commentLikeData])
    return (
        <View style={styles.container}>
           <View style={{flex:1,flexDirection:"row"}}>
           <View style={{width:"20%",}}>
            <Image source={Images.avatar} style={{width:"100%",resizeMode:"cover",height:undefined,aspectRatio:1}}/>
            </View>
            <View style={{width:"80%",}}>
            <Text style={styles.commenters}>Robert Phan</Text>
            <View>
            <Text style={{fontFamily: Constants.fontFamily,paddingTop:10}}>
            {/* <Text style={{fontFamily: Constants.fontFamily, color: Constants.colors.primaryColor}}>@Faizan </Text> */}
        {item?.item?.comment_text}
        {/* <Text><Text style={{color: Constants.colors.primaryColor}}>...more</Text></Text> */}
        </Text>
        </View>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
        <Text style={{fontFamily: Constants.fontFamily, fontSize: 12,}}>{moment(new Date(item?.item?.created_at)).fromNow()}</Text>
        {like?
                    <AntDesign name={'heart'} style={[styles.icon, { color:'#f54295' }]} 
                    size={20}
                    onPress={() => removeLikeFn()}
                     />
:null
                    }
                    {!like?
                    <AntDesign name={ 'hearto'} 
                    size={20}
                    // style={[styles.icon, { color:  '#FFF' }]}
                     onPress={() => addLikeFn()}
                      />
                    :null}
        {/* <AntDesign name='hearto' size={20} style={{}} /> */}
        </View>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 3,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
    },
    commenters:{
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
})

export default RenderComments