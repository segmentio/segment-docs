---
title: Analytics for Roku
sourceTitle: 'Roku'
id: BbupS2SB0b
---
The Segment Roku SDK makes it easy to send data to Segment from any Roku enabled device. This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-roku).

**NOTE:** The Roku SDK is currently in alpha. We recommend using this version for development, test or QA builds. 


## Getting Started

### Installing the library

You can start by downloading a copy of the library here: https://github.com/segmentio/analytics-roku.

Unzip the contents and you should see the following structure:

```
SegmentAnalytics
  -- components
    -- SegmentAnalyticsTask.brs
    -- SegmentAnalyticsTask.xml
  -- source
    -- SegmentAnalytics.brs
    -- SegmentAnalyticsConnector.brs

```

The library consists of three parts:

1. **source/SegmentAnalyticsConnector.brs** - Connector object used by SceneGraph components to make calls (identify, track, screen, group or alias). Public interface of the library for usage throughout the app. Abstracts away interaction with SegementAnalyticsTask SceneGraph Task node directly.
2. **source/SegmentAnalytics.brs** - Implementation responsible for making HTTP requests to Segment REST API for identify, track, screen, group or alias. Includes handling for batching, error handling. Must be used within context of SceneGraph Task node. Cannot be used directly within context of SceneGraph UI components.
3. **components/SegmentAnalyticsTask.brs/xml** - SceneGraph Task node that will be running for the entire lifecycle of the app. Responsible for delegating calls to SegmentAnalytics.brs to make requests to Segment REST API.

The "components" folder contains SceneGraph components and the "source" folder contains BrightScript files. The content of each folder must be included in the respective folder of the application. Depending on the application folder structure and where the library files are included, SegmentAnalyticsTask.xml might need to be updated to reflect the file paths.


### Initializing the library

To instantiate the library, you first need to update the application scene .xml file with the following two changes:

1. Include SegmentAnalyticsConnector.brs BrightScript file

```
<script type="text/brightscript" uri="pkg:/source/analytics/SegmentAnalyticsConnector.brs" />
```

2. Include SegmentAnalyticsTask node component under the children tag

```
<SegmentAnalyticsTask id="segmentAnalyticsTask" />
```

3. Once you have those tags in place you can initialize the library in your "init()" function of your scene as follows:

```
task =  m.top.findNode("segmentAnalyticsTask")
m.library = SegmentAnalyticsConnector(task)

config = {
  "writeKey": "WRITE KEY"
  "debug": true
  "queueSize": 3
  "retryLimit": 0
}

m.library.init(config)
```

The "config" object in the example above has four values that you can set:

**writeKey (required)**: A string type field that is the write key to the source of your workspace hosted on Segment.

**debug (optional)**: A boolean flag that if set to true that logs all the operations of the library. Omit this field entirely on the release of your app.

**queueSize (optional)**: An integer that indicates how many tracking calls you want queue before sending out the request. If omitted or a value of less than one is used then this field will default to one.
 
**retryLimit (optional)**: An integer that indicates how many times you want the system to retry request calls if they do end up failing. If omitted or a value of less than zero is used then this field will default to one.

### Start using the library with the identify call

You can begin to use the library by invoking the identify call as it allows you to let you identify the user in your app. It also lets you record traits about the user, like their email, name, account type, etc.

When you call this method that is ultimately up to you. It is recommended that you try to call it as early as possible in a block of code that already has your user information instantiated and ready to populate. If however, you're doing an anonymous tracking you can omit this call entirely and supply an anonymousId field to the track calls.

This is what an identify call looks like in BrightScript with your library instantiated with the above example:

```
exampleTraitsObject = {
  "email": test@test.com
  "name": "TestName"
}

exampleOptionsObject = {
  "extraInformation": "test"
}

m.library.identify("exampleUserId", exampleTraitsObject, exampleOptionsObject)
```

After identifying the user you can start to invoke the other methods calls library (track, screen, group and alias) with the same userID to associate them within the segment analytics system.

## Identify
Identify lets you tie a user to their record trait about them. It includes a unique user ID and any optional traits you know about them. We recommend calling identify a single time when the user's account is first created, and only identifying again later when their traits change.

An example of the method call would be as follows:

```
userId = "1sdf1fw4xgafs"
 
traits = {
  "email": testEmail@example.com
  "name": "John Doe"
  "accountType" : "tier-1"
}

options = {
  "timeStamp": "2019-04-23T19:24:13+00:00"
}

m.library.identify(userId, traits, options)
```

The identify call has the following fields:

**userId (required)**: A string that is the database ID for the user

**traits (optional)**: An object that has property fields inside it such as name, email, address, etc… that are associated with the userID

**options (optional)**: An object that has extra options for the call.

## Track

The track event lets you record actions users perform. Every action triggers what we call an "event", which can also have associated properties.

For this call in particular we suggest tracking events that are successful such as page loaded, click action performed and etc…

This is an example of how you would invoke the track call in the Roku library:

```
eventName = "fast forward button press"
 
properties = {
  "timeSkipped": "60"
  "mediaType": "movie"
  "timeInMovie": "35:20"
}

options = {
  "userId": "1sdf1fw4xgafs"
  "timeStamp": "2019-04-23T19:24:13+00:00"
}

m.library.track(eventName, properties, options)
```

The track call has the following fields:

**eventName (required)**: A string for the name of the event that is being tracked

**properties (optional)**: An object that has property fields associated with the event name e.g. what page has been loaded, what type of button was clicked and etc…

**options (required)**: An object that has extra options for the call. The property needed for this parameter is a valid string userId or anonymousId

## Screen

The screen method lets you track which screen the user sees when it is loaded. In the case of Roku it would be the equivalent of when a SceneGraph page component loads onto the scene.

Example of a screen call:

```
name = "Main Screen"
 
category = "All"
 
properties = {
  "hasCarousel": "false"
  "isLoggedIn": "false"
  "showingMovies": "true"
}

options = {
  "userId": "1sdf1fw4xgafs"
  "timeStamp": "2019-04-23T19:24:13+00:00"
}

m.library.screen(name, category, properties, options)
```

**name (optional/required)**: A string that denotes the name of the screen the user is on
 
**category (optional/required)**: A string that denotes the category of the screen the user is on

**properties (optional)**: An object that has property fields associated with the screen.

**options (required)**: An object that has Extra options for the call.  The property needed for this parameter is a valid string userId or anonymousId

**Note**: For this call in particular you either need the name or category for the request to send.

## Group

Helps associate an identified user with a group. Groups can be companies, organizations, companies and etc…
 
An example of a group call would be:

```
userId = "1sdf1fw4xgafs"
 
groupId = "1s2s3d2sd2a"
 
traits = {
  "company": "trackers.inc"
  "field":  "advertising"
  "specialty": "media tracking"
}
 
options = {
    "timeStamp": "2019-04-23T19:24:13+00:00"
}

m.library.group(userId, groupId, traits, options)
```

**userId (required)**: A string that is the database ID for the user
 
**groupId (required)**: A string that is the database ID for the group

**traits (optional)**: An object that has traits fields associated with the group. E.g. industry, employees and etc…

**options (optional)**: Extra options for the call.

## Alias

Allows you to associate one identity with another.

An example of an alias call would be:

```
userId = "1sdf1fw4xgafs"
 
options = {
  "previousId": "123c-dsad-2da2-da2ds"
  "timeStamp": "2019-04-23T19:24:13+00:00"
}

m.library.alias(userId, options)
```
**userId (required)**: The new ID to associate new track calls with the current user with.

**options (optional)**: Extra options for the call.

## FAQ

### Does this library support single calls?
Currently, this library uses the Segment batch API endpoint, which is why you are able to set a queue limit on the config object before a method gets sent out as a request. You simply set the queueSize to 1 on config object to get the same effect for a message sending a single request.

### What is the size limit of each request?
The size limit is 500k characters on the data body per request as noted on Segment batch API, which would be the parameters you're using for each message (identify, track, screen, group, alias). The size limit takes precedence over the queue limit in determining when a request gets sent out.
  
So for example, in the case you add a track message that is just below 500k characters, then add a group message that tips the data size over 500k, the system will send out the message that has been queued before (track) and then queue in the next message (group) call. Single messages that are over 500k characters in size will be rejected from the library.

If you want to see how big your request is getting you can use set the debug property to true on the config object before initializing our library.  This will output a log on how big each request is getting when you queue/send them out.

### How can I see the logs for the library?
You can follow [this guide](https://www.howtogeek.com/290787/how-to-enable-developer-mode-and-sideload-roku-apps/) to set your device into developer mode and [this one](https://sdkdocs.roku.com/display/sdkdoc/Debugging+Your+Application) to debug and surface logs out of your app. There are currently two levels of debugging which are "DEBUG" and "ERROR".

### Does the Roku library support device-mode integrations?
The Roku library only supports cloud-mode destinations. If you have a need for a device-mode integration in your Roku application  [contact us](https://segment.com/help/contact/). 
