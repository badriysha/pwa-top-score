// Cek notifikasi
if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function (registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        // applicationServerKey: << App Server Key >>
                        applicationServerKey: urlBase64ToUint8Array(
                            "BORdpTb4aiN1i3do77tKMJWoGbfHomUfvq_8b0JK_I4-0Vwm7pM4hFUujKvovGiAwtetOvZWat16UBuQbavc8p8"
                        )
                    }).then(function (subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ',
                            subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ',
                            btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh'))
                            )));
                        console.log('Berhasil melakukan subscribe dengan auth key: ',
                            btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function (e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    }
}

// Public key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}