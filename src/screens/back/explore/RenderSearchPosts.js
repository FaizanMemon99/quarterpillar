import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Pressable,
    Image
} from 'react-native'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Constants from '../../../shared/Constants';
import { useNavigation } from '@react-navigation/native'
import Video from 'react-native-video';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const RenderSearchPosts = ({ item }) => {
    const image = item?.item?.product_image
    console.log("this images on post", image);

    // const [first, setfirst] = useState(JSON.parse(item?.item?.product_image))
    // console.log("this images on post",first);
    return (
        <View>
            {console.log("Post_page=>", item)}
            {console.log("Post_page verification=>", item?.item?.product_name)}
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.profilename}>{item?.item?.product_name}</Text>
                </View>
                <Image style={styles.productimage} source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.item?.product_image}` }} />
           </View>
        </View>
    )
}
const styles = StyleSheet.create({

    profileimage: {
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(4),
        width: responsiveHeight(7),
        height: responsiveHeight(7),
        borderRadius: responsiveWidth(80)
    },
    profilename: {
        color: "black",
        marginTop: responsiveHeight(5),
        marginLeft: responsiveWidth(6),
    },
    productimage:{
        height:200,
        width:200
    }

})

export default RenderSearchPosts
{/* <Video
                    source={{ uri: `${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}` }}
                    // onLoad={(e)=>console.log("onload",e)}
                    // onBandwidthUpdate={()=>console.log("bandwidht")}
                    // onBuffer={()=>console.log("buffering...")}
                    // onReadyForDisplay={(e)=>console.log("ready display",e)}
                    autoplay
                    repeat={true}
                    loop
                    muted
                    disableSeek
                    // onVideoBuffer={(e)=>console.log("bueeee",e)}
                    resizeMode={'cover'}
                    style={{ width: "100%", height: "100%" }}
                /> */}
{/* <Image style={styles.profileimage} source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.item?.Influencer?.avatar}` }} /> */ }