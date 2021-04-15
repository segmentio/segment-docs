---
title: Dossier test
---


{% assign thisDestination = 'amplitude' %}
{% assign destinationInfo = site.data.catalog.destinations.items | where: "slug", thisDestination | first %}
{% comment %}There are probably prettier ways to generate a list of links to these methods, but this was good enough for me.{% endcomment %}
{% assign destMethods = "" | split: ", " %}
{% assign methodName = "" | split: " " %}
{% for method in destinationInfo.methods %}
{%if method[1]%}
{% assign methodName = method[0] | split: "_" | first | capitalize%}
{% assign methodUrl = '<a href="/docs/connections/spec/' | append: methodName | downcase%}
{% assign methodUrl = methodUrl | append: '/">' %}
{% assign methodHTML = methodUrl | append: methodName %}
{% assign methodHTML = methodHTML | append: '</a>' %}
{% assign destMethods = destMethods | push: methodHTML %} {%endif%}
{% endfor %}
{% assign destMethods = destMethods| reverse %}

<hr>
#### {{destinationInfo.display_name}} quick info

<img style="max-width: 35px; max-height: 35px;" alt="{{destinationInfo.display_name}}" src="{{destinationInfo.mark.url}}">
**{{ destinationInfo.display_name}**{% if destinationInfo.status == "PUBLIC_BETA" %} is in beta, and{% endif %} accepts
{% for method in destMethods%}{% if destMethods.size == 1 %}{{method}} calls.{% else %}{% unless forloop.last == true %}{{method}}, {% endunless %}{% if forloop.last == true%}and {{method}} calls.{%endif%}{% endif %}{% endfor %} If you reference it in the [Integrations object](/docs/guides/filtering-data/#filtering-with-the-integrations-object), you can call it &ldquo;{{destinationInfo.previous_names | join: '", or "' }}&rdquo;.

{% unless destinationInfo.connection_modes.type == "0" %}
{{ destinationInfo.display_name }} {{ destinationInfo.connection_modes.summary }} {% if destinationInfo.connection_modes.case == "mixed" %}  {{destinationInfo.display_name}} accepts device-mode data from {% if destinationInfo.connection_modes.device.mobile and destinationInfo.connection_modes.device.web %} mobile and web{% elsif destinationInfo.connection_modes.device.mobile %} mobile{% elsif destinationInfo.connection_modes.device.web %} web{% endif %} sources.{% endif %} {% if destinationInfo.browserUnbundlingSupported %} You can change the {{destinationInfo.display_name}} connection mode for Analytics.js sources from the destination settings in the Segment web app.
{% endif %}
{% endunless %}
<hr>

<img style="max-width: 35px; max-height: 35px;" alt="{{destinationInfo.display_name}}" src="{{destinationInfo.logo.url}}">



<img style="max-width: 35px; max-height: 35px;" alt="{{destinationInfo.display_name}}" src="{{destinationInfo.mark.url}}">

<img class="thumbnail-integration__logo image" alt="{{destinationInfo.display_name}}" src="{{destinationInfo.mark.url}}">
