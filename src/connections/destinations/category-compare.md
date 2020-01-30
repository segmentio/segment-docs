---
title: Destination comparison by category
hidden: true
---

This page collates information about each destination, organized by category for better comparison shopping.

{% for category in site.data.catalog.destination_categories.items %}

## {{ category.display_name }}

<table>
<tr>
  <th> Destination </th>
  <th> Cloud - Web </th>
  <th> Cloud - Mobile </th>
  <th> Device - Web </th>
  <th> Device - Mobile </th>
  <th> Server</th>
</tr>
{% for destination in site.data.catalog.destinations.items %}
{% if destination.categories contains category.display_name %}
{% unless destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false and destination.connection_modes.cloud.server == false %}
<tr>
  <td>**[{{ destination.display_name }}](/docs/{{ destination.url }})**</td>
  <td>{% if destination.connection_modes.cloud.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.device.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.device.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.server %}✅{% else %}⬜️{% endif %} </td>
</tr>
{% endunless %}
{% endif %}
{% endfor %}
</table>


{% endfor %}
