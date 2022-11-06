import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import {
    Platform,
    StyleSheet,
    PermissionsAndroid
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import AuthNavigation from './src/navigations/AuthNavigation'
import DrawerNavigationBusiness from './src/navigations/DrawerNavigationBusiness'
import DrawerNavigationExplore from './src/navigations/DrawerNavigationExploer'
import Constants from './src/shared/Constants'
import { Provider } from 'react-redux'
import store from './src/shared/store'

const App = () => {

    const [auth, setAuth] = useState('')
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
      const PermissionFunction=async()=>{
        await requestCameraPermission()
        await requestExternalWritePermission()
      }
    useEffect(() => {
        PermissionFunction()
        SplashScreen.hide()

    }, [])

    const authentication = (type) => {

        setAuth(type)

    }
    return (
        <Provider store={store}>
            <NavigationContainer style={styles.container}>
                {auth === 'business' ? <DrawerNavigationBusiness /> :
                    auth === 'explore' ? <DrawerNavigationExplore /> :
                        <AuthNavigation authentication={(type) => authentication(type)} />}
            </NavigationContainer>
        </Provider>

    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.colors.primary
    }
})
export default App