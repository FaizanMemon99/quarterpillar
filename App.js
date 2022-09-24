import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import {
    StatusBar,
    StyleSheet
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

    useEffect(() => {

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