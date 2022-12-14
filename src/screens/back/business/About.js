import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'

const About = (props)=>{
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={true} isReel={false} title='About' />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.aboutSection}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <Text style={styles.aboutSection}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
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
        padding: Constants.padding,
    },
    aboutSection: {
        marginTop: Constants.margin,
        fontFamily: Constants.fontFamily,
    },
})

export default About