---
title: Formatting guide
description: The styleguide of front-end components
hidden: true
layout: page
contributors:
  - name: Paul Mccall
    date: 23.08.2019
  - name: Jane Doe
    date: 23.08.2019
  - name: Porter Braun
    date: 23.08.2019
  - name: Monica Buck
    date: 23.08.2019
related:
  - "/connections/sources/catalog/"
  - "/connections/sources/"
redirect_from: '/styleguide/'
---

---

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

---

## Text underline

{:.underline}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{:.underline}
#### Heading with underline

---

## Lists

1. one
    1. nested
2. two
    1. nested
3. three
    1. nested

* Item
    * First Subitem
    * Second Subitem
* Item
    - Subitem
    - Subitem
* Item

{% include components/list-steps.html number="1" heading="Totally new here?" content="Not sure what to track or why? Check out Segment's Analytics Academy to learn more about the wide world of analytics, including the what and why and some stories about beautiful stacks." %}
{% include components/list-steps.html number="2" heading="Totally new here?" content="Not sure what to track or why? Check out Segment's Analytics Academy to learn more about the wide world of analytics, including the what and why and some stories about beautiful stacks." %}
{% include components/list-steps.html number="3" heading="Totally new here?" content="Not sure what to track or why? Check out Segment's Analytics Academy to learn more about the wide world of analytics, including the what and why and some stories about beautiful stacks." %}

{: .columns }
- One
- Two
- Three
- Four
- Five
- Six
- Seven
- Eight
- Nine
- Ten

---

## Table

| Field                    | Type   | Description                                                                                                                    |
|--------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------|
| traits optional          | Object | Free-form dictionary of traits of the user, like email or name. See the Traits field docs for a list of reserved trait names   |
| userId optional/required | String | Unique identifier for the user in your database A userId or an anonymousId is required,See the Identities docs for more detail |

---

## Buttons

{% include components/button.html text="Button" href="https://segment.com" %}
{% include components/button.html variant="bordered" text="Bordered button" href="https://segment.com" %}
{% include components/button.html size="small" variant="bordered" text="Small bordered button" href="https://segment.com" %}
{% include components/button.html size="large" text="Large button" href="https://segment.com" %}


{% include components/button-fill.html size="large" text="Large filled button" href="https://segment.com" %}
{% include components/button-fill.html size="half" text="Half filled button" href="https://segment.com" %}
{% include components/button-fill.html size="expand" text="Expanded filled button" href="https://segment.com" %}

{% include components/button-fill.html size="small" text="Small filled button" href="https://segment.com" %}
{% include components/button-fill.html size="small" variant="white" text="Small white-filled button" href="https://segment.com" %}
{% include components/button-fill.html size="small" variant="gray" text="Small gray-filled button" href="https://segment.com" %}

{% include components/button-hollow.html size="small" text="Small hollow button" href="https://segment.com" %}
{% include components/button-link.html text="Link button" href="https://segment.com" %}

---

## Code Blocks

Analytics.js, our Javascript `library`, is the most powerful way to track customer data from your `website`. If you're just starting out, we recommend it over server-side libraries as the simplest installation for any website.

```js
analytics.identify('user_123', {
  email: 'jane.kim@example.com',
  name: 'Jane Kim'
  }, {
  integrations: {
    'All': false,
    'Intercom': true,
    'Google Analytics': true,
  }
});
```

{% codeexample %}
{% codeexampletab JavaScript %}
```js
console.log('example');
```
{% endcodeexampletab %}

{% codeexampletab HTML %}
```html
<div id="example"></div>
```
{% endcodeexampletab %}

{% codeexampletab CSS %}
```css
#example { color: red; }
```
{% endcodeexampletab %}
{% endcodeexample %}

---

## Reference Buttons

-  Regular - links to any external resource

{% include components/media-icon.html href="https://segment.com" icon="media/icon-academy.svg" title="Segment" content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ratione ipsum fugiat nostrum velit iure, molestiae accusamus tempora quos laborum, ex modi illum delectus." %}

-  Related - links to an internal docs page (note the `variant="related"` which adds the `segment.com/docs` path in the final build)

{% include components/media-icon.html href="/connections/sources/catalog/" icon="media/icon-academy.svg" title="Sources Catalog" content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ratione ipsum fugiat nostrum velit iure, molestiae accusamus tempora." variant="related" %}

-  Double - side by side buttons (you can use both related and not)

<div class="double">
  {% include components/media-icon.html  href="segment.com" icon="media/icon-academy.svg" title="Segment" content="Lorem ipsum dolor sit amet consectetur, adipisicing elit." %}

  {% include components/media-icon.html  href="/connections/sources/catalog/" icon="media/icon-academy.svg" title="Sources Catalog" content="Lorem ipsum dolor sit amet consectetur, adipisicing elit." variant="related" %}
</div>

---

## Notes

> note ""
> **NOTE:** Our [browser and mobile libraries](https://segment.com) **automatically** use Anonymous IDs under the covers to keep track of users as they navigate around your website or app, so you don't need to worry about them when using those libraries.

> note "Server-side tracking"
> Server-side data management is when tag sends data into your web server, then your web server passes that data to the destination system/server. [Find out more](https://segment.com)

---

## Alerts

> info ""
> This is a paragraph showing an information box with a blue information icon. Use this when providing useful details that help a reader understand what's going on, but don't require any immediate action.

> success ""
> This is a paragraph showing an information box with a green checkmark icon. Use this when providing helpful information to a reader that could make their lives better, but that isn't required.

> warning ""
> This is a paragraph showing an information box with an orange warning icon. Use these when you want to caution a reader about something that could have unintended, but not destructive, consequences.

> error ""
> This is a paragraph showing an information box with a red hazard icon. Use this when warning a reader about destructive or non-reversible actions, like deleting a workspace or overwriting data. Don't use this too frequently, or else it makes the readers worry!

---

## FAQ
### Server
{% faq %}
{% faqitem Should I track client or server-side? %}
One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!
{% endfaqitem %}

{% faqitem Should I track client or?|https://segment.com/ %}
One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!
{% endfaqitem %}

{% faqitem Should I track client?|https://segment.com/ %}
One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!
{% endfaqitem %}
{% endfaq %}

### Cloud Sources
{% faq %}
{% faqitem What are cloud sources??|https://segment.com/ %}
One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!
{% endfaqitem %}

{% faqitem Should I track client?|https://segment.com/ %}
One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!
{% endfaqitem %}

{% faqitem Should I track client?|https://segment.com/ %}
One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!
{% endfaqitem %}
{% endfaq %}
