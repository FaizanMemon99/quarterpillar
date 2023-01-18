import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput } from 'react-native-gesture-handler'
const RenderComments = ({ item, userDetails, commentLikeData, getAllLikes }) => {
    // console.log("item=>",item?.item);
    const [like, setLike] = useState(false)
    const refRBSheet = useRef();
    const [showreply, setshowreply] = useState(true);
    const [replydata, setReplydata] = useState([]);

    const additem = () => {
        setSendLoader(true)
        axios.post(`${Constants.BASE_URL}post/add-comment-rly`, {
            "user_id": userDetails?.id,
            "post_id": postDetails?.id,
            "comment_text": commentText
        })
            .then((response) => {
                setSendLoader(false)
                getAllComments()
                setcommentText('')
            })
            .catch((error) => {
                setSendLoader(false)
                showToastmsg("Something went wrong. Please try again")
                console.log("error=>", error);
            })
setReplydata([...replydata])
    }

    const addLikeFn = () => {
        axios.post(`${Constants.BASE_URL}post/add-comment-lk`, {
            user_id: userDetails?.id,
            comment_id: item?.item?.id
        }).then((response) => {
            console.log("like", response.data)
            setLike(true)
            // setLikeCount(LikeCount+1)

            getAllLikes()
        })
            .catch((error) => {
                showToastmsg("Something went wrong.Please try again")
            })

        // setLike(!like)
    }
    const removeLikeFn = async () => {

        if (like) {
            await axios.post(`${Constants.BASE_URL}post/${commentLikeData.filter((i) => i.comment_id == item?.item?.id && i.user_id == userDetails?.id)[0].id}/delete-comment-lk`).then(async (response) => {
                console.log("dislike", response.data)
                getAllLikes()
                setLike(false)
                // if(LikeCount>0){
                //     setLikeCount(LikeCount-1)
                // }
            }).catch((error) => {
                showToastmsg("Something went wrong.Please try again")
            })
        }

        // setLike(false)
    }

    useEffect(() => {
        // getAllLikes()
        if (commentLikeData.filter((i) => i.comment_id == item?.item?.id && i.user_id == userDetails?.id).length > 0) {
            setLike(true)
        }
        else {
            setLike(false)
        }
    }, [commentLikeData])
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: "20%", }}>
                    <Image source={Images.avatar} style={{ width: "100%", resizeMode: "cover", height: undefined, aspectRatio: 1 }} />
                </View>
                <View style={{ width: "80%", }}>
                    <Text style={styles.commenters}>Robert Phan</Text>
                    <View>
                        <Text style={{ fontFamily: Constants.fontFamily, paddingTop: 10 }}>
                            {/* <Text style={{fontFamily: Constants.fontFamily, color: Constants.colors.primaryColor}}>@Faizan </Text> */}
                            {item?.item?.comment_text}
                            {/* <Text><Text style={{color: Constants.colors.primaryColor}}>...more</Text></Text> */}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 12, }}>{moment(new Date(item?.item?.created_at)).fromNow()}</Text>

                        <Pressable onPress={() => refRBSheet.current.open()}>
                            <Text>reply</Text>
                        </Pressable>



                        {like ?
                            <AntDesign name={'heart'} style={[styles.icon, { color: '#f54295' }]}
                                size={20}
                                onPress={() => removeLikeFn()}
                            />
                            : null
                        }

                        {!like ?
                            <AntDesign name={'hearto'}
                                size={20}
                                // style={[styles.icon, { color:  '#FFF' }]}
                                onPress={() => addLikeFn()}
                            />
                            : null}
                        {/* <AntDesign name='hearto' size={20} style={{}} /> */}

                    </View>


                    {/*  */}
                    {/* reply on comment  */}

                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}

                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            draggableIcon: {
                                backgroundColor: "#000"
                            }
                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 10 }}>
                            <Text style={{ marginRight: 2, marginTop: 3 }}>@RobertPhan</Text>
                            <TextInput
                                style={styles.replyinput}
                                onChangeText={setReplydata}
                                value={replydata}
                                placeholder="reply to comment"
                            />

                            <Pressable onPress={() => additem()}>
                                <Text>post</Text>
                            </Pressable>
                        </View>
                    </RBSheet>

                    {showreply ? (

                        <Pressable onPress={() => {
                            setshowreply(false)

                        }}>

                            <Text style={{ fontSize: 12, opacity: 0.5 }}> Show Reply</Text>
                        </Pressable>

                    ) : <ScrollView>
                        <View>
                            <Text style={styles.item}>{replydata}</Text>
                        </View>
                        <Pressable onPress={() => setshowreply(true)}>
                            <Text style={{ fontSize: 12, opacity: 0.5 }}> hide replies</Text>
                        </Pressable>
                    </ScrollView>}

                    {/* <--reply on comment -->  */}

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
    commenters: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    replyinput: {

        width: '70%',

    }
})

export default RenderComments