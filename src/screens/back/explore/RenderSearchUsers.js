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
import Constants from '../../../shared/Constants'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios'
import { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native'

const RenderSearchUsers = ({ item, searchdata, setSearchData }) => {

    return (
        <View>
            {/* {console.log("see_users-datapass=>", item?.item?.Influencer?.avatar)} */}
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.profileimage} source={{ uri: `${Constants.BASE_IMAGE_URL}${item?.item?.Influencer?.avatar}` }} />
                    <Text style={styles.profilename}>{item?.item?.Influencer?.username}</Text>
                </View>
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
        marginTop: responsiveHeight(5),
        marginLeft: responsiveWidth(6),

    },

})

export default RenderSearchUsers