---
title: Connection Modes Calculation
---


{% assign destinations = site.data.catalog.destinations.items %}


<table>
<thead>
<th>Integration</th>
<th>Components - Device</th>
<th>Platforms - Device </th>
</thead>
<tbody>
{% for destination in destinations %}
<tr>
<td>{{destination.name}}</td>
<td><ul>{% for cmode in destinations.connection_modes.device %}<li>{{cmode}}</li>{%endfor%}</ul></td>
<td><ul>{% for cmode in destinations.connection_modes_new.device %}<li>{{cmode}}</li>{%endfor%}</ul></td>
</tr>
{% endfor %}
</tbody>
</table>