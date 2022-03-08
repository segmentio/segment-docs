---
title: Tracking Pixel API
id: 7XqN9rJQOG
---
Tracking pixels (aka beacon, 1×1 gif, or clear gif) allow for tracking email opens, advertising impressions and checkout pages where JavaScript and POST requests are disallowed, but where you _can_ embed an image.

Follow Segment's [HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http) to use the `/pixel` API endpoint, which accepts base64 encoded url `?data` and returns an 1x1 transparent gif.

### Pixel API endpoint signature:

```
https://api.segment.io/v1/pixel/<METHOD ENDPOINT>?data=<base64-ENCODED-JSON>
```

> note ""
> The base64 encoding is optional, however it prevents special character interpretation or muxing by browsers, or other tools that might interpret URLs. For example, the URL `https://www.example.com/` might be altered to `http%3A%2F%2Fwww.example.com` when appended to another URL, but the base64 version, `aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20`, remains unchanged.

#### Pixel Routes


  ```text
  /v1/pixel/identify
  /v1/pixel/group
  /v1/pixel/alias
  /v1/pixel/page
  /v1/pixel/screen
  /v1/pixel/track
  ```

Each endpoint *always* responds with a `200 <empty-gif>`, even if an error occurs.

#### Example **Email Opened** event:

##### Create the payload:

```json
{
  "writeKey": "YOUR_WRITE_KEY",
  "userId": "user_123",
  "event": "Email Opened",
  "properties": {
    "subject": "The Electric Daily",
    "email": "jane.kim@example.com"
  }
}
```

**Note:** you must include either a `userId` or `anonymousId` with every API call.

##### Encode it using base64 and make sure it's URL safe:

**Protip:** You can accomplish this with [WindowBase64 methods](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa):

```
eyJ3cml0ZUtleSI6ICJZT1VSX1dSSVRFX0tFWSIsICJ1c2VySWQiOiAiMDI1cGlrYWNodTAyNSIsICJldmVudCI6ICJFbWFpbCBPcGVuZWQiLCAicHJvcGVydGllcyI6IHsgICAic3ViamVjdCI6ICJUaGUgRWxlY3RyaWMgRGFpbHkiLCAgICJlbWFpbCI6ICJwZWVrQXRNZUBlbWFpbC5wb2tlIiB9fQ
```

##### Add an image tag to your email newsletter with `src` pointing to a Pixel API route:

```html
<img src="https://api.segment.io/v1/pixel/track?data=eyJ3cml0ZUtleSI6ICJZT1VSX1dSSVRFX0tFWSIsICJ1c2VySWQiOiAiMDI1cGlrYWNodTAyNSIsICJldmVudCI6ICJFbWFpbCBPcGVuZWQiLCAicHJvcGVydGllcyI6IHsgICAic3ViamVjdCI6ICJUaGUgRWxlY3RyaWMgRGFpbHkiLCAgICJlbWFpbCI6ICJwZWVrQXRNZUBlbWFpbC5wb2tlIiB9fQ">
```
