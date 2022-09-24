import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
} from 'react-native'
import Constants from '../../../shared/Constants'

const RenderMyPillar = ({pillars})=>{
    return (
        <View style={styles.wrapper}>
            <View style={styles.cardHeading}>
                <Image source={pillars.item.img} />
                <View style={{alignItems: 'flex-start', marginLeft: 16, marginRight: 16,}}>
                    <Text style={styles.heading}>Robert Phan</Text>
                    <Text style={styles.designation}>Designer</Text>
                </View>
                <View style={styles.ongoingWrapper}>
                    <Text style={styles.onGoing}>Ongoing</Text>
                </View>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.bodyText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
            </View>
            <View style={styles.cardFooter}>
                <Text style={styles.footerText}>Started on: 12/08/2021</Text>
                <Pressable style={styles.btnOutline}>
                    <Text style={styles.btnText}>End Contract</Text>
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
    },
    btnText: {
        fontFamily: Constants.fontFamily,
        fontSize: 14,
        fontWeight: '800',
        color: '#FF0000',
    },
})

export default RenderMyPillar