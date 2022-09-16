import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    TextInput,
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import globatStyles from '../../../shared/globatStyles'
import SelectDropdown from 'react-native-select-dropdown'

const AddAddress = ({navigation})=>{
    const cities = ['Kolkata', 'Delhi', 'Mumbai', 'Bengaluru', 'Pune']
    const states = ['Uttar Pradesh', 'Maddhya Pradesh', 'Keral', 'West Bengal']
    const gotoAddress = ()=>{
        navigation.navigate('/add-address')
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Add Address' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={{marginTop: 12, paddingBottom: 30,}}>
                    <TextInput style={globatStyles.inputText} placeholder='Name or Tag the Location' />
                    <View>
                        <TextInput style={globatStyles.inputText} placeholder='Your Location' />
                        <FontAwesome name='map-marker-alt' size={22} style={styles.mapIocn} />
                    </View>
                    <TextInput style={globatStyles.inputText} placeholder='Address Line 1' />
                    <TextInput style={globatStyles.inputText} placeholder='Address Line 2' />
                    <TextInput style={globatStyles.inputText} keyboardType='numeric' placeholder='PIN Code' />
                    <SelectDropdown
                        data={cities}
                        defaultButtonText='Select City'
                        buttonStyle={globatStyles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                    }} />
                    <SelectDropdown
                        data={states}
                        defaultButtonText='Select State'
                        buttonStyle={globatStyles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                    }} />
                    <TextInput style={globatStyles.inputText} keyboardType='numeric' placeholder='Landmark' />
                    <Pressable onPress={gotoAddress} style={globatStyles.button}><Text style={globatStyles.btnText}>Add</Text></Pressable>
                </View>
            </ScrollView> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
    },
    wrapper: {
        padding: Constants.padding,
    },
    mapIocn: {
        position: 'absolute',
        top: 12,
        right: 14,
    },
})

export default AddAddress