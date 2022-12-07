import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Pressable,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RenderShareAndEarn from './RenderShareAndEarn'
import RenderShareAndEarnShared from './RenderShareAndEarnShared'
import { FlashList } from '@shopify/flash-list'

const ShareAndEarn = ({ navigation }) => {
    const [tabs, setTabs] = useState('latest')
    const latest = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]
    const shared = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]
    const successMsg = ()=>{
        navigation.navigate('/share-success')
    }
    return (
        <View>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Share & Earn' />
            <ScrollView style={styles.container}>
                <Text style={{ fontFamily: Constants.fontFamily, }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <View style={styles.earningDetails}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, }}>Earnings</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 24, fontWeight: '700', marginTop: 10, marginBottom: 10, }}><FontAwesome name='rupee' size={22} /> 12,001</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, fontWeight: '700', color: Constants.colors.primaryColor }}><AntDesign name='arrowup' size={18} /> 5.86 %</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 22, }}>Views</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 24, fontWeight: '700', marginTop: 10, marginBottom: 10, }}> 23,43,432</Text>
                        <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, fontWeight: '700', color: Constants.colors.primaryColor }}><AntDesign name='arrowup' size={18} /> 5.86 %</Text>
                    </View>
                </View>
                <Text style={{fontFamily: Constants.fontFamily, fontSize: 22, marginTop: 12,}}>Campaign List</Text>
                <View style={[styles.tabs, {justifyContent: 'flex-start'}]}>
                    <Pressable onPress={()=>setTabs('latest')}><Text style={[styles.tabTextProduct, {color: tabs==='latest'?Constants.colors.primaryColor:'#000000', textDecorationLine: tabs==='latest'?'underline':'none'}]}>Latest</Text></Pressable>
                    <Pressable onPress={()=>setTabs('shared')}><Text style={[styles.tabTextProduct, {color: tabs==='shared'?Constants.colors.primaryColor:'#000000', textDecorationLine: tabs==='shared'?'underline':'none'}]}>Shared</Text></Pressable>
                </View>
                <FlashList
                    data={tabs==='latest'?latest:shared}
                    renderItem={item =>tabs==='latest'?<RenderShareAndEarn item={item} successMsg={successMsg} />:<RenderShareAndEarnShared item={item} />}
                    keyExtractor={item => item?.id?.toString()}
                    estimatedItemSize={200} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 110,
        padding: Constants.padding,
    },
    earningDetails: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#00A92866',
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.margin,
    },
    tabTextProduct: {
        fontFamily: Constants.fontFamily,
        paddingStart: Constants.padding,
        colors: 'rgba(0, 169, 40, 0.15)',
        marginRight: 0,
        fontWeight: '700',
        fontSize: 16,
    },
})

export default ShareAndEarn