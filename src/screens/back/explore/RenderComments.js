import React from 'react'
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

const RenderComments = ({item})=>{
    return (
        <View style={styles.container}>
            <Image source={Images.avatar} />
            <View style={{marginLeft: 12}}>
                <Text style={styles.commenters}>Robert Phan</Text>
                <View style={{}}>
                    <Text style={{flexDirection: 'row', width: '60%'}}>
                        <Text style={{fontFamily: Constants.fontFamily,}}><Text style={{fontFamily: Constants.fontFamily, color: Constants.colors.primaryColor}}>@Lorem ipsum</Text>@Lorem ipsum dolor sit amet, consectetur adipiscing elit<Text><Text style={{color: Constants.colors.primaryColor}}>...more</Text></Text></Text>
                    </Text>
                </View>
                <View style={{flexDirection: 'row',}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 12,}}>10 minutes ago</Text>
                    <AntDesign name='hearto' size={20} style={{marginStart: 170,}} />
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