---
title: Dossier test
---


| Destination name  (in beta) | categories | previous names |
| --------------------------- | ---------- | -------------- |
| methods                     |            |                |
|                             |            |                |


{% assign thisDestination = 'adikteev' %}
{% assign destinationInfo = site.data.catalog.destinations.items | where: "slug", thisDestination | first %}

<table>
<tr>
  <td> **[{{ destinationInfo.display_name }}](/docs/{{ destinationInfo.url }})**{% if destinationInfo.status == "PUBLIC_BETA" %} (in beta ℹ️){% endif %}</td>
  <td> other things  </td>
  <td> yet more things </td>
  <td> {{destinationInfo.components}} </td>
</tr>
{% unless destinationInfo.methods.track == false and destinationInfo.methods.page_view == false and destinationInfo.methods.identify == false and destinationInfo.methods.group == false and destinationInfo.methods.alias == false %}
<tr>
  <td colspan="4"> Accepts:{% if destinationInfo.methods.track %} <a href="/docs/connections/spec/track/">Track calls</a>, {% endif %}
  {% if destinationInfo.methods.page_view %} <a href="/docs/connections/spec/page">Page calls</a>, {% endif %}
  {% if destinationInfo.methods.identify %}<a href="/docs/connections/spec/identify">Identify calls</a>, {% endif %}
  {% if destinationInfo.methods.group %} <a href="/docs/connections/spec/group/">Group calls</a>, {% endif %}
  {% if destinationInfo.methods.alias %}<a href="/docs/connections/spec/alias/">Alias calls</a>{% endif %}
  </td>
  <td>
  </td>
</tr>
{% if destinationInfo.connection_modes.device.mobile == true and destinationInfo.connection_modes.device.web == false %}
  <tr><td colspan="4">An on-device mobile library is {% if destinationInfo.connection_modes.cloud.mobile == false %}required{% else %}available{% endif %} for this destination.</td></tr>
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
