---
title: A full Segment implementation
---

## API Methods

**Segment supports several tracking-related API methods**, and these methods can be called from either the client-side or the server side. This section  explains the following methods:

- **Identify**: *Who* is using your site or app?
- **Page** (web); **Screen** (mobile): *Where* are they within the site or app?
- **Track**: *What* are they doing?

The **Alias** and **Group** methods are other API tracking methods that Segment supports, but are currently out of scope for {Customer}.

## Identify
![](https://lh4.googleusercontent.com/ivo-4buqR99rYXt8GeXGEKPh7naSh1yknYD8-XUZ5nwPSzG_g1eFt0u7Bcp_CJ-CI1ljEjvogLtt5zGmuQWkfYzwIjW8YqkxGz-jjqHR4-qK2Vcwi0VD-lnaON4lc7xIA3_WJB8j)


The identify() call allows Segment to know **who** is triggering an event.

## *When to Call Identify*

Identify() should be called in when you can first identify that the user is a known {Customer} user (typically during login), or when a user has updated their profile information.
When called as part of the login experience, the identify() call should be made as soon as possible after a user has authenticated. **When possible, identify() should also be immediately followed by a track event that indicates what caused the user to be identified.**  We’ve outlined these calls in the Identify tab of [**your Tracking Plan**](http://blah.com).
**NOTE: When making an identify() call as part of a profile update, only the changed information needs to be passed to Segment**.  (Alternatively, you can send all profile info on every identify call if that makes implementation easier.)

## *Traits*

These are **the metadata fields that you’ll pass in each Segment API call to enrich the data that you are sending.** These are called “Traits” for identify() calls, and “Properties” for all other methods.  ****
**The most important trait to pass as part of the identify() call is userId**, which uniquely identifies a user across all {Customer} applications. It is recommended that you use some sort of hash value to ensure uniqueness, though other values are acceptable (e.g. email address is not preferred, but is usually acceptable due to it being unique and mostly unchanging).
Beyond that, the identify() call is your opportunity to provide information about the user that can be used for future reporting, so **you should seek to send any fields that you will want to be able to report on later**. Consider using Identify and traits when...

- Gathering of extensive user profile data (e.g., company, city/state, job title, or other user-level data)
- Gathering of extensive company-level data (e.g., company size, number of seats, etc)

To see the Traits {Customer} plans on capturing for its users in Identify calls, please visit **the Identify tab of** [**your Tracking Plan**](http://blah.com).

## *How to Call Identify*

Identify() can be called from any of Segment’s client-side or server-side libraries, including [Javascript](https://segment.com/docs/sources/website/analytics.js/), [iOS](https://segment.com/docs/sources/mobile/ios), [Android](https://segment.com/docs/sources/mobile/android), [Ruby](https://segment.com/docs/sources/server/ruby/), and [Python](https://segment.com/docs/sources/server/python/).  Here are two examples of calling identify from two different libraries:

**Javascript (client-side) identify() call:**
```js
analytics.identify("12345abcde", {
  "email": "michael.phillips@segment.com",
  "name": "Michael Phillips",
  "city": "New York",
  "state": "NY",
  "internal": True
});
```

**Ruby (server-side) identify call:**
```ruby
analytics.identify( user_id: "12345abcde",
  traits: {
     email: 'michael.phillips@segment.com',
     name: 'Michael Phillips',
     city: 'New York',
     state: 'NY',
     internal: True })
```

## *analytics.reset()*

When a user explicitly signs out of an application belonging to {Customer}, a call to Segment’s **analytics.reset()** method will stop logging any further event activity to that user, and will create a new anonymousId for subsequent activity.  **This call is most relevant for client-side Segment libraries**, as it clears cookies in the user’s browser.
The Reset() call should be made as soon as possible after a signout has occurred and only after a sign-out is successful (not when the signout button is clicked).  For more info on this call, [**visit this page of our docs**](https://segment.com/docs/sources/website/analytics.js/#reset-logout).

## Page & Screen

The Page() and Screen() calls allow Segment to know what web page or mobile scren the user is on.  This call automatically captures key context so you don’t have to send this data explicitly:

| **Page context** auto-captured | **Screen context** auto-captured                    |             |                                                                                                    |
| ------------------------------ | --------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| **title**                      | *window.location.title*                             | **app**     | *build, name, namespace, version*                                                                  |
| **url**                        | *window.location.url*                               | **device**  | *adTrackingEnabled, advertisingId (IDFA/AAID), device ID, manufacturer, model, type (android/ios)* |
| **path**                       | *window.location.path*                              | **library** | *name, version*                                                                                    |
| **referrer**                   | *window.document.referrer*                          | **locale**  | *window.document.referrer*                                                                         |
| **search**                     | *window.location.search*                            | **network** | *cellular, wifi*                                                                                   |
| **ip**                         | *address*                                           | **ip**      | address                                                                                            |
| **userAgent**                  | *string*                                            | **os**      | name, version                                                                                      |
| **campaign**                   | *utm_source, utm_medium, utm_campaign, utm_content* | **screen**  | height, width                                                                                      |

## *Properties*

You can always [**override the auto-collected Page/Screen properties**](https://segment.com/docs/sources/website/analytics.js/#default-properties) with your own, as well as set additional custom page or screen properties.  Note that some applications (like Marketo) require that  specific properties (like email address) are attached to every page() call.  This is considered a destination-specific implementation nuance, and you should be sure to cover such nuances with your Segment Solutions Architect.

## Named Page & Screen Calls

**You can specifiy a page “Name”** at the start of the page or screen call—which is especially useful **to roll up a giant list of page names into sometihng more succinct for analytics.** For example, on an ecommerce site you might want to call analytics.page( "Product" ) and then provide properties for that product:

**Named Page Call** for analytics.js
```js
analytics.page("Product", {
  "category": "Smartwatches",
  "sku": "13d31"
});
```

**Named Screen Call** for iOS
```objc
[[SEGAnalytics sharedAnalytics] screen:@"Product"
properties:@{ @"category": @"Smartwatches", @"sku": @"13d31" }];
 }];
```


## *When to Call Page()*

Segment will automatically call a page() event whenever a web page is loaded.  This may be sufficient for most of {Customer}’s needs, but **page() will need to be called manually if you are changing the URL path without reloading the page (i.e., single page web apps).**  Please review
**NOTE: If the presentation of user interface components don’t substantially change the user’s context** (e.g., if a menu is displayed, search results are sorted/filtered, or an information panel is displayed on the exiting UI) **the event should be measured with a Track call, not a Page call.**
**NOTE: When a page() call is triggered manually, it should happen when a UI element is successfully displayed, not when it is called** (e.g., it shouldn’t be called in conjunction with the click event that instigates it).

For more info on Page calls, please review  our [**general Page docs**](https://segment.com/docs/spec/page/) and [**analytics.js docs**](https://segment.com/docs/sources/website/analytics.js/#page).

## *When to Call Screen()*

Analogous to the page() method, **Segment uses screen() calls in mobile apps.** You can expect that mobile screens will be treated similar to standard page() tracking (the goal is to have as much consistency between web and mobile as is feasible).

## Track

The track() call allows Segment to know **what** the user is doing.

## *When to Call*

The track() call is used to track user and system events, such as:

- The user’s interaction with a UI component (e.g.  ‘button clicked’)
- The presentation of a significant UI component, other than a page (e.g.. search results)
## *Events and Properties*

Your track calls should include both events and properties. **Events are the actions you want to track**, and **properties are the contextual data sent with each event**.
Properties are powerful.  They enable you to capture as much context about the event as you’d like, and then cross-tabulate or filter your downstream tools.  For example, let’s say an eLearning website is tracking whenever a user bookmarks an educational article on a page.  Here’s what a robust analytics.js Track call could look like:

```js
analytics.track('Article Bookmarked', {
  "title": 'How to Create a Tracking Plan',
  "course": 'Intro to Data Strategy',
  "author": 'Dr. Anna Lytics',
  "publish_year": '2019',
  "publish_month": '03',
  "length": 'Medium - 1000-2000 words',
  "assets": {'Infographics','Interactive Charts'},
  "topics": {'Data Planning','Segment','Data Flow'},
  "button_location": 'Subheader - 3rd Column'
});
```

With this track call, we could analyze which authors had the most popular articles, which months and years led to the greatest volume of bookmarking overall, which button locations drive the most bookmark clicks, or which users gravitate towards infographics related to Data Planning.

## *Event Naming Best Practices*

Each event {Customer} tracks will need to have a name that describes the event, like 'Article Bookmarked' above. That name is passed in at the beginning of the track call, and should be standardized across all {Customer} properties to enable the comparison of the same actions on different properties.
Segment’s best practice is to use an “Object Action” (Noun<>Verb) naming convention (i.e. 'Article Bookmarked') for all **Track** events. Segment maintains a robust set of ****[**Semantic Event Specs**](https://segment.com/docs/spec/semantic/) which follow this naming convention around different use cases such as eCommerce, B2B SaaS, and Mobile.  And our onboarding process also includes an exercise to select the best Semantic Events for [**your Tracking Plan**](http://blah.com).  Please see the Event Inventory tab in [**your Tracking Plan**](http://blah.com) for more info.  Let’s dive deeper into the Object<>Action syntax that all of your Segment Track events should use.
***Objects = Nouns***
Nouns are the entities or objects that the user or the system acts upon.  ****The important aspect of naming objects is that they are referred to consistently within an application, and that the same objects that exist in multiple applications are referred to by the same name.
Use the following list of objects to see if there is a logical match with your application.  If you have objects that aren’t in this list, name it in a way that makes sense if it were to appear in other applications, and/or run it by Product Analytics.


*Suggested Nouns*

| **Noun / Object**     | *Description*                                        |
| --------------------- | ---------------------------------------------------- |
| **Menu**              |                                                      |
| **Navigation Drawer** | *“Hamburger” menu in the upper left corner of a UI.* |
| **Profile**           |                                                      |
| **Account**           |                                                      |
| **Video**             |                                                      |

***Actions = Verbs**
Verbs indicate the action taken by either a user or the {Customer} site.  When naming a new track event, consider if the current interaction can be adequately described using a verb from the list below.  If it can’t, choose a verb that describes what the user is trying to in your specific case, while being flexible enough to potentially be used in other scenarios in your app or even in other apps.
*Suggested Verbs*

| **Verb**             | *Description*                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Applied**          | *Applying a new format to the UI results.*                                                                                                                                                                                                                                                                                                                         |
| **Clicked**          | *Catch-all for events where a user activated some part of the UI but no other verb captures the intent.*                                                                                                                                                                                                                                                           |
| **Created/Deleted**  | *The user- or system-initiated action of creating or deleting an object (e.g., new search, favorite, post)*                                                                                                                                                                                                                                                        |
| **Displayed/Hidden** | *The user- or system-initiated action of hiding or displaying an element*                                                                                                                                                                                                                                                                                          |
| **Enabled/Disabled** | *Enabling or disabling some feature (e.g., audible alarms, emails, etc).*                                                                                                                                                                                                                                                                                          |
| **Refreshed**        | *When a set of search results is refreshed.*                                                                                                                                                                                                                                                                                                                       |
| **Searched**         | *When an app is searched*                                                                                                                                                                                                                                                                                                                                          |
| **Selected**         | *User clicked on an individual search result.*                                                                                                                                                                                                                                                                                                                     |
| **Sorted**           | *The user or UI action that causes data in a table, for example, to be sorted*                                                                                                                                                                                                                                                                                     |
| **Unposted**         | *Making a previously publicly-viewable posting private.*                                                                                                                                                                                                                                                                                                           |
| **Updated**          | *The user action that initiates an update to an object (profile, password, search, etc.; typically be making a call to the backend), or the they system having actually completed the update (often this tracking call will be made in response to a server-side response indicating that the object was updated, which may or may not have an impact on the UI).* |
| **Viewed**           |                                                                                                                                                                                                                                                                                                                                                                    |



## *Property Naming: Best Practices*

Segment recommends property names be in **snake case** (e.g., “property_name”), with values matching the format in which they are captured (e.g., a username value would be captured in whatever case it was typed in as).
Ultimately, you may decide on the casing that suits you; however, **the single most aspect is that you’re consistent across your entire tracking with one casing method**.
**IMPORTANT NOTE:** In the Segment [spec](https://segment.com/docs/spec/), **all** [API calls](https://segment.com/docs/spec#api-calls) have a common structure and a few common fields. Common fields will automatically be collected on every call, and are listed in the [common fields](https://segment.com/docs/spec/common/) section of our spec.

## *Common properties to send with track() call*

The following properties should be sent with every track() call:

| **Event Context**                                        | **Property Name**                                                                                                                                                                                                                                                                                                                                                                                      | **Description**                                                                                                                                                                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Any track() call**                                     | **initiator**                                                                                                                                                                                                                                                                                                                                                                                          | *Was the event initiated by the user (“User”) or the system (“System”)?*                                                                                                                                                                          |
| **display_format**                                       | *Responsive or not (or some other indicator of the current page layout template)*                                                                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                   |
| **Search Initiated** <br>**or Search Results Displayed** | **[Search Parameters]**                                                                                                                                                                                                                                                                                                                                                                                | *All search parameters, with the names being the snake case version of the internal names.*                                                                                                                                                       |
| **Search Results Displayed**                             | **total_result_count**                                                                                                                                                                                                                                                                                                                                                                                 | *The total number of results returned that match the search parameters.  This number represents the number of results that could be returned to the user even if only a subset of those were actually returned (e.g., if results are paginated).* |
| **Paginated List Displayed**                             | **total_items_pages**                                                                                                                                                                                                                                                                                                                                                                                  | *The total number of pages of items available to be viewed by the user.*                                                                                                                                                                          |
| **items_per_page**                                       | *The number of possible items in each page of items (e.g., if the UI is showing 50 search results per page).  The actual number of items in the current page may be less than this number if, for example, the system is displaying the last page of results and there aren’t enough results to fill to the page’s maximum (e.g., if there are 27 results when the page could display as many as 50).* |                                                                                                                                                                                                                                                   |
| **current_item_page**                                    | *The current page number being displayed to the user.*                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                   |
| **External Link Clicked**                                | **destination_url**                                                                                                                                                                                                                                                                                                                                                                                    | *The URL that the user will be taken to when clicked.*<br>*Ideally this will be the final destination (e.g., after any redirects), but only the immediate destination is likely in most cases.*                                                   |
| **Item List Sorted**                                     | **sort_column**                                                                                                                                                                                                                                                                                                                                                                                        | *The internal name of the column that was sorted on.*                                                                                                                                                                                             |
| **sort_direction**                                       | *ascending or descending*                                                                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                                                                                                                   |




## How to Call

Track() can be called from any of Segment’s client-side or server-side libraries, including [Javascript](https://segment.com/docs/sources/website/analytics.js/), [iOS](https://segment.com/docs/sources/mobile/ios), [Android](https://segment.com/docs/sources/mobile/android), [Ruby](https://segment.com/docs/sources/server/ruby/), and [Python](https://segment.com/docs/sources/server/python/).  Here are two examples of calling track from two different libraries:
**Javascript (client-side) track() call:**
```js
analytics.track('Article Bookmarked', {
  "title": 'How to Create a Tracking Plan',
  "course": 'Intro to Data Strategy',
  "author": 'Dr. Anna Lytics',
});
```


**Ruby (server-side) track call:**
```ruby
analytics.track( user_id: '12345abcde',
  event: 'Article Bookmarked',
  properties: {
     title: 'How to Create a Tracking Plan',
     course: 'Intro to Data Strategy',
     author: 'Dr. Anna Lytics'})
```



<div class="double">
  {% include components/media-icon.html  href="/getting-started/" icon="media/icon-left.svg" title="Back to the index" content="back to the index" variant="related" %}

  {% include components/media-icon.html  href="/getting-started/02-simple-install/" icon="media/icon-right.svg" title="Next doc" content="In the next step..." variant="related" %}
</div>
