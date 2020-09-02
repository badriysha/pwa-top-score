var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BORdpTb4aiN1i3do77tKMJWoGbfHomUfvq_8b0JK_I4-0Vwm7pM4hFUujKvovGiAwtetOvZWat16UBuQbavc8p8",
    "privateKey": "oxH6W75AhA1Usjg7x8gwAXC55ZUY0KkY8WznhdtHe28"
};

webPush.setVapidDetails(
    'mailto:apple.kagegel@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fT-OW6tx51s:APA91bEpBtXyoOkmDBOe6cxQKJcIHY8ptlp9EPD68bXo4TDqGiI2orm4VAYeYzjC8zZD3fb5n9p5qPqRkxK_9m2wQmgjTunguMkDYwVEemzc8nufjJNgtzjVVbGlEYU6VTS6oXU4fSeg",
    "keys": {
        "p256dh": "BDVde8Cz4SsmM7hVNSgctUMg0qaNpzaeezhsgc2lVb+tlZffkuKzImlUvh3yQTqVMtW2eqQ5vhDBpxsqtDkh3v8=",
        "auth": "3NSGWsK29Jn+LJpmP1k+ug=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '1000946600195',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);