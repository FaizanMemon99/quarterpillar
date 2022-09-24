import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    TextInput,
} from 'react-native'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const  CreateAudience=(props)=>{
    
    const navigation = useNavigation()
    const gotoLocation = ()=>{
        navigation.navigate('/location')
    }
    const gotoInterests = ()=>{
        navigation.navigate('/interests')
    }
    const gotoAgeAndGender = ()=>{
        navigation.navigate('/age-and-gender')
    }
    const gotoBudget = ()=>{
        navigation.navigate('/budget-and-duration')
    }
    return (
        <View style={globatStyles.wrapper}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} headerRight={false} title='Create Audience' />
            <ScrollView style={styles.container}>
                <Text style={{fontFamily: Constants.fontFamily,}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={styles.boxContainer}>
                    <View>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 20,}}>Estimated Audience Size</Text>
                        <Text style={{fontWeight: '700', fontSize: 20,}}>23,566</Text>
                    </View>
                    <FontAwesome name='users' style={styles.userIcon} />
                </View>
                <TextInput style={globatStyles.inputText} placeholder='Audience Name' />
                <Pressable style={styles.boxContainer} onPress={gotoLocation}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 24,}}>Locations</Text>
                    <FontAwesome name='angle-right' style={styles.userIcon} />
                </Pressable>
                <Pressable style={styles.boxContainer} onPress={gotoInterests}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 24,}}>Interests</Text>
                    <FontAwesome name='angle-right' style={styles.userIcon} />
                </Pressable>
                <Pressable style={styles.boxContainer} onPress={gotoAgeAndGender}>
                    <View>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 20,}}>Age & Gender</Text>
                        <Text style={{fontWeight: '700', fontSize: 20,}}>All | 18 - 80 yr</Text>
                    </View>
                    <FontAwesome name='angle-right' style={styles.userIcon} />
                </Pressable>
                <Pressable style={globatStyles.button} onPress={gotoBudget}><Text style={globatStyles.btnText}>Budget & Duration</Text></Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
    },
    boxContainer: {
        marginTop: Constants.margin,
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginBottom: Constants.margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userIcon: {
        fontSize: 28,
        color: Constants.colors.primaryColor,
    },
})

export default CreateAudience