Segment's web source (Analytics.js), and native client-side libraries (iOS, Android, React-native) allow you to choose how you send data to Segment from your website or app. There are two ways to send data:

- **Cloud-mode**: The sources send data directly to the Segment servers, which then translate it for each connected downstream destination, and send it on. Translation is done on the Segment servers, keeping your page size, method count, and load time small.

  <div class="premonition info">
    <div class="fa fa-info-circle"></div>
    <div class="content">
      <p class="header">HLS customers can encrypt data flowing into their destinations</p>
      <p> HLS customers with a HIPAA Eligible workspace can encrypt data in fields marked as Yellow in the Privacy Portal before they flow into an event stream, cloud mode destination.
      <br>To learn more about data encryption, see the <a href="/docs/privacy/hipaa-eligible-segment/#data-encryption">HIPAA Eligible Segment documentation</a></p>
    </div>
  </div>

- **Device-mode**: You include additional code on your website or mobile app which allows Segment to use the data you collect on the device to make calls directly to the destination tool's API, without sending it to the Segment servers _first_. (You still send your data to the Segment servers, but this occurs asynchronously.) This is also called *wrapping* or *bundling*, and it might be required when the source has to be loaded on the page to work, or loaded directly on the device to function correctly. When you use Analytics.js, you can change the device-mode destinations that a specific source sends from within the Segment web app, without touching any code.


<div class="premonition info">
  <div class="fa fa-info-circle"></div>
  <div class="content">
    <p class="header"></p>
    <p>If you use Server source libraries, they only send data directly to Segment in Cloud-mode. Server library implementations operate in the server backend, and can't load additional destination SDKs.</p>
  </div>
</div>
