---
title: Styleguide
description: The styleguide of front-end components
hidden: true
layout: page
faq:
  Source:
    - title : "Should I track client or server-side?"
      content : "One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!"
      link: /sources/catalog
    - title : "What are best practices in identifying users?"
      content : "One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!"
  Cloud Sources:
    - title : "What are cloud sources?"
      content : "One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!"
      link: /sources
    - title : "How do cloud sources work?"
      content : "One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: When to Track on the Client vs Server. It's worth a read!"
      link: /sources/catalog
contributors:
  - name: Paul Mccall
    position: Lead Developer
    image_path: paul-mccall.png
    date: 23.08.2019
  - name: Jane Doe
    position: Lead Developer
    image_path: jane-doe.png
    date: 23.08.2019
  - name: Porter Braun
    position: Lead Developer
    image_path: porter-braun.png
    date: 23.08.2019
  - name: Monica Buck
    position: Lead Developer
    image_path: monica-buck.png
    date: 23.08.2019
---

---

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

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

---

## Table

| Field                    | Type   | Description                                                                                                                    |
|--------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------|
| traits optional          | Object | Free-form dictionary of traits of the user, like email or name. See the Traits field docs for a list of reserved trait names   |
| userId optional/required | String | Unique identifier for the user in your database A userId or an anonymousId is required,See the Identities docs for more detail |

---

## Buttons

{% include components/button.html text="Sign up" href="https://segment.com" %}
{% include components/button-fill.html size="large" text="Yes" href="https://segment.com" %}
{% include components/button.html size="large" text="Yes" href="https://segment.com" %}
{% include components/button-fill.html size="small" text="Sign up" href="https://segment.com" %}
{% include components/button-fill.html size="small" variant="white" text="Yes" href="https://segment.com" %}
{% include components/button-hollow.html size="small" text="Log in" href="https://segment.com" %}
{% include components/button-link.html text="Find out more" href="https://segment.com" %}

---

## Code Blocks

Analytics.js, our Javascript `library`, is the most powerful way to track customer data from your `website`. If you're just starting out, we recommend it over server-side libraries as the simplest installation for any website.

```js
analytics.identify('025pikachu025', {
  email: 'peekAtMe@email.poke',
  name: 'Pikachu'
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

## Media Icons

{% include components/media-icon.html href="#" icon="media/icon-academy.svg" title="Title" content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ratione ipsum fugiat nostrum velit iure, molestiae accusamus tempora quos laborum, ex modi illum delectus. Suscipit nesciunt labore nulla numquam excepturi?" %}
{% include components/media-icon.html href="#" icon="media/icon-academy.svg" title="Title" content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ratione ipsum fugiat nostrum velit iure, molestiae accusamus tempora quos laborum, ex modi illum delectus. Suscipit nesciunt labore nulla numquam excepturi?" variant="related" %}

---

## Notes

> note ""
> **NOTE:** Our [browser and mobile libraries](https://segment.com) **automatically** use Anonymous IDs under the covers to keep track of users as they navigate around your website or app, so you don't need to worry about them when using those libraries.

> note "Server-side tracking"
> Server-side data management is when tag sends data into your web server, then your web server passes that data to the destination system/server. [Find out more](https://segment.com)

---

## Alerts

> info ""
> This is a paragraph showing information box. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum dapibus imperdiet.

> success ""
> This is a paragraph showing information box. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum dapibus imperdiet.

> warning ""
> This is a paragraph showing information box. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum dapibus imperdiet.

> error ""
> This is a paragraph showing information box. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum dapibus imperdiet.

---

## FAQ
### Server
{% faq %}
{% faqitem Should I track client or server-side?|https://segment.com/ %}
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
