---
title: Destinations Connection Modes comparison
---

> info ""
> Destinations displaying an ℹ️ are in Beta.

> success ""
> Comparison shopping? Check out the [destination connection modes by category](/docs/connections/destinations/category-compare/).

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
{% unless destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false and destination.connection_modes.cloud.server == false %}
<tr>
  <td>[{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}</td>
  <td style="border-left: 1px solid gray;">{% if destination.connection_modes.cloud.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.mobile %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.cloud.server %}✅{% else %}⬜️{% endif %} </td>
  <td style="border-left: 1px solid gray;">{% if destination.connection_modes.device.web %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.connection_modes.device.mobile %}✅{% else %}⬜️{% endif %} </td>
</tr>
{% endunless %}
{% endfor %}
</table>

##### The following destinations have no connection mode information available:
{% for destination in site.data.catalog.destinations.items %}
{% if destination.connection_modes.cloud.web == false and destination.connection_modes.cloud.mobile == false and destination.connection_modes.device.web == false and destination.connection_modes.device.mobile == false and destination.connection_modes.cloud.server == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %}&nbsp;ℹ️{% endif %}
{% endif %}
{% endfor %}
