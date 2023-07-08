const mugaStereo = 'muga-stereo'//nombre del chache

const assets=[
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
]

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(mugaStereo).then(cache => {
            cache.addAll(assets)

        })
    )
} )
self.addEventListener('activate', activateEvent => {
    activateEvent.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key != mugaStereo){
                    return caches.delete(key)
                }
            }
                ))
        })
    )
    return self.clients.claim()
})

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch (fetchEvent.request)
        })
    )
})

if('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        console.log('Si es compatible con service worker')
        navigator.serviceWorker.register('/serviceWorker.js')
        .then(res => console.log('Resgitrado', res))
        .catch (e => console.assert.log ('NO se pudo Resgitrar', e))
    } )
    
}