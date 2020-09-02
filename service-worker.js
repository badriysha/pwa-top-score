// workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    workbox.precaching.precacheAndRoute([

        {
            url: '/',
            revision: '1'
        }, {
            url: '/index.html',
            revision: '2'
        }, {
            url: '/liga-details.html',
            revision: '1'
        }, {
            url: '/nav.html',
            revision: '1'
        }, {
            url: '/team-details.html',
            revision: '1'
        }, {
            url: '/manifest.json',
            revision: '1'
        }, {
            url: '/images/home.svg',
            revision: '1'
        }, {
            url: '/images/mail.svg',
            revision: '1'
        }, {
            url: '/images/school.svg',
            revision: '1'
        }, {
            url: '/images/bg-parallax-1.jpeg',
            revision: '1'
        }, {
            url: '/images/icon.png',
            revision: '1'
        }, {
            url: '/images/me.png',
            revision: '1'
        },
        '/images/liga/BL1.png',
        '/images/liga/BSA.png',
        '/images/liga/CL.png',
        '/images/liga/DED.png',
        '/images/liga/EC.png',
        '/images/liga/ELC.png',
        '/images/liga/FL1.png',
        '/images/liga/PD.png',
        '/images/liga/PL.png',
        '/images/liga/PPL.png',
        '/images/liga/SA.png',
        '/images/liga/WC.png',
        '/images/liga/no-photo.png',
        '/images/icons/icon-192x192.png',
        '/images/icons/icon-512x512.png',
        {
            url: '/images/icons/back.svg',
            revision: '1'
        }, {
            url: '/images/icons/heart-bg1.svg',
            revision: '1'
        }, {
            url: '/images/icons/heart-border.svg',
            revision: '1'
        }, {
            url: '/images/icons/menu.svg',
            revision: '2'
        }, {
            url: '/images/social/instagram.svg',
            revision: '1'
        }, {
            url: '/images/social/linkedin.svg',
            revision: '1'
        }, {
            url: '/images/social/twitter.svg',
            revision: '1'
        }, {
            url: '/images/social/youtube.svg',
            revision: '1'
        }, {
            url: '/pages/home.html',
            revision: '1'
        }, {
            url: '/pages/about.html',
            revision: '1'
        }, {
            url: '/pages/account.html',
            revision: '1'
        }, {
            url: '/pages/favorite.html'
        }, {
            url: '/js/check-sw.js',
            revision: '1'
        }, {
            url: '/js/football-api.js',
            revision: '1'
        }, {
            url: '/js/football-db.js',
            revision: '1'
        }, {
            url: 'js/getCompetitions.js',
            revision: '1'
        }, {
            url: '/js/getMatch.js',
            revision: '1'
        }, {
            url: 'js/getSavedTeam.js',
            revision: '1'
        }, {
            url: '/js/getStandings.js',
            revision: '1'
        }, {
            url: '/js/getTeam.js',
            revision: '1'
        }, {
            url: '/js/helper.js',
            revision: '1',
        }, {
            url: '/js/main.js',
            revision: '1'
        }, {
            url: '/js/nav.js',
            revision: '1'
        }, {
            url: '/js/notif.js',
            revision: '1'
        }, {
            url: '/js/teamMatch.js',
            revision: '1'
        }, {
            url: '/js/library/idb.js',
            revision: '1'
        }, {
            url: 'js/materialize.min.js',
            revision: '1'
        }, {
            url: '/css/materialize.min.css',
            revision: '1'
        }, {
            url: '/css/style.css',
            revision: '1'
        }, {
            url: '/favicon.ico',
            revision: '1'
        },
    ], {
        // Ignore all URL parameters.
        ignoreURLParametersMatching: [/.*/]
    });

    // API cache
    workbox.routing.registerRoute(
        /^https:\/\/api\.football\-data\.org\/v2\//,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'football-api',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 120,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                }),
            ],
        })
    );


    // image cache
    workbox.routing.registerRoute(
        /.*(?:png|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts',
        })
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

// push notification
self.addEventListener('push', event => {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'images/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});