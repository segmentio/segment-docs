---
title: Formatting guide
description: The styleguide of front-end components
hidden: true
layout: page
related:
  - "/connections/sources/catalog/"
  - "/connections/sources/"
redirect_from: '/styleguide/'
---

---

## Headings

# Heading 1

The H1 heading size is equivalent to a title. Please don't use it in a page. Use the `title: ` frontmatter instead.

## Heading 2

H2s are programmatically recorded to form the table of contents in the right-nav.

### Heading 3

H3 is a nice, friendly heading without anything special.

#### Heading 4

H4 is good for making FAQs when you want the text a little bigger than its surrounding prose.

##### Heading 5

H5 is good for making FAQs when you want the text about the same size as the surrounding prose.


---

## Text underline

{:.underline}
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

{:.underline}
#### Heading with underline

---

## Lists

1. Item lorem ipsum dolor sit amet
2. Item lorem ipsum dolor sit amet
    1. Item nested lorem ipsum dolor sit amet
    2. Item nested lorem ipsum dolor sit amet
3. Item lorem ipsum dolor sit amet
    1. Item nested lorem ipsum dolor sit amet
    2. Item nested lorem ipsum dolor sit amet
    3. Item nested lorem ipsum dolor sit amet
3. Item lorem ipsum dolor sit amet

* Unordered list item
* Unordered list item
* Unordered list item
  - Subitem
  - Subitem
* Unordered list item

### Two columns list
Add `{: .columns}` before a list you want to divide into two columns.

{: .columns}
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

{% include components/button-fill.html text="Primary button" href="https://segment.com" %}
{% include components/button-hollow.html text="Secondary button" href="https://segment.com" %}
{% include components/button-fill.html variant="white" text="Minimal Button" href="https://segment.com" %}
{% include components/button-fill.html variant="error" text="Error button" href="https://segment.com" %}
{% include components/button-link.html text="Link button" href="https://segment.com" %}

#### Button Modifiers

{% include components/button-fill.html modifier="expand" text="Expanded filled button" href="https://segment.com" %}

## Reference Buttons

-  **Regular** - links to any external resource

{% include components/reference-button.html
  href="https://segment.com"
  icon="media/academy.svg"
  title="External resource"
  description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ratione ipsum fugiat nostrum velit iure, molestiae accusamus tempora quos laborum, ex modi illum delectus."
%}

-  **Related** - links to an internal docs page (note the `variant="related"` which adds the `https://segment.com/docs` path in the final build)

{% include components/reference-button.html
  href="/connections/sources/catalog/"
  variant="related"
  icon="chart.svg"
  title="Totally new to Analytics?"
  description="For a more hands-on tutorial of Segment, check out Segment University. It offers step-by-step instructions, starting with first steps and going through some of our more advanced features."
%}

-  **Double** - side by side buttons (you can use both related and not)

<div class="double">
  {% include components/reference-button.html
    href="https://segment.com"
    icon="git-repo.svg"
    title="Segment for Developers"
    description="An overview of the basics of your Segment implementation."
  %}

  {% include components/reference-button.html
    href="https://segment.com"
    icon="book.svg"
    title="How-To Guides"
    description="Over a dozen how-to guides to help you accomplish common tasks."
  %}
</div>

- **Back/Next buttons**

<div class="double">
  {% include components/reference-button.html
    href="https://segment.com"
    icon="symbols/arrow-left.svg"
    title="What is Segment?"
    description="The basics of the Segment platform and what you can do with it."
    subtitle="back"
  %}

  {% include components/reference-button.html
    href="https://segment.com"
    icon="symbols/arrow-right.svg"
    title="Planning a Full Installation"
    description="Think through your goals, plan your calls, and set yourself up for success."
    subtitle="next"
  %}
</div>

- **Three columns layout** - created with `flex` utility

<div class="flex flex--wrap gutter gutter--large">
  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="https://segment.com"
      title="Segment calls"
      description="Use Track, Page, and Identify, and learn about the other calls Segment tracking is built on."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="https://segment.com"
      title="Common traits"
      description="Save time by letting the Segment calls collect information automatically."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="https://segment.com"
      title="Use case specs"
      description="Use our business-case specs to ensure that your tools get the most from your data."
    %}
  </div>
</div>

---

## Code Blocks

Analytics.js, our JavaScript `library`, is the most powerful way to track customer data from your `website`. If you're just starting out, we recommend it over server-side libraries as the simplest installation for any website.

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

## Code Blocks with tabs

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

## Notes

> note ""
> **NOTE:** Our [browser and mobile libraries](https://segment.com) **automatically** use Anonymous IDs under the covers to keep track of users as they navigate around your website or app, so you don't need to worry about them when using those libraries.

> note "Server-side tracking"
> Server-side data management is when tag sends data into your web server, then your web server passes that data to the destination system/server. [Find out more](https://segment.com)

---

## Alerts

> info "Info message."
> This is a paragraph showing an information box with a blue information icon. Use this when providing useful details that help a reader understand what's going on, but don't require any immediate action.

> success "Success message."
> This is a paragraph showing an information box with a green checkmark icon. Use this when providing helpful information to a reader that could make their lives better, but that isn't required.

> warning "Warning message."
> This is a paragraph showing an information box with an orange warning icon. Use these when you want to caution a reader about something that could have unintended, but not destructive, consequences.

> error "Error message."
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
