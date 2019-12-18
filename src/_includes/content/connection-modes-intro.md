Our Web source (Analytics.js), and our native client-side libraries (iOs, Android, React-native) allow you to choose how you send data to Segment from your website or app. Two ways are available:

- **Cloud-mode**: in this mode, the sources send data directly to the Segment servers, which then translate it for each connected downstream destination, and send it on. Translation is done on the Segment servers, keeping your page size, method count, and load time small.

- **Device-mode**: in this mode, you include additional code on your website or mobile app which allows Segment to use the data you collect on the device to make calls directly to the destination tool's API, without sending it to the Segment servers _first_. (You still send your data to the Segment servers, but this occurs asynchronously.) This is also called "wrapping" or "bundling", and it might be required when the source has to be loaded on the page to work, or loaded directly on the device to function correctly. When you use Analytics.js, you can change the device-mode destinations that a specific source sends to from within the Segment web app, without touching any code.

> **Note:** If you use Server source libraries, they only send data directly to Segment in Cloud-mode. (Server library implementations operate in the server backend, and can't load additional destination SDKs.)
