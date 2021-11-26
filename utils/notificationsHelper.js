import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATION_KEY = 'MobileFlashcards:notification'

const createNotification = () => {
    return {
        title: 'Take a quiz',
        body: 'Please, remember to take at least one quiz today!',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            stick: false,
            vibrate: true
        }
    }
}

export const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data)=> {
            if (data === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status})=>{
                    if (status == 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate()+1)
                        tomorrow.setHours(20)

                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: tomorrow,
                            repeat: 'day'
                        })

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync()
    )
}