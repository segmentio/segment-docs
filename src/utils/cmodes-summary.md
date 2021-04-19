---
title: Connection modes summary tables
hidden: true
---
This page is to help troubleshoot and break down each connection modes situation into plain English that we can use to provide a summary. So far we have 10, and two are weird singletons.



## Accepts everything 🏆

"This destination accepts data from [all Segment library sources](/docs/connections/sources/catalog/) in cloud-mode. It also can accept data from both mobile and web sources in device-mode."

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == true and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == true and destination.connection_modes.device.web == true and destination.connection_modes.device.mobile == true %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}


---
## Device-mode only

### Only mobile device mode

"This destination only accepts data from a mobile source in device-mode. This means that the destination's SDK must run on the users's phone, and you must package the SDK with your mobile project."

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.cloud.server == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == true %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}


### Only web device mode

"This destination only accepts data from an Analytics.js source in device-mode. This means that AJS must package the destination's library and run it in the user's browser."

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

### Accepts data from mobile library sources only

"This destination accepts data from mobile library sources only."

Only accepts data from a Segment mobile source. Not sure how this one weird item works.

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}


### Accepts mobile and server cloud mode, no web cloud mode, no device mode

"This destination accepts data from [mobile](/docs/connections/sources/catalog/#mobile) and [server](/docs/connections/sources/catalog/#server) library sources. It does not accept data using device-mode sources."

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == true and
destination.connection_modes.cloud.server == true and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}

### Accepts all cloud mode, no device mode

"This destination accepts data from [all Segment library sources](/docs/connections/sources/catalog/) in cloud-mode. It does not accept data using device-mode sources."

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




## Accepts mobile and server cloud mode, device mode mobile, no web

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == true and destination.connection_modes.device.web == false or destination.connection_modes.device.mobile == true  %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}



## Accepts all cloud mode, plus one device mode
"This destination accepts data from all library sources in cloud-mode, and also can use a (sourcetype) device-mode."

{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == true and destination.connection_modes.cloud.mobile == true and destination.connection_modes.cloud.server == true %}
{% if destination.connection_modes.device.web == true or destination.connection_modes.device.mobile == true %}
{% unless destination.connection_modes.device.web == true and destination.connection_modes.device.mobile == true %} {%comment%}(two device-modes would make it "all"){%endcomment%}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %} {% if destination.connection_modes.device.mobile %}&nbsp;&nbsp;&nbsp;Mobile{% elsif destination.connection_modes.device.web %}Web{% endif %}
{% endunless%}
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
