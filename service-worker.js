self.addEventListener("fetch", (event) =>
{
    // console.log("CAUGHT FETCH")

    // Cache Implementation - Intercepting GET-Request for Cache response
    // 
    // event.respondWith(
    //     caches.match(event.request)
    //         .then((result) =>
    //         {
    //             if (result) {
    //                 console.log("found request in cache!", result)
    //                 return result;
    //             } else {
    //                 console.log("did not find request in cache!", event.request)
    //                 return fetch(event.request);
    //             }
    //         })
    // )

})

self.addEventListener("install", (event) =>
{
    console.log("service worker installed")

    // Cache Implementation - Url registration
    //
    // event.waitUntil(
    //     caches.open("static")
    //         .then((cacheObj) =>
    //         {
    //             // cacheObj.addAll([
    //             //     "./",
    //             //     "./index.html",
    //             //     "./images/KlickiBunti-192x192.png"
    //             // ])
    //         }))
})

self.addEventListener("activate", () =>
{
    console.log("service worker activated")
})