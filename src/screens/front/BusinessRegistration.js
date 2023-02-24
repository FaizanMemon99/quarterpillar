import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Image,
    ActivityIndicator,
    PermissionsAndroid,
    Modal
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import Constants from '../../shared/Constants'
import globatStyles from '../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import showToastmsg from '../../shared/showToastmsg'
import { apiCall } from '../../service/service'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import Images from '../../assets/images/Images'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Dialog, { SlideAnimation, DialogContent, DialogTitle } from 'react-native-popup-dialog';

const BusinessRegistration = (props) => {
    const [companyName, setCompanyName] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [cameraImg, setCameraImg] = useState()
    const [buttonLoader, setButtonLoader] = useState(false)
    const [emailId, setEmailId] = useState('')
    const [businessemailId, setBusinessEmailId] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassowrd] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showCPass, setShowCPass] = useState(false)
    const [address, setAddress] = useState('')
    const [city, setcity] = useState('')
    const [state, setstate] = useState('')
    const [aadharNo, setaadharNo] = useState('')
    const [gstNo, setgstNo] = useState('')
    const categories = ['Xyz', 'abc', 'xyz123', 'abc123']
    const [isgst, setisgst] = useState('No')
    const [businessType, setbusinessType] = useState("Product")
    const [businessDocId, setbusinessDocId] = useState(1)
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setvisible] = useState(false);
    // const years = [ '20012', '2013', '2015', '2016', '2017' ]
    const usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailIdPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const navigation = useNavigation()
    const userRegistration = async () => {
        if (!cameraImg) {
            showToastmsg('Please add avatar image')
        }
        else if (companyName === '' || companyName === null) {
            showToastmsg('Please enter company name')
        }
        else if (ownerName === '' || ownerName === null) {
            showToastmsg('Please enter owner name')
        }
        else if (subCategory === '' || subCategory === null) {
            showToastmsg('Please select a subcategory')
        }
        else if (emailId === '' || emailId === null) {
            showToastmsg('Please enter email ID')
        }
        else if (!emailIdPattern.test(emailId)) {
            showToastmsg('Please enter valid email id')
        }
        else if (businessemailId === '' || businessemailId === null) {
            showToastmsg('Please enter business email ID')
        }
        else if (!emailIdPattern.test(businessemailId)) {
            showToastmsg('Please enter valid business email id')
        }
        else if (PhoneNumber === '' || PhoneNumber === null) {
            showToastmsg('Please enter phone number')
        }
        else if (PhoneNumber.length < 10) {
            showToastmsg('Please enter 10 digit phone number')
        }
        else if (aadharNo === '' || aadharNo === null) {
            showToastmsg('Please enter aadhar number')
        }
        else if (aadharNo.length < 12) {
            showToastmsg('Please enter valid aadhar number')
        }
        else if (address === '' || address === null) {
            showToastmsg('Please enter address')
        }
        else if (state === '' || state === null) {
            showToastmsg('Please enter state')
        }
        else if (city === '' || city === null) {
            showToastmsg('Please enter city')
        }

        // else if(year==='' && year===null){
        //     showToastmsg('Please select a yesr')
        // }
        else if (isgst === "Yes" && (gstNo === '' || gstNo === null)) {
            showToastmsg("Please enter gst number")
        }
        else if (isgst === "Yes" && !(gstPattern.test(gstNo))) {
            showToastmsg("Please enter valid gst number")
        }
        else if (username === '' || username === null) {
            showToastmsg('Username cannot be empty')
        }
        
        // else if(!usernamePattern.test(username)){
        //     showToastmsg('Username should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        // }


        else if (password === '' || password === null) {
            showToastmsg('Please enter your password')
        }
        else if (!usernamePattern.test(password)) {
            showToastmsg('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        }
        else if (confirmPassowrd === '' || confirmPassowrd === null) {
            showToastmsg('Please enter confirm password')
        }
        else if (password !== confirmPassowrd) {
            showToastmsg('Password did not match')
        }
        else {
            setButtonLoader(true)
            const headers = {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
            }
            var formdata = new FormData();
            formdata.append("catorige", props.route.params.category);
            formdata.append("company_name", companyName);
            formdata.append("owner_name", ownerName);
            formdata.append("business_email", businessemailId);
            formdata.append("owner_email", emailId);
            formdata.append("owner_phone", PhoneNumber);
            formdata.append("owner_adhar", aadharNo);
            formdata.append("business_doc_id", businessDocId);
            formdata.append("has_gst", isgst === "Yes" ? gstNo : "");
            formdata.append("business_password", password);
            formdata.append("business_address", address);
            formdata.append("username", username);
            formdata.append("is_product", businessType === "Product");
            formdata.append("is_service", businessType === "Service");
            formdata.append("city", city);
            formdata.append("state", state);
            formdata.append("country", "India");
            formdata.append("is_biz_email_verified", "false");
            formdata.append("is_owner_email_verified", "false");
            formdata.append("is_phone_no_verified", "false");
            formdata.append("is_adhar_verifed", "false");
            formdata.append("is_business_doc_verfied", "false");
            formdata.append("is_gst_verfied", "false");
            formdata.append('profile_avatar', { uri: cameraImg.uri, name: cameraImg.fileName, type: cameraImg.type });
            formdata.append("sub_catorige", subCategory);
            formdata.append("age", "40");
            formdata.append("gender", "male");

            axios.post(`${Constants.BASE_URL}business/registration`, formdata, {
                headers: headers
            }).then((response) => {
                console.log("form_data=>", response.data)
                showToastmsg(response.data.msg)
                if (response.status == 200) {

                    try {
                        axios.post(`${Constants.BASE_URL}auth/mobile-number`, { mobile_number: PhoneNumber }).then((res) => {
                            console.log("res-data=>", res.data.response)
                            if (res.data.response == 200) {
                                setButtonLoader(false)
                                // console.log("data values", response.data.data.user_details);
                                navigation.navigate('/business-otp', { userDetails: response.data.data.user_details, phoneNumber: PhoneNumber, userType: props.route.params.type })
                                // navigation.navigate('/influencer-stack-navigation',{userDetails:res.data.data.user_details.influencer})   

                                showToastmsg(res.data.msg)
                                console.log("mobile otp value", res.data.data.otp)
                            }
                            else {
                                setButtonLoader(false)
                                showToastmsg(res.msg)
                            }

                        }).catch((err) => {
                            setButtonLoader(false)
                            console.log("phone number otp error", err)
                        })


                    } catch (error) {
                        setButtonLoader(false)
                        console.log(error)
                        showToastmsg('Registration failed')
                    }
                }
                else {
                    setButtonLoader(false)
                    showToastmsg('Registration failed')
                }
            }).catch((err) => {
                showToastmsg('Registration failed')
                setButtonLoader(false)
                console.log("influencer registration error", err.response);
            })
        }
    }
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };
    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                console.log('Write permission err', err);
            }
            return false;
        } else return true;
    };


    const choosePhotoFromLibrary = async () => {
        try {
            const result = await launchImageLibrary()
            console.log("folder image", result.assets[0]);
            setCameraImg(result.assets[0])
            setvisible(false)
        }
        catch (err) {
            console.log("err")
        }
    }
    const openCamera = async () => {
        setCameraImg(null)
        setvisible(false)
        let options = {
            mediaType: 'photo',
            //   maxWidth: 300,
            //   maxHeight: 550,
            //   quality: 1,
            //   videoQuality: 'low',
            //   durationLimit: 30, //Video max duration in seconds
            saveToPhotos: false,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                // console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    console.log('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    console.log('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    console.log(response.errorMessage);
                    return;
                }
                // if(type=='video'){
                console.log("repsonse image", response);
                setCameraImg(response.assets[0])
                // }
                // else
                // {setCameraImg(response)};
            });
        }
    };

    const removeImg = () => {
        setCameraImg()
    }
    const businessDocarray = ["With GST", "With Shopact License", "With MCA"]
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.wrapper}>
                <Text style={styles.heading}>Business Registration</Text>
                <Text style={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <Text style={styles.heading}>Avatar image</Text>
                <Dialog
                    visible={visible}
                    onTouchOutside={() => setvisible(!visible)}
                    onHardwareBackPress={() => setvisible(!visible)}
                    dialogTitle={<DialogTitle title="Profile Image" />}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >

                    <DialogContent>
                        {
                            cameraImg ? (
                                <>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', padding: Constants.padding, }}>


                                        <View style={styles.cameraContainer}>

                                            <Image source={{ uri: cameraImg.uri }} alt='Img' style={{
                                                width: '100%',
                                                height: 100,
                                                resizeMode: 'contain',
                                                margin: 5, marginBottom: 20
                                            }} />
                                            <Pressable onPress={() => removeImg()} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>

                                        </View>

                                    </View>
                                    {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                    <Image source={Images.cameraIcon} alt='Img' />
                                    <Text style={styles.addCameraText}>Add more</Text>
                                </Pressable>
                                 <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                 <Feather name="folder-plus" style={{fontSize:20}}/>
                                 <Text style={styles.addCameraText}>Add more</Text>
                             </Pressable>
                             </View> */}
                                </>
                            ) : (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                    <Image source={Images.photocamera} alt='Img' style={{ height: 40, width: 40 }} />
                                    {/* <Text style={styles.addCameraText}>Add</Text> */}
                                </Pressable>
                                <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                    <FontAwesome5 name="folder-plus" size={35} />
                                    {/* <Text style={styles.addCameraText}>Add</Text> */}
                                </Pressable>
                            </View>
                            )
                        }
                    </DialogContent>
                </Dialog>

                {
                    cameraImg ? (
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', padding: Constants.padding, }}>

                            <View style={styles.cameraContainer}>
                                <Image source={{ uri: cameraImg.uri }} alt='Img' style={{
                                    width: '100%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 5, marginBottom: 20
                                }} />
                                <Pressable onPress={() => removeImg()} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>

                            </View>

                        </View>
                    ) : (<Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setvisible(!visible)}
                    >
                        <Image
                            style={{ height: 60, width: 60, marginTop: '7%', marginBottom: '2%', alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}
                            source={Images.Avatarprofile}
                        />
                        <Text style={{
                            alignContent: 'center', alignSelf: 'center', alignItems: 'center', color: '#007635', fontWeight: '700', marginBottom: '2%'
                        }}>Upload profile</Text>
                    </Pressable>)

                }


                <TextInput placeholder='Company Name' style={globatStyles.inputText} onChangeText={text => setCompanyName(text)} />
                <TextInput placeholder='Owner Name' style={globatStyles.inputText} onChangeText={text => setOwnerName(text)} />
                <SelectDropdown
                    data={categories}
                    defaultButtonText='Sub-Select Category'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setSubCategory(selectedItem)
                    }} />

                <TextInput keyboardType={'email-address'} placeholder='Email ID' style={globatStyles.inputText} onChangeText={text => setEmailId(text)} />
                <TextInput keyboardType={'email-address'} placeholder='Business Email ID' style={globatStyles.inputText} onChangeText={text => setBusinessEmailId(text)} />
                <TextInput keyboardType={'phone-pad'} style={globatStyles.inputText} maxLength={10} placeholder='Phone number' onChangeText={(e) => setPhoneNumber(e)} />
                <TextInput keyboardType={'numeric'} maxLength={12} style={globatStyles.inputText} placeholder='Aadhar Number' onChangeText={(e) => setaadharNo(e)} />
                <TextInput style={globatStyles.inputText} placeholder='Address' onChangeText={(e) => setAddress(e)} />
                <TextInput style={globatStyles.inputText} placeholder='State' onChangeText={(e) => setstate(e)} />
                <TextInput style={globatStyles.inputText} placeholder='City' onChangeText={(e) => setcity(e)} />
                <Text style={styles.subHeading}>
                    How do you want to verify your business
                </Text>
                <SelectDropdown
                    data={businessDocarray}
                    defaultButtonText='Business verification'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    defaultValue={businessDocarray[businessDocId - 1]}
                    onSelect={(index) => {
                        setbusinessDocId(index + 1)
                    }} />
                <Text style={styles.subHeading}>
                    Has Gst
                </Text>
                <SelectDropdown
                    data={["Yes", "No"]}
                    defaultButtonText='Has Gst'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    defaultValue={isgst}
                    onSelect={(selectedItem, index) => {
                        setisgst(selectedItem)
                    }} />
                {isgst === "Yes" &&
                    <TextInput placeholder='Gst number *' style={globatStyles.inputText}
                        defaultValue={gstNo}
                        onChangeText={text => setgstNo(text)} />
                }
                <Text style={styles.subHeading}>
                    Business Type
                </Text>
                <SelectDropdown
                    data={["Product", "Service"]}
                    defaultButtonText='Business Type'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    defaultValue={businessType}
                    onSelect={(selectedItem, index) => {
                        setbusinessType(selectedItem)
                    }} />

                <TextInput placeholder='Username' style={globatStyles.inputText} onChangeText={text => setusername(text)} />
                <View style={{ flex: 1, width: '100%', justifyContent: "center", position: "relative" }}>
                    <TextInput style={globatStyles.inputText} placeholder='Create Password' onChangeText={text => setPassword(text)} secureTextEntry={!showPass} />
                    <FontAwesome name={showPass ? 'eye-slash' : 'eye'} style={styles.eyeIcon} onPress={() => setShowPass(!showPass)} />
                </View>
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', position: "relative" }}>
                    <TextInput style={globatStyles.inputText} placeholder='Confirm Password' onChangeText={text => setConfirmPassowrd(text)} secureTextEntry={!showCPass} />
                    <FontAwesome name={showCPass ? 'eye-slash' : 'eye'} style={styles.eyeIcon} onPress={() => setShowCPass(!showCPass)} />
                </View>
                <Pressable style={[globatStyles.button, { marginTop: 10 }]}
                    onPress={!buttonLoader && userRegistration}
                // onPress={()=>navigation.navigate('/business-otp')}
                >{buttonLoader ? <ActivityIndicator size={20} color={Constants.colors.whiteColor} /> : <Text style={globatStyles.btnText}>Next</Text>}</Pressable>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        paddingTop: 28,
        flex: 1,
        backgroundColor: Constants.colors.bodyBg,

    },
    heading: {
        fontSize: 24,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        marginTop: 12,
    },
    subHeading: {
        fontSize: 14,
        fontFamily: Constants.fontFamily,
        marginTop: 18,
        marginBottom: Constants.padding,
    },
    eyeIcon: {
        position: 'absolute',
        top: 15,
        right: 25,
        color: '#999999',
        fontSize: 24,
    },
    cameraContainer: {

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
        margin: 20,
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
        left: 80,
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
    removeIcon: {
        fontSize: 16,
        color: Constants.colors.inputBgColor,
    },
    addCameraText: {
        marginTop: 10,
        color: '#007635',
        fontWeight: '700'
    },
    modalView: {
        marginTop: '18%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 37,
        shadowColor: "#000",
        right: 3,

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})


export default BusinessRegistration