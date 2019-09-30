---
title: Styleguide
description: The styleguide of front-end components
hidden: true
layout: page
---

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

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

<<<<<<< HEAD
{% include components/media-icon.html variant="small" href="#" icon="media/owl" title="Title" content="This is my sample note." %}
{% include components/media-icon.html variant="large" href="#" icon="media/owl" title="Title" content="This is my sample note." excerpt="Read more" excerpt-link="#" %}
=======
{% include components/button-link.html text="Find out more" href="https://segment.com" %}

{% capture note %}
  Our [browser and mobile libraries](https://segment.com) **automatically** use Anonymous IDs under the covers to keep track of users as they navigate around your website or app, so you don’t need to worry about them when using those libraries.
{% endcapture %}
{% include components/note.html content=note %}

{% capture server_side_tracking %}
  Server-side data management is when tag sends data into your web server, then your web server passes that data to the destination system/server.
{% endcapture %}
{% include components/note.html title="Server-side tracking" content=server_side_tracking buttonTitle="Find out more" buttonHref="https://segment.com" %}
>>>>>>> develop
