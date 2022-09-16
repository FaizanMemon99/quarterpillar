import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Pressable,
    TextInput,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import RenderUserList from './RenderUserList'
import AntDesign from 'react-native-vector-icons/AntDesign'

const UserManagement=(props)=>{
    const [addUser, setAddUser] = useState(false)
    const userType = ['influencer', 'Normal user']
    const userList = [
        {
            id: 1,
            isActive: true,
        },
        {
            id: 2,
            isActive: true,
        },
        {
            id: 3,
            isActive: false,
        },
        {
            id: 4,
            isActive: true,
        },
    ]
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='User Management'  />
            <ScrollView style={styles.container}>
                <Text style={styles.infoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                <View style={styles.header}>
                    <Text style={[styles.headingText]}></Text>
                    <Text style={styles.headingText}>User</Text>
                    <Text style={[styles.headingText, {marginLeft: '26%',}]}>Role</Text>
                    <Text style={[styles.headingText, {marginLeft: '24%'}]}>Status</Text>
                </View>
                <FlatList
                    data={userList}
                    renderItem={item=><RenderUserList data={item} />}
                    keyExtractor={item=>item?.id?.toString()}/>
                    {
                        !addUser?<Pressable style={styles.addUserBtn} onPress={()=>setAddUser(true)}><Text style={styles.btnText}>Add User</Text></Pressable>:(
                            <View style={{marginTop: Constants.margin,}}>
                                <Text style={styles.headingAddUser}>Add User</Text>
                                <TextInput style={globatStyles.inputText} placeholder='User Name' />
                                <SelectDropdown
                                    data={userType}
                                    defaultButtonText='Assign the Role'
                                    buttonStyle={globatStyles.dropDownBox}
                                    buttonTextStyle={globatStyles.dropdownTextStyle}
                                    rowTextStyle={globatStyles.dropDownListStyle}
                                    renderDropdownIcon={()=><AntDesign name='down' />}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                }} />
                                <Pressable style={globatStyles.button}><Text style={globatStyles.btnText}>Add</Text></Pressable>
                            </View>
                        )
                    }
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
    infoText: {
        fontFamily: Constants.fontFamily,
    },
    header: {
        marginTop: Constants.margin,
        flexDirection: 'row',
    },
    headingText: {
        fontFamily: Constants.fontFamily,
        marginLeft: Constants.margin+2,
    },
    userList: {
        marginTop: Constants.margin,
        flexDirection: 'row',
        marginBottom: Constants.margin,
    },
    showInline: {
        flexDirection: 'row',
    },
    userName: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
    },
    editIcon: {
        marginRight: 18,
    },
    codContainer: {
        flexDirection: 'row',
    },
    addUserBtn: {
        borderWidth: 1,
        borderColor: Constants.colors.primaryColor,
        padding: 10,
        borderRadius: Constants.borderRadius,
        width: '50%',
        marginTop: 12,
    },
    btnText: {
        color: Constants.colors.primaryColor,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        alignSelf: 'center',
    },
    headingAddUser: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        fontSize: 26,
        margin: 12,
    },
})

export default UserManagement