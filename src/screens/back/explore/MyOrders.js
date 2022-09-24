import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    ScrollView,
    FlatList,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import RenderOrders from './RenderOrders'

const MyOrders =({navigation})=>{
    const [tabs, setTabs] = useState('products')
    const products = [
        {id: 1, name: 'Statue of Boris'},
        {id: 1, name: 'Statue of Boris'},
        {id: 1, name: 'Statue of Boris'},
        {id: 1, name: 'Statue of Boris'},
        {id: 1, name: 'Statue of Boris'},
        {id: 1, name: 'Statue of Boris'},
    ]
    const services = [
        {id: 1, name: 'Statue of Liberty'},
        {id: 1, name: 'Statue of Liberty'},
        {id: 1, name: 'Statue of Liberty'},
        {id: 1, name: 'Statue of Liberty'},
        {id: 1, name: 'Statue of Liberty'},
        {id: 1, name: 'Statue of Liberty'},
    ]
    return (
        <View style={globatStyles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='My Orders' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <View style={styles.tabContainer}>
                    <Pressable onPress={()=>setTabs('products')}><Text style={[styles.tabs, tabs==='products'?styles.activeTabs:null]}>Products</Text></Pressable>
                    <Pressable onPress={()=>setTabs('services')}><Text style={[styles.tabs, tabs==='services'?styles.activeTabs:null]}>Services</Text></Pressable>
                </View>
                <FlatList
                    data={tabs==='products'?products:services}
                    renderItem={item=><RenderOrders item={item} />}
                    style={{paddingBottom: 130,}}
                    keyExtractor={item=>item?.id?.toString()} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        padding: Constants.padding,
    },
    tabContainer: {
        flexDirection: 'row',
        marginTop: Constants.margin,
        marginBottom: Constants.marginBottom,
    },
    tabs: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        marginRight: Constants.margin,
        fontSize: 16,
    },
    activeTabs: {
        color: Constants.colors.primaryColor,
        borderBottomColor: Constants.colors.primaryColor,
    },
})

export default MyOrders 