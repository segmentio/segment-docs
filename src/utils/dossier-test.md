---
title: Dossier test
---


{% assign thisDestination = 'google-ads-gtag' %}
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
#### {{destinationInfo.display_name}} quick info.
test

**[{{ destinationInfo.display_name }}](/docs/{{ destinationInfo.url }})**{% if destinationInfo.status == "PUBLIC_BETA" %} is in beta, and{% endif %} accepts {{destMethods |  join: ', ' }} calls. If you reference it in the Integrations object, you can call it &ldquo;{{destinationInfo.previous_names | join: '", or "' }}&rdquo;.
{{ destinationInfo.connection_modes.summary }}
{% if destinationInfo.browserUnbundlingSupported %} You can change the {{destinationInfo.display_name}} connection mode for Analytics.js deployments from the destination settings in the Segment web app.
{% endif %}
<hr>

{% comment %}
<table>
<tr>
  <td> **[{{ destinationInfo.display_name }}](/docs/{{ destinationInfo.url }})**{% if destinationInfo.status == "PUBLIC_BETA" %} (in beta ℹ️){% endif %}</td>
  <td> other things  </td>
  <td> yet more things </td>
  <td>  </td>
</tr>
{% unless destinationInfo.methods.track == false and destinationInfo.methods.page_view == false and destinationInfo.methods.identify == false and destinationInfo.methods.group == false and destinationInfo.methods.alias == false %}
<tr>
  <td colspan="3"> Accepts:{% if destinationInfo.methods.track %} <a href="/docs/connections/spec/track/">Track calls</a>, {% endif %}
  {% if destinationInfo.methods.page_view %} <a href="/docs/connections/spec/page">Page calls</a>, {% endif %}
  {% if destinationInfo.methods.identify %}<a href="/docs/connections/spec/identify">Identify calls</a>, {% endif %}
  {% if destinationInfo.methods.group %} <a href="/docs/connections/spec/group/">Group calls</a>, {% endif %}
  {% if destinationInfo.methods.alias %}<a href="/docs/connections/spec/alias/">Alias calls</a>{% endif %}
  </td>
  <td>
  </td>
</tr>

{% endunless %}
</table>








raw:

{{destinationInfo.methods}}

Raw size:
{{destinationInfo.methods.size}}


{% for name in destinationInfo.previous_names %}
{% if forloop.first %}If you reference it in the Integrations object, you can call it
{% elsif forloop.last == true %}, or {% endif %} {{name}} {% if forloop.last == false %}, {% endif %}
{% endfor %}

{% if destinationInfo.connection_modes.device.mobile == true and destinationInfo.connection_modes.device.web == false %}
  <tr><td colspan="4">An on-device mobile library is {% if destinationInfo.connection_modes.cloud.mobile == false %}required{% else %}available{% endif %} for this destination.</td>
  </tr>
{% endif %}
{% if destinationInfo.connection_modes.device.web == false and destinationInfo.connection_modes.device.mobile == false and destinationInfo.connection_modes.device.server == false %}
  <tr><td colspan="4"> {{destinationInfo.display_name}} accepts data only from Sources. No device-mode package is available.</td></tr>
{%endif%}
{% if destinationInfo.connection_modes.cloud.web == false and destinationInfo.connection_modes.cloud.mobile == false and destinationInfo.connection_modes.cloud.server == false %}
  <tr><td colspan="4"> {{destinationInfo.display_name}} only accepts data in device-mode.</td>
  </tr>
{%endif%}
{% endunless %}
</table>

{{destinationInfo}}
{% endcomment %}
