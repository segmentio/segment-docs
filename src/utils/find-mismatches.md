---
title: Mismatch finder
---

<table>
<tr>
  <th> Destination</th>
  <th> Mismatch: "name" vs slug </th>
</tr>
{% for destination in site.data.catalog.destinations.items %}
{% assign slugified_name = destination.name| split: "/" | last %} {% unless slugified_name contains destination.slug %}
  <tr><td>[{{ destination.display_name }}](/docs/{{ destination.url }})</td>
  <td>{{slugified_name}} vs. {{ destination.slug }} </td></tr>{%endunless%}
{% endfor %}
</table>


<table>
<tr>
  <th> Destination display name </th>
  <th> Mismatch? </th>
  <th> Name </th>
  <th> Slug </th>
</tr>

{% for destination in site.data.catalog.destinations.items %}
<tr>
  <td>[{{ destination.display_name }}](/docs/{{ destination.url }})</td>
  <td>{% assign slugified_name = destination.name| split: "/" | last %} {% unless slugified_name contains destination.slug %}❗️{%endunless%}</td>
  <td>{{slugified_name}} </td>
  <td>{{ destination.slug }}</td>
</tr>
{% endfor %}
</table>
