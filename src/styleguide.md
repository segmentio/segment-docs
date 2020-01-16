---
title: Styleguide
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
  - "/connections/sources/faq/"
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

#### unordered

* Item
    * First Subitem
    * Second Subitem
* Item
    - Subitem
    - Subitem

#### ordered

1. one
2. two
3. three


#### nested ordered

1. one
    1. nested
    2. nested
2. two
    1. nested
    2. nested
3. three
    1. nested
    2. nested
        3. more nested
        4. more nested


#### ordered with start number = 6

{: start="6"}
1. lorem
    2. ipsum
    3. ipsum

#### lower roman

{:.lower-roman}
1. lorem
2. ipsum
    3. nested
    4. nested

#### upper roman

{:.upper-roman}
1. lorem
2. ipsum

#### lower alpha

{:.lower-alpha}
1. lorem
    2. lorem nested
    3. lorem nested
2. ipsum
    3. ipsum nested
    4. ipsum nested
    5. ipsum nested
5. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
6. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.

#### upper alpha

{:.upper-alpha}
1. lorem
2. ipsum
    3. nested
    4. nested

### 2.  Definitions

For purposes of this Addendum, the terms below have the meanings set
forth below. Capitalized terms that are used but not defined in this
Addendum have the meanings given in the Agreement.

{: start="2"}
1. "**Affiliate**" means any entity that directly or indirectly controls, is controlled by or is under common control with the subject entity, where "control" refers to the power to direct or cause the direction of the subject entity, whether through ownership of voting securities, by contract or otherwise.
2. "**CCPA**" means the California Consumer Privacy Act of 2018, as amended from time to time.
3. "**Customer Personal Data**" means any Customer Data (as defined in theAgreement) that is Personal Data. For purposes of this Addendum, Customer Personal Data does not include personal information of employees or other representatives of Customer with whom Segment has a direct business relationship.
4. "**Data Protection Laws**" means, with respect to a party, all privacy,data protection and information security-related laws and regulations applicable to such party's Processing of Personal Data, including, where applicable, EU Data Protection Law and the CCPA.
    5. Lorem
    6. ipsum

### 3. General Termination

{:.lower-alpha}
1. This Addendum forms part of the Agreement and except as expressly set forth in this Addendum, the Agreement remains unchanged and in full force and effect. If there is any conflict between this Addendum and the Agreement, this Addendum shall govern.
2. Any liabilities arising under this Addendum are subject to the limitations of liability in the Agreement.
3. This Addendum will be governed by and construed in accordance with governing law and jurisdiction provisions in the Agreement, unless required otherwise by applicable Data Protection Laws.
4. This Addendum will automatically terminate upon expiration or termination of the Agreement.

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
