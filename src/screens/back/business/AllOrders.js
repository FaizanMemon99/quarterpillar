import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    ScrollView,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import RenderOrders from './RenderOrders'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'


const AllOrders = (props)=>{
    const goBack = ()=>{
        props.navigation.goBack()
    }
    const orders = [
        {
            id: 1,
            img: Images.myPillarIcon,
        },
        {
            id: 2,
            img: Images.myPillarIcon,
        },
        {
            id: 3,
            img: Images.myPillarIcon,
        },
        {
            id: 4,
            img: Images.myPillarIcon,
        },
        {
            id: 5,
            img: Images.myPillarIcon,
        },
        {
            id: 6,
            img: Images.myPillarIcon,
        },
    ]
    return (
        <View style={StyleSheet.wrapper}>
            <SafeAreaView style={{paddingBottom:Constants.padding}}>
            <View style={styles.titleBar}>
                <Pressable onPress={goBack}><AntDesign name='left' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} /></Pressable>
                <Text style={styles.title}>Orders (105)</Text>
                <View style={styles.space}></View>
                <AntDesign name='arrowup' size={20} color={Constants.colors.primaryColor} />
                <Text style={styles.orderNumber}>10</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.normalText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <FlatList
                        style={{marginBottom: 80,}}
                        data={orders}
                        renderItem={item=><RenderOrders pillars={item} />}
                        keyExtractor={item=>item?.id?.toString()}/>
                </View>
            </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    titleBar: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 99,
        paddingBottom: 14,
        paddingStart: 15,
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginStart: 20,
    },
    normalText: {
        fontFamily: Constants.fontFamily,
    },
    space: {
        width: 10,
    },
    orderNumber: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        color: Constants.colors.primaryColor,
        fontWeight: '700',
    },
})

export default AllOrders