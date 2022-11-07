import messaging from "@react-native-firebase/messaging"
import AsyncStorage from "@react-native-async-storage/async-storage"
import PushNotification from "react-native-push-notification";
export async function requestUserPermission(){
    const authStatus=await messaging().requestPermission();
    const enabled=
    authStatus===messaging.AuthorizationStatus.AUTHORIZED||
    authStatus===messaging.AuthorizationStatus.PROVISIONAL;
    if(enabled){
        console.log("Auth status=>",authStatus);
    }
}

async function GetFCMToken(){
let fcmtoken=await AsyncStorage.getItem("fcmtoken");
console.log("fcm token old",fcmtoken);
if(!fcmtoken){
    try {
        const fcmtoken= await messaging().getToken();
        if(fcmtoken){
            console.log("fcm token new",JSON.stringify(fcmtoken));
            await AsyncStorage.setItem("fcmtoken",fcmtoken);
        }
    } catch (error) {
        console.log("error in generating fcmtoken=>",error);
    }
}
}
export async function DisplayNotification(remoteMessage){
    const channelId= await notifee
}
export const NotificationListener=()=>{
    GetFCMToken()
    messaging().onNotificationOpenedApp(remoteMessage=>{
        console.log("Notification caused app to open from background:",remoteMessage.notification);
        
    });
    messaging().getInitialNotification().then(remoteMessage=>{
        if(remoteMessage){
            console.log("Notiifcation caused the app to open from quit state:",remoteMessage.notification);
            
        }
        
    })
    
    messaging().onMessage(async remoteMessage=>{
        console.log("notification on foreground state:",remoteMessage);
        PushNotification.localNotification({
            channelId:"my-channel",
            channelName:"myChannel",
            title:remoteMessage.notification.title,
            message:remoteMessage.notification.body
        })
    })
}