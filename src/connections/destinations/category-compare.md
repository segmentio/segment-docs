---
title: Destination comparison by category
---

This page collates information about each destination, organized by category for better comparison shopping.
{% assign overridesList = site.data.catalog.overrides-list.items %}

{% for category in site.data.catalog.destination_categories.items %}

## {{ category.display_name }}

<table>
<tr>
  <th>  </th>
  <th colspan=3 style="border-left: 1px solid gray;">Accepts data from these library types in cloud-mode </th>
  <th colspan=2 style="border-left: 1px solid gray;">Can use these in device-mode</th>
</tr>
<tr>
  <th> Destination </th>
  <th style="border-left: 1px solid gray;"> Web </th>
  <th> Mobile </th>
  <th> Server</th>
  <th style="border-left: 1px solid gray;"> Web </th>
  <th> Mobile </th>
</tr>
{% for destination in site.data.catalog.destinations.items %}
{% if destination.categories contains category.display_name %}
{% unless destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.cloud.server == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false  %}
<tr>
  <td>**[{{ destination.display_name }}](/docs/{{ destination.url }})**</td>
  {% if overridesList contains destination.slug %}{% assign thisDestname = destination.slug %}{% assign thisDest = site.data.catalog.overrides.items | where: "slug", thisDestname | first%}
  <td style="border-left: 1px solid gray;">
  {% if thisDest.connection_modes.cloud.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if thisDest.connection_modes.cloud.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if thisDest.connection_modes.cloud.server %}✅{% else %}⬜️{% endif %} </td>
  <td style="border-left: 1px solid gray;">{% if thisDest.connection_modes.device.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if thisDest.connection_modes.device.mobile %}✅{% else %}⬜️{% endif %} </td>
  {% else %}
  <td style="border-left: 1px solid gray;">
  {% if destination.connection_modes.cloud.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.server %}✅{% else %}⬜️{% endif %} </td>
  <td style="border-left: 1px solid gray;">{% if destination.connection_modes.device.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.device.mobile %}✅{% else %}⬜️{% endif %} </td>
  {%endif%}</tr>
{% endunless %}
{% endif %}
{% endfor %}
</table>


{% endfor %}
