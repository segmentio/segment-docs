---
title: Destinations Connection Modes comparison
---

> info ""
> Destinations displaying an ℹ️ are in Beta.

> success ""
> Comparison shopping? Check out the [destination connection modes by category](/docs/connections/destinations/category-compare/).

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
{% unless destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false and destination.connection_modes.cloud.server == false %}
<tr>
  <td>{% if destination.status == "PUBLIC_BETA" %}ℹ️ {% endif %}[{{ destination.display_name }}](/docs/{{ destination.url }})</td>
  <td>{% if destination.connection_modes.cloud.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.device.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.device.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.server %}✅{% else %}⬜️{% endif %} </td>
</tr>
{% endunless %}
{% endfor %}
</table>

The following destinations have no connection mode information available:
{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false and destination.connection_modes.cloud.server == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %} (beta) {% endif %}
{% endif %}
{% endfor %}
