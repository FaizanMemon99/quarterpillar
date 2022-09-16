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
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import RenderMyRequest from './RenderMyRequest'

const MyRequest = ({navigation})=>{

    const [tabs, setTabs] = useState('product')
    const products = [
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
    const services = [
        {
            id: 1,
            img: Images.usaerIcon,
        },
        {
            id: 2,
            img: Images.usaerIcon,
        },
        {
            id: 3,
            img: Images.usaerIcon,
        },
        {
            id: 4,
            img: Images.usaerIcon,
        },
        {
            id: 5,
            img: Images.usaerIcon,
        },
        {
            id: 6,
            img: Images.usaerIcon,
        },
    ]
    return (
        <View style={StyleSheet.wrapper}>
            <CustomAppBar navigation={navigation} isMainscreen={true} isReel={false} title='My Request' />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.myPillarText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <View style={styles.tabs}>
                        <Pressable onPress={()=>setTabs('product')}>
                            <Text style={{...styles.tabText, color: tabs==='product'?Constants.colors.primaryColor:null, fontWeight: tabs==='product'?'800':'400', textDecorationColor: tabs==='product'?Constants.colors.primaryColor: 'transparent'}}>Products</Text>
                            {tabs==='product'?<View style={styles.activeTab}></View>:<View style={{...styles.activeTab, backgroundColor: 'transparent'}}></View>}
                        </Pressable>
                        <Pressable onPress={()=>setTabs('service')}>
                            <Text style={{...styles.tabText, color: tabs==='service'?Constants.colors.primaryColor:null, fontWeight: tabs==='service'?'800':'400', textDecorationColor: tabs==='service'?Constants.colors.primaryColor: 'transparent'}}>Services</Text>
                            {tabs==='service'?<View style={styles.activeTab}></View>:<View style={{...styles.activeTab, backgroundColor: 'transparent'}}></View>}
                        </Pressable>
                    </View>
                    <FlatList
                        style={{marginBottom: 80,}}
                        data={tabs==='product'?products:services}
                        renderItem={item=><RenderMyRequest pillars={item} />}
                        keyExtractor={item=>item?.id?.toString()}/>
                </View>
            </ScrollView>
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
    myPillarText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Constants.padding,
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        marginRight: Constants.margin+12,
    },
    activeTab: {
        height: 3,
        width: '60%',
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 6,
    },
})

export default MyRequest