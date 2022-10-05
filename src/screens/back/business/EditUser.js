import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
    TextInput,
} from 'react-native'
import DatePicker from 'react-native-date-picker'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import Fontisto from 'react-native-vector-icons/Fontisto'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import Dialog, { SlideAnimation, DialogContent,DialogTitle } from 'react-native-popup-dialog';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'

const EditUser = (props)=>{
    const [cameraImg, setCameraImg] = useState(null)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [gender,setGender] = useState('m')
    const [visible,setvisible]=useState(false)
    const navigation = useNavigation()
    
    console.log('data val',props?.route?.params);
    const gotoUserManagement = ()=>{
        navigation.navigate('/user-management')
    }
    const openCamera = async ()=>{
		try{
			const result = await launchCamera()
            console.log("images",result.assets[0])

			setCameraImg(result.assets[0])
            setvisible(false)
            // setCameraImg([...cameraImg])
		}
        catch(err){
			console.log("err")
		}
    }
    const choosePhotoFromLibrary = async ()=>{
		try{
			const result = await launchImageLibrary()
console.log("folder image",result.assets[0]);
			setCameraImg(result.assets[0])
            setvisible(false)
		}
        catch(err){
			console.log("err")
		}
    }
    const removeImg = ()=>{
        setCameraImg()
    }
    useEffect(()=>{
        
        axios.get(`${Constants.BASE_IMAGE_URL}${props?.route?.params?.userDetails?.influencer?.avatar}`, { responseType:"stream" })
    .then((response)=> {
        if(props?.route?.params?.type=='influencer')
        {setCameraImg({"fileName":props?.route?.params?.userDetails?.influencer?.avatar.split('/')[props?.route?.params?.userDetails?.influencer?.avatar.split('/').length-1], "fileSize": response.headers['content-length'], "height": 177, "type": response.headers['content-type'], "uri": Constants.BASE_IMAGE_URL+props?.route?.params?.userDetails?.influencer?.avatar, "width": 285})}
    });
    },[])
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Edit User Info' />
            <Dialog
    visible={visible}
    onTouchOutside={()=>setvisible(!visible)}
    onHardwareBackPress={()=>setvisible(!visible)}
    dialogTitle={<DialogTitle title="Profile Image" />}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
  >
    <DialogContent>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                            <Pressable style={styles.cameraContainerinner} onPress={openCamera}>
                                <Image source={Images.cameraIcon} alt='Img' />
                                <Text style={styles.addCameraText}>Add</Text>
                            </Pressable>
                             <Pressable style={[styles.cameraContainerinner,{marginLeft:10}]} onPress={choosePhotoFromLibrary}>
                             <Feather name="folder-plus" />
                             <Text style={styles.addCameraText}>Add</Text>
                         </Pressable>
                         </View>
    </DialogContent>
  </Dialog>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.editText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                </View>
                <View style={styles.container}>
                {
                    cameraImg?(
                        <View style={styles.cameraContainer}>
                            <Pressable onPress={()=>setvisible(!visible)}>
                            <Image source={{uri: cameraImg.uri}} alt='Img' style={styles.logo} />
                            </Pressable>
                            <Pressable onPress={removeImg} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                        </View>
                    ):(
                        <Pressable style={styles.cameraContainer} onPress={()=>setvisible(!visible)}>
                            <Image source={Images.userInfoLogo} style={styles.logo} />
                            <Image source={Images.cameraIcontTwo} style={styles.cameraIcon} />
                        </Pressable>
                    )
                }
                    <View>
                        <Text style={globatStyles.inputLabel}>Name</Text>
                        <TextInput style={globatStyles.inputText} value='Tanveer Inamdar' />
                    </View>
                    <View>
                        <Text style={globatStyles.inputLabel}>Email</Text>
                        <TextInput style={globatStyles.inputText} value='tanveerinamdar@gmail.com' />
                    </View>
                    <View>
                        <Text style={globatStyles.inputLabel}>Phone Number</Text>
                        <TextInput style={globatStyles.inputText} value='+91 9827336473' />
                    </View>
                    <View>
                        <Text style={globatStyles.inputLabel}>Gender</Text>
                        <View style={styles.gender}>
                            {
                                gender==='m'?<Fontisto name='radio-btn-active' onPress={()=>setGender('m')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('m')} />
                            }<Text style={styles.genderLabel}> Male</Text>
                            {
                                gender==='f'?<Fontisto name='radio-btn-active' onPress={()=>setGender('f')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('f')} />
                            }<Text style={styles.genderLabel}> Female</Text>
                            {
                                gender==='o'?<Fontisto name='radio-btn-active' onPress={()=>setGender('o')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('o')} />
                            }<Text style={styles.genderLabel}> Others</Text>
                        </View>
                        <View>
                            <Text style={globatStyles.inputLabel}>Age</Text>
                            <TextInput style={globatStyles.inputText} value='35 yrs' />
                        </View>
                        <View>
                            <Text style={globatStyles.inputLabel}>DOB</Text>
                            <Pressable style={[globatStyles.inputText,{height: 50,}]} onPress={()=>setOpen(true)}><Text></Text></Pressable>
                            <DatePicker
                                modal
                                mode='date'
                                open={open}
                                date={date}
                                onDateChange={setDate}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </View>
                        <Pressable onPress={gotoUserManagement} style={globatStyles.button}><Text style={globatStyles.btnText}>Save</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles= StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
    },
    editText: {
        fontFamily: Constants.fontFamily,
    },
    logo: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin+30,
        borderWidth: 2,
        width: 175,
        height: 175,
    },
    cameraIcon: {
        position: 'absolute',
        top: '75%',
        left: '45%',
        width: 42,
        height: 32,
    },
    cameraImgContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    removeImg: {
        position: 'absolute',
        right: 85,
        top: 10,
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Constants.colors.whiteColor,
    },
    gender: {
        flexDirection: 'row',
    },
    genderIcon:{
        fontSize: 24,
        marginTop: 10,
    },
    genderLabel: {
        marginLeft: 8,
        marginRight: Constants.margin+12,
        marginTop: 10,
    },
    cameraContainerinner: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
})

export default EditUser