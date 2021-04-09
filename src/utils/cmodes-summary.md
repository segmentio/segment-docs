---
title: Connection modes summary tables
---
This page is to help troubleshoot and break down each connection modes situation into plain English that we can use to provide a summary. So far we have 10, and two are weird singletons.



**Questions from Laura:**
- What are the `Components` used for in CPS/ConfigAPI? They seem abandoned.
- How do you know if there’s a device mode package available for mobile?
- Does device-mode web mean that it’s an AJS package? and you can turn it on from the UI? Or is that unbundling? (`browserUnbundlingPublic`/`browserUnbundlingSupported`?)
- Why aren't there any cmodes for dev center dests?
- Can we say for sure that the "web" device-mode is AJS only?


## Accepts everything 🏆

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == true and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == true and destination.connection_modes.device.web == true and destination.connection_modes.device.mobile == true %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}


---
## Device-mode only

### Only mobile device mode

These items only run on the users's phone.

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.cloud.server == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == true %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}


### Only web device mode

These items only run directly in the user's browser.

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.cloud.server == false and destination.connection_modes.device.web == true and destination.connection_modes.device.mobile == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}

### Both device mode, still no cloud-mode

These items only run in the browser or on the phone, but can't accept data from sources through the Segment servers.

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.cloud.server == false and destination.connection_modes.device.web == true and destination.connection_modes.device.mobile == true %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}

---
## Cloud mode Only

### Accepts mobile cloud mode only

Only accepts data from a Segment mobile source. Not sure how this one weird item works.

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}


### Accepts mobile and server cloud mode, no web cloud mode, no device mode

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == true and
destination.connection_modes.cloud.server == true and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}

### Accepts all cloud mode, no device mode


{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == true and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == true and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false and destination.connection_modes.cloud.server == true %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}

---

## Accepts web and mobile cloud mode, no server

Doesn't accept data from a server source, but does on mobile and web. Might have a device mode. Weird? Not sure how this one weird item works.

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == true and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %} {% if destination.connection_modes.device.web and destination.connection_modes.device.mobile %} &nbsp;&nbsp;&nbsp;Both Web and Mobile device mode{% elsif destination.connection_modes.device.mobile %}&nbsp;&nbsp;&nbsp;Only Mobile available in device-mode{% elsif destination.connection_modes.device.web %}Only Web available in device-mode{% endif %}
{% endif %}
{% endfor %}

## Accepts all cloud mode, plus one or both device mode

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == true and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == true %}
{% if destination.connection_modes.device.web == true or destination.connection_modes.device.mobile == true  %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %} {% if destination.connection_modes.device.web and destination.connection_modes.device.mobile %} &nbsp;&nbsp;&nbsp;Both Web and Mobile{% elsif destination.connection_modes.device.mobile %}&nbsp;&nbsp;&nbsp;Mobile only{% elsif destination.connection_modes.device.web %}Web only{% endif %}
{% endif %}
{% endif %}
{% endfor %}


## No connection modes info available

The following destinations have no connection mode information available:
{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.cloud.server == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}
