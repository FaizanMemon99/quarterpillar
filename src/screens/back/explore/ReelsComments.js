import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    FlatList,
    TextInput,
    Image,
} from 'react-native'
import EmojiSelector, { Categories } from 'react-native-emoji-selector'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import Feather from 'react-native-vector-icons/Feather'
import RenderComments from './RenderComments'
import Images from '../../../assets/images/Images'

const ReelsComments = ({ navigation }) => {
    const [showEmoji, setShowEmoji] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState([])
    const [comment, setComment] = useState('')
    const [finalComment, setFinalComment] = useState('')
    const comments = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
    ]
    const addComment = () => {
        setShowEmoji(false)
        comments.push({ id: comments.length + 1 })
        setComment('')
        setSelectedEmoji([])
        setFinalComment('')
    }
    const addComments = (e) => {
        setComment(e.nativeEvent.text)
        setFinalComment(e.nativeEvent.text)
    }
    return (
        <View style={{ flex: 1, }}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar title='Comments' navigation={navigation} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={comments}
                style={{ marginBottom: 40, }}
                renderItem={item => <RenderComments item={item} />}
                keyExtractor={item => item?.id?.toString()} />
            <View>
                <View style={styles.writeCommentContainer}>
                    <TextInput style={styles.writeComments} placeholder={!showEmoji ? 'Add comment...' : ''} value={comment} onChange={e => addComments(e)} />
                    <Pressable style={styles.emoji} onPress={() => {
                        setShowEmoji(!showEmoji)
                        setFinalComment(finalComment + showEmoji)
                    }}>
                        <Image source={Images.emoji} />
                    </Pressable>
                    <Pressable style={styles.send} onPress={() => addComment()}><Feather name='send' style={{ padding: 14, fontSize: 22, color: Constants.colors.whiteColor }} /></Pressable>
                    <Text style={styles.comments}>{finalComment}{selectedEmoji}</Text>
                </View>
            </View>
            <View style={{ display: showEmoji ? 'flex' : 'none', position: 'absolute', bottom: 65, width: '100%', left: 0, right: 0, height: 230, backgroundColor: Constants.colors.whiteColor, zIndex: 9999 }}>
                <EmojiSelector onEmojiSelected={emoji => setSelectedEmoji([...selectedEmoji, emoji])} showSearchBar={false} style={{ height: 205, }} />
            </View>
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
        marginTop: 13,
        padding: 6,
        paddingStart: 12,
        paddingRight: 70,
        backgroundColor: '#F9F9F9',
        color: '#F9F9F9'
    },
    send: {
        backgroundColor: Constants.colors.primaryColor,
        width: '15%',
        marginTop: 12,
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
})

export default ReelsComments 