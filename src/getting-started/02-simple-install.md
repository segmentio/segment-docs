---
title: A simple Segment installation
---

The best way to learn about how Segment works is to see it in action. This tutorial walks you though an installation on a _website_ using our Javascript source. If you'd prefer to follow along using a different method, you can select one of the other tabs below.


## Before you begin

Before you start, you need a Segment user account and a workspace. If you're not already part of an organization with a Segment Workspace, you can sign up for a free one.

For the website version of this quickstart, you also need access to the code for a basic website. If you don't have easy access to a website, you can start a [free Github Pages site](https://pages.github.com/) for purposes of this demonstration. You'll


Steps:
- set up source in segment app
- find writekey
- paste snippet into website source





## Install basic code in my app/site
Find Write Key
![](https://lh5.googleusercontent.com/Q2SkrIdhfc6e4aoV3EAcXlAxIIA9M4z5JF7GDhM1yFRoKHUcioXcbwYW6_nWVf3IjomEq-MDklfa3EpZF-Ca8BjQXqPcsriPK3rSY1MN9xgj6Kp-qXiCpyGe5E5PiyP8GzUes2zG)


Segment determines which “source” a call is coming from by reading the Segment API Write Key that it uses as part of the analytics.load() event.  To view your Write Key for a given source, visit your workspace and click on the source.


For JavaScript sources, the Write Key appears in the context of a code snippet


![](https://lh3.googleusercontent.com/4Bf9flXWqdlqrEZhk8GuRPB4yTi8JJIZXUglZ7H9ZNbkAvtof6qG8A22iv1nAP0c2V8MjccAwi3puqz9AhywomjqVnguB6kry7y4tIPKcNcvSBQbhNMCldYFeF3uFBnVV58MqFRL)


For other sources, the Write Key appears on its own line, and can be copied on a click:

NOTE: No Cloud Object and only some Cloud Event sources have write keys.


Dev & Prod Sources

When testing, you should create and use separate sources for each of your environments (production, development, staging, etc.) to prevent testing and development activities from filling production systems with invalid data. Remember to set up different sources for each of your dev/prod environments in each place you'll be measuring.

IMPORTANT NOTE: The correct Write Key should always be applied to the corresponding environment to ensure that all events are tracked to the correct Segment source.




### Github pages template


```html
<!DOCTYPE html>
<html>
<head>
    <title>Home Questionnaire <span id="selection-marker-1" class="redactor-selection-marker"></span></title>
</head>
<body>
<h1>What is your favorite place to travel?</h1>
<p>I am building a directory of the sweetest travel destinations.</p>
<form name="travel" onsubmit="identify(event)">
     What is your favorite travel destination?
    <input name="destination" required="" size="81" type="text"/>
    <br><br><br>
    Any recommendations (cool things to do, places to visit or restaurants to eat)?
    <br><br>
    <textarea cols="81" name="details" required="" rows="10">
    </textarea>
    <br><br>
    Name: <input name="fullname" required="" size="75" type="text"/>
    <br><br>
    Email: <input name="email" required="" size="75" type="email"/>
    <br><br>
    <input name="submit" type="submit" value="submit"/>
</form>
    </body>
</html>
```





## Installing Segment

Quick starts — embed each guide on this page, with different tabs?


- https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/
- https://segment.com/docs/connections/sources/catalog/libraries/server/php/quickstart/
- https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/



{% codeexample %}
{% codeexampletab Javascript quickstart %}

<!-- marker JS start -->

This tutorial will help you start sending data from your website to Segment and any of our destinations, using our Analytics.js library. As soon as you’re set up you’ll be able to turn on any new destinations with the flip of a switch!
If you want to dive deeper at any point, check out the Analytics.js reference.

## Step 1: Copy the Snippet

Installing Segment is easy, just paste this snippet into the head of your site:


```js
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("YOUR_WRITE_KEY");
  analytics.page();
  }}();
</script>
```

When you paste it, you’ll need to replace `YOUR_WRITE_KEY` with your Segment project’s Write Key, which you can find in your project setup guide or settings.
That snippet will load Analytics.js onto the page asynchronously, so it won’t affect your page load speed. As soon as that snippet is running on your site, you can start turning on any destinations on your Segment destinations page and they will start loading on your site automatically!

You should remove other native third party destination code that you have on your site since it may cause issues if you turn on those same destinations (e.g. Google Analytics, Mixpanel, Customer.io, etc.) via Segment.

Fun fact: if you only want the most basic Google Analytics setup you can stop reading right now. You’re done! Just switch on Google Analytics in our interface.

However, lots of analytics and marketing tools will need to record who each user is on your site. If you’re looking to use any tool that deals with the identity of your users, read on about the `identify` method…

### Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the identify reference.

Note: You won’t need to call `identify` for anonymous visitors to your site. We’ll automatically assign them an `anonymousId`, so just calling `page` and `track` will still work just fine without `identify`.

Here’s what a basic `identify` call might look like:

```js
analytics.identify('f4ca124298', {
  name: 'Michael Bolton',
  email: 'mbolton@example.com'
});
```

That’s identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

Hold up though! When you actually put that code on your site, you’ll need to replace all those hard-coded strings with details about the currently logged-in user.

To do that, we recommend using a backend template to inject an `identify` call straight into the footer of every page of your site where the user is logged in. That way, no matter what page the user first lands on, they will always be identified. You don’t need to call `identify` if your unique identifier (`userId`) is not known.

Depending on your templating language, that would look something like this:

```js
analytics.identify(' {{user.id}} ', {
  name: '{{user.fullname}}',
  email: '{{user.email}}'
});
```


With that call on your page, you’re now successfully identifying every user that visits your site.

Second fun fact: if you only want to use a basic CRM setup, you can call it a day right now. Just switch on Salesforce, Intercom, or any other CRM you’d like to use from our interface and we’ll start sending all of your user data to it!
Of course, lots of analytics tools record more than just identities... they record the actions each user performs too! If you’re looking for a complete event tracking analytics setup, keep reading...

---

<!-- marker JS end -->


{% endcodeexampletab %}

{% codeexampletab PHP quickstart %}

Next Test some things.
<!-- marker PHP start -->








<!-- marker PHP end -->
{% endcodeexampletab %}

{% codeexampletab iOS Mobile quickstart %}


<!-- marker iOS start -->








<!-- marker iOS end -->


{% endcodeexampletab %}
{% endcodeexample %}








## Test that it’s working

Source:
https://segment.com/docs/connections/sources/debugger/

The Source Debugger is a real-time tool that helps you confirm that API calls made from your website, mobile app, or servers arrive to your Segment Source, so you can troubleshoot your Segment set up even quicker. With the Debugger, you can check that calls are sent in the expected format without having to wait for any data processing.

![](https://segment.com/docs/connections/sources/images/debugger_view.png)


The Debugger is separate from your workspace’s data pipeline and is not an exhaustive view of all the events ever sent to your Segment workspace. The Debugger only shows a sample of the events that the Source receives in real time, with a cap of 500 events. The Debugger is a great way to test specific parts of your implementation to validate that events are being fired successfully and arriving to your Source.
To see a more complete view of all your events, we recommend that you set up either a warehouse or an S3 destination.
The Debugger shows a live stream of sampled events arriving into the Source, but you can also pause the stream from displaying new events by toggling “Live” to “Pause”. Events continue to arrive to your Source while you Pause the stream.
You can search in the Debugger to find a specific payload using any information you know is available in the event’s raw payload. You can also use advanced search options to limit the results to a specific event.

![](https://segment.com/docs/connections/sources/images/debugger_search.png)


Two views are available when viewing a payload:

- The Pretty view is a recreation of the API call you made that was sent to Segment.
- The Raw view is the complete JSON object Segment received from the calls you sent. These calls include all the details about what is being tracked: timestamps, properties, traits, ids, and contextual information Segment automatically collects the moment the data is sent.


## Set up your first destination

some basic info about sending to google analytics, or mixpanel, etc


Google Analytics, FB pixel, Gtag?







<div class="double">
  {% include components/media-icon.html  href="/getting-started/" icon="media/icon-left.svg" title="Back to the index" content="back to the index" variant="related" %}

  {% include components/media-icon.html  href="/getting-started/02-simple-install/" icon="media/icon-right.svg" title="Next doc" content="In the next step..." variant="related" %}
</div>
