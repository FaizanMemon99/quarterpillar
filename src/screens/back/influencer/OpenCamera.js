import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Pressable,Platform,
    PermissionsAndroid,
} from 'react-native'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import { useNavigation } from '@react-navigation/native'
import globatStyles from '../../../shared/globatStyles'
import Constants from '../../../shared/Constants'
// import { launchCamera } from 'react-native-image-picker'
import {
    launchCamera,
    launchImageLibrary
  } from 'react-native-image-picker';
  import PhotoEditor from '@baronha/react-native-photo-editor'
import VideoPlayer from 'react-native-video-player'

const  OpenCamera=(props)=>{
    const navigation = useNavigation()
    const [cameraImg, setCameraImg]= useState(null)
    const [video, setVideo]= useState(null)
    useEffect(()=>{
        // openCamera()

    },[])
    // const openCamera = async ()=>{
    //     try{
          
	// 		const result = await launchCamera()
	// 		setCameraImg(result.assets[0].uri)
	// 	}
    //     catch(err){
	// 		console.log(err)
	// 	}
    // }
    // const openVideoCamera = async ()=>{
    //     try{
    //         const options = {
    //             title: 'Video Picker', 
    //             mediaType: 'video', 
    //             storageOptions:{
    //               skipBackup:true,
    //               path:'images'
    //             }
    //       };
	// 		const result = await launchCamera(options,(response)=>{
    //             if(response.didCancel){
    //                 console.log('user cancelled');
    //               }else if (response.error) {
    //                 console.log('ERROR'+response.error);
              
    //               }else if (response.customButton) {
    //                 console.log('user tapped'+response.customButton);
    //               }else {
    //                 setValue({
    //                   imagePath: response.uri,
    //                   imageHeight: response.height,
    //                   imageWidth: response.width
    //                 })
    //               }
    //         })
	// 		setCameraImg(result.assets[0].uri)
	// 	}
    //     catch(err){
	// 		console.log(err)
	// 	}
    // }
    const gotoAddPost = ()=>{
        navigation.navigate('/add-post', {img: cameraImg, category: props?.route?.params?.category,productData:props?.route?.params?.productData})
    }
    const editImg = async ()=>{
        try {
            const result = await PhotoEditor.open({path: video.assets[0].uri})
            setCameraImg(result)
        }catch(err){
            console.log(err)
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
            alert('Write permission err', err);
          }
          return false;
        } else return true;
      };
      const captureImage = async (type) => {
        setCameraImg(null)
        setVideo(null)
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
          videoQuality: 'low',
          durationLimit: 30, //Video max duration in seconds
          saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
          launchCamera(options, (response) => {
            console.log('Response = ', response);
     
            if (response.didCancel) {
              alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage);
              return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            if(type=='video'){
                setVideo(response)
            }
            else
            {setCameraImg(response)};
          });
        }
      };
     
      const chooseFile = (type) => {
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setCameraImg(response);
        });
      };


    return (
        <View style={[globatStyles.wrapper,{backgroundColor: '#000000'}]}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} headerRight={false} title={props?.route?.params?.category} isCamera={true} />
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <View style={styles.imgContainer}>
                    {cameraImg&&<Image source={{uri: cameraImg.assets[0].uri}} alt='Img' style={styles.cameraImg} />}
                    {/* {video&&
                    <VideoPlayer
                    video={{ uri: video.assets[0].uri}}
                    autoplay
                    repeat={true}
                    resizeMode={'cover'}
                    customStyles={{
                        wrapper: {
                            width: Constants.width,
                            height: Constants.height,
                            paddingBottom: Constants.padding,
                        },
                        video: {
                            width: Constants.width,
                            height: Constants.height+25,
                        },
                        controls: {
                            display: 'none',
                        },
                        seekBarBackground: {
                            backgroundColor: 'transparent',
                        },
                        seekBarProgress: {
                            backgroundColor: 'transparent',
                        },
                   }} />
                    } */}
                </View>
                <View style={styles.options}>
                    <Text style={styles.retake} onPress={()=>captureImage('video')}>Retake</Text>
                    <Text style={styles.retake} onPress={()=>editImg()}>Edit</Text>
                </View>
                <View style={{padding: Constants.padding}}>
                    <Pressable onPress={gotoAddPost} style={[globatStyles.button, {marginBottom: 20,}]}><Text style={globatStyles.btnText}>Continue</Text></Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cameraImg: {
        width: Constants.width,
        height: 350,
    },
    imgContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    options: {
        padding: Constants.padding,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    retake: {
        fontSize: 20,
        color: Constants.colors.whiteColor,
        fontFamily: Constants.fontFamily,
        marginTop: 20,
    },
})

export default OpenCamera