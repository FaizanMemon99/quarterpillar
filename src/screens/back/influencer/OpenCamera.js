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
  import PhotoEditor from 'react-native-photo-editor'
import VideoPlayer from 'react-native-video-player'

const  OpenCamera=(props)=>{
    const navigation = useNavigation()
    const [cameraImg, setCameraImg]= useState(null)
    const [video, setVideo]= useState(null)
    const gotoAddPost = ()=>{
      if(props?.route?.params?.userDetails?.role_id==3){
        navigation.navigate('/add-post', {video: video, category: props?.route?.params?.category,
          // productData:props?.route?.params?.productData,
          userDetails:props?.route?.params?.userDetails,
          // influencerData:props?.route?.params?.influencerData
      })
      }
        else {navigation.navigate('/add-post', {video: video, category: props?.route?.params?.category,productData:props?.route?.params?.productData,
            userDetails:props?.route?.params?.userDetails,
            influencerData:props?.route?.params?.influencerData
        })}
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
      const captureImage = async () => {
        setCameraImg(null)
        setVideo(null)
        let options = {
          mediaType: 'video',
          maxWidth: 300,
          maxHeight: 550,
          allowsEditing:true,
          quality: 1,
          videoQuality: 'low',
          durationLimit: 10, //Video max duration in seconds
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
              console.log("repsonse video",response);
                setVideo(response)
            // }
            // else
            // {setCameraImg(response)};
          });
        }
      };
     
      const chooseFile = () => {
        let options = {
          mediaType: 'video',
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
        };
        launchImageLibrary(options, (response) => {
        //   console.log('Response = ', response);
     
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
          setVideo(response);
        });
      };
      useEffect(()=>{
        if(!video){captureImage('video')}
    },[])

    return (
        <View style={[globatStyles.wrapper,{backgroundColor: '#000000'}]}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} headerRight={false} title={props?.route?.params?.category} isCamera={true} />
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <View style={styles.imgContainer}>
                    {cameraImg&&<Image source={{uri: cameraImg.assets[0].uri}} alt='Img' style={styles.cameraImg} />}
                    {video&&
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
                    }
                </View>
                <View style={styles.options}>
                    <Text style={styles.retake} onPress={captureImage}>{video?'Retake':'Take'} video</Text>
                    <Text style={styles.retake} onPress={chooseFile}>Select From File</Text>
                </View>
                <View style={{padding: Constants.padding}}>
                    <Pressable onPress={gotoAddPost} style={[globatStyles.button, {marginBottom: 20,}]}
                    disabled={!video}
                    ><Text style={globatStyles.btnText}>Continue</Text></Pressable>
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