---
title: 'Spec: Screen'
redirect_from:
  - '/spec/screen'
---

The `screen` call lets you record whenever a user sees a screen, the mobile equivalent of `page`, in your mobile app, along with any properties about the screen. Calling `page` or [`screen`](/docs/connections/spec/screen/) in one of Segment's [sources](/docs/connections/sources/) is one of the first steps to getting started with Segment.

{% include components/reference-button.html href="https://university.segment.com/introduction-to-segment/299973?reg=1&referrer=docs" icon="media/academy.svg" title="Segment University: The Screen Method" description="Check out our high-level overview of the Screen method in Segment University. (Must be logged in to access.)" %}

Here's the payload of a typical `screen` call, with most [common fields](/docs/connections/spec/common/) removed:

```json
{
  "type": "screen",
  "name": "Home",
  "properties": {
    "Feed Type": "private"
  }
}
```

And here's the corresponding Objective-C event that would generate the above payload:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"Feed Type": @"private" }];
```
{% include content/syntax-note.md %}

Beyond the common fields, the `screen` call takes the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-screen-name.md %}
  {% include content/spec-field-screen-properties.md %}
</table>

## Example

Here's a complete example of a `screen` call:

```json
{
  "anonymousId": "3a12eab0-bca7-11e4-8dfc-aa07a5b093db",
  "channel": "mobile",
  "context": {
    "ip": "8.8.8.8"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "name": "Home",
  "properties": {
    "variation": "blue signup button"
  },
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "type": "screen",
  "userId": "97980cfea0067",
  "version": "1.1"
}
```

<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="text/javascript">
  function showMessage(){
      var name = document.getElementById("name").value;
      var variation = document.getElementById("variation").value;
      var output = 
`{
  "anonymousId": "3a12eab0-bca7-11e4-8dfc-aa07a5b093db",
  "channel": "mobile",
  "context": {
    "ip": "8.8.8.8"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "name": "${name}",
  "properties": {
    "variation": "${variation}"
  },
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "type": "screen",
  "userId": "97980cfea0067",
  "version": "1.1"
  }`
    output_container.innerHTML = output
    Prism.highlightElement(output_container)
  }
</script>
<script>
  function showOutput() {
    var show = document.getElementById("output-code");
    if (show.style.display === "block") {
      show.style.display = "none";
    } else {
      show.style.display = "block";
    }
  }
</script>

<div class="sample-code-container">
<div class="form">
  <h3> Sample Screen </h3>
  <p><b>See what your screen call looks like</b></p>
  <label for="name">Name:</label>
  <input type="text" id="name"><br>
  <label for="variation">Variation:</label>
  <input type="text" id="variation"><br>
  <input type="submit" id="submit" onclick="showMessage(); showOutput()" value="See a sample Screen call">
</div>

<div class="output">
<h3>Sample Screen Call</h3>
<pre class="language-javascript"><code class="language-javascript" id="output_container">

</code></pre>
</div>
</div>


## Identities

{% include content/spec-identities.md %}


## Name

Each screen can be tagged with a `name`. For example, many apps have a "Signup" screen that can be useful to tag so that you can see users as they move through your funnel.


## Properties

Properties are extra pieces of information that describe the screen. They can be anything you want.

Segment has reserved some properties with semantic meanings and handles them in special ways. You should **only use reserved properties for their intended meaning**.

Reserved properties that Segment has standardized:

| **Property** | **Type** | **Description**                                             |
|--------------|----------|-------------------------------------------------------------|
| `name`       | String   | Name of the screen. This is reserved for future use.        |
