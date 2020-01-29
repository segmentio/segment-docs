---
title: Destination comparison
hidden: true
---

> info ""
> Destinations displaying an ℹ️ are in Beta.

<table>
<tr>
  <th> Destination </th>
  <th> Cloud - Web </th>
  <th> Cloud - Mobile </th>
  <th> Device - Web </th>
  <th> Device - Mobile </th>
  <th> Server to Server </th>
</tr>
{% for destination in site.data.catalog.destinations.items %}
<tr>
  <td>{% if destination.status == "PUBLIC_BETA" %}ℹ️{% endif %}[{{ destination.display_name }}](/docs/{{ destination.url }})</td>
  <td>{% if destination.connection_modes.cloud.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.device.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.device.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.server %}✅{% else %}⬜️{% endif %} </td>
</tr>
{% endfor %}
</table>
