import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    FlatList,
    TextInput,
    Image,
    ActivityIndicator,
} from 'react-native'
import EmojiSelector, { Categories } from 'react-native-emoji-selector'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'
import RenderComments from './RenderComments'
import Images from '../../../assets/images/Images'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import { FlashList } from '@shopify/flash-list'

const ReelsComments = ({userDetails,postDetails}) => {
    const navigation=useNavigation()
    const [loader,setLoader]=useState(false)
    const [commentsData,setcommentsData]=useState([])
    const [showEmoji, setShowEmoji] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState([])
    const [comment, setComment] = useState('')
    const [finalComment, setFinalComment] = useState('')
    const [commentLikeData,setcommentLikeData]=useState([])
    const [commentLoader,setcommentLoader]=useState(false)
    const [commentText,setcommentText]=useState()
    const [SendLoader,setSendLoader]=useState(false)
    const comments = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
    ]
    const addComment = () => {
        setSendLoader(true)
        axios.post(`${Constants.BASE_URL}post/add-comment`,{
            "user_id": userDetails?.id,
            "post_id": postDetails?.id,
            "comment_text":commentText
        })
        .then((response)=>{
            setSendLoader(false)
            getAllComments()
            setcommentText('')
        })
        .catch((error)=>{
            setSendLoader(false)
            showToastmsg("Something went wrong. Please try again")
            console.log("error=>",error);
        })
        
    }
    const deleteComment = (id) => {
        setcommentLoader(true)
        axios.post(`${Constants.BASE_URL}post/${id}/delete-comment`)
        .then((response)=>{
            setcommentLoader(false)
            getAllComments()
        })
        .catch((error)=>{
            setcommentLoader(false)
            showToastmsg("Something went wrong. Please try again")
            console.log("error=>",error);
        })
        
    }
    const addComments = (e) => {
        setComment(e.nativeEvent.text)
        setFinalComment(e.nativeEvent.text)
    }
    const getAllComments=()=>{
        setLoader(true)
        axios.post(`${Constants.BASE_URL}post/read-comment`)
        .then((response)=>{
            setLoader(false)
            if(response.data.length>0){
                setcommentsData(response.data.filter((i)=>i.post_id==postDetails?.id))
            }
        })
        .catch((error)=>{
            setLoader(false)
            showToastmsg("Something went wrong.")
            console.log("errro=>",error);
        })
    }
    const getAllLikes=()=>{
        axios.post(`${Constants.BASE_URL}post/read-comment-lk`)
        .then((response)=>{
            setcommentLikeData(response.data)
        })
        .catch((error)=>{
            console.log("error=>",error);
        })
    }
    useEffect(()=>{
        getAllComments()
     getAllLikes()   
    },[postDetails])
    return (
       
            <View style={{ flex: 1, }}>
                
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar title='Comments' navigation={navigation} />
            {/* <> */}
        {loader?
        <ActivityIndicator color={Constants.colors.primaryColor} size={35}/>
        :
        <>
        <FlashList
                showsVerticalScrollIndicator={false}
                data={commentsData}
                style={{ marginBottom: 40, }}
                renderItem={item => <RenderComments item={item} userDetails={userDetails}
                commentLikeData={commentLikeData}
                getAllLikes={getAllLikes}
                // estimatedItemSize={200}
                />}
                keyExtractor={item => item?.id?.toString()} 
                ListEmptyComponent={<View style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:50}}>
                <Text style={styles.commenters}>No comments found.</Text>
                </View>}
                />
            <View>
                <View style={styles.writeCommentContainer}>
                    <TextInput style={styles.writeComments} placeholder={'Add comment...'} value={commentText} onChangeText={setcommentText} />
                    {/* <Pressable style={styles.emoji} onPress={() => {
                        setShowEmoji(!showEmoji)
                        setFinalComment(finalComment + showEmoji)
                    }}>
                        <Image source={Images.emoji} />
                    </Pressable> */}
                    {SendLoader?
                    <ActivityIndicator/>
                    :
                        <Pressable style={styles.send} onPress={() => addComment()}>
                        <Feather name='send' style={{ padding: 14, fontSize: 22, color: Constants.colors.whiteColor }} />
                        </Pressable>}
                    {/* <Text style={styles.comments}>{finalComment}{selectedEmoji}</Text> */}
                </View>
            </View>
            <View style={{ display: showEmoji ? 'flex' : 'none', position: 'absolute', bottom: 65, width: '100%', left: 0, right: 0, height: 230, backgroundColor: Constants.colors.whiteColor, zIndex: 9999 }}>
                <EmojiSelector onEmojiSelected={emoji => setSelectedEmoji([...selectedEmoji, emoji])} showSearchBar={false} style={{ height: 205, }} />
            </View>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    actionContainer: {

    },
    writeCommentContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: Constants.colors.whiteColor,
    },
    writeComments: {
        width: '85%',
        height: 50,
        // marginTop: 13,
        padding: 6,
        paddingStart: 12,
        paddingRight: 70,
        backgroundColor: '#F9F9F9',
        // color: '#F9F9F9'
    },
    send: {
        backgroundColor: Constants.colors.primaryColor,
        width: '15%',
        // marginTop: 12,
    },
    emoji: {
        position: 'absolute',
        padding: 20,
        right: 60,
        top: 10,
        backgroundColor: Constants.colors.whiteColor,
        zIndex: 9999,
    },
    comments: {
        position: 'absolute',
        left: 12,
        top: 25,
    },
    commenters:{
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize:20
    },
})

export default ReelsComments 