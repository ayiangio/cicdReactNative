/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().registerDeviceForRemoteMessages();
messaging().getToken().then(fcmToken => {
    if (fcmToken) {
        alert(fcmToken) 
        console.log(fcmToken)
    } else {
        alert('ganok cuy')
    } 
});

messaging().onMessage((remoteMessage) => {
    console.log('FCM Message Data:', remoteMessage);
 });

AppRegistry.registerComponent(appName, () => App);
