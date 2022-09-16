import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
} from 'react-native'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'

const RenderMyRequest = ({pillars})=>{
    return (
        <View style={styles.wrapper}>
            <View style={styles.cardHeading}>
                <Image source={Images.myPillarIcon} />
                <View style={{alignItems: 'flex-start', marginLeft: 16, marginRight: 16,}}>
                    <Text style={styles.heading}>Robert Phan</Text>
                    <Text style={styles.designation}>Designer</Text>
                </View>
                <View style={styles.ongoingWrapper}>
                    <Text style={styles.onGoing}>Ongoing</Text>
                </View>
            </View>
            <View style={styles.cardFooter}>
                <Pressable style={[styles.btnOutline, {borderColor: Constants.colors.primaryColor}]}>
                    <Text style={[styles.btnText, {color: Constants.colors.primary}]}>Accept</Text>
                </Pressable>
                <Pressable style={styles.btnOutline}>
                    <Text style={styles.btnText}>Reject</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        marginBottom: Constants.margin,
        borderRadius: 16,
    },
    cardHeading: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    heading: {
        fontSize: 22,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
    },
    designation: {
        color: '#A4A4B2',
        fontFamily: Constants.fontFamily,
        fontWeight: '500',
        fontSize: 18,
    },
    ongoingWrapper: {
        padding: 5,
        borderRadius: Constants.borderRadius,
        backgroundColor: '#80FFB9',
    },
    onGoing: {
        color: '#04751F',
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '800'
    },
    cardBody: {
        marginTop: 16,
        marginBottom: 16,
    },
    bodyText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerText: {
        fontFamily: Constants.fontFamily,
        color: '#747474',
        fontSize: 14,
    },
    btnOutline: {
        padding: 8,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF0000',
        borderRadius: Constants.borderRadius,
        width: '48%',
    },
    btnText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '800',
        color: '#FF0000',
        alignSelf: 'center',
    },
})

export default RenderMyRequest