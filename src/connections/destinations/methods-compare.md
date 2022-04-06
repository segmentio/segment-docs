---
title: Destination methods comparison
hidden: true
---

This page lists which [Segment methods](/docs/connections/spec/) each destination can consume.

> info ""
> Destinations displaying an ℹ️ are in Beta.

<table>
<tr>
  <th> Destination </th>
  <th> <a href="/docs/connections/spec/track/">Track 🛤</a> </th>
  <th> <a href="/docs/connections/spec/page/">Page 📄</a> </th>
  <th> <a href="/docs/connections/spec/identify/">Identify</a> 🔎 </th>
  <th> <a href="/docs/connections/spec/group/">Group 👥</a> </th>
  <th> <a href="/docs/connections/spec/alias/">Alias 🏷</a> </th>
</tr>
{% for destination in site.data.catalog.destinations.items %}
{% unless destination.methods.track == false and destination.methods.page == false and destination.methods.identify == false and destination.methods.group == false and destination.methods.alias == false %}
<tr>
  <td>{% if destination.status == "PUBLIC_BETA" %}ℹ️ {% endif %}**[{{ destination.display_name }}](/docs/{{ destination.url }})**</td>
  <td>{% if destination.methods.track %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.methods.page %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.methods.identify %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.methods.group %}✅{% else %}⬜️{% endif %} </td>
  <td>{% if destination.methods.alias %}✅{% else %}⬜️{% endif %} </td>
</tr>
{% endunless %}
{% endfor %}
</table>


#### The following destinations have no method information available:
{% for destination in site.data.catalog.destinations.items %}
{% if destination.methods.track == false and destination.methods.page == false and destination.methods.identify == false and destination.methods.group == false and destination.methods.alias == false %}
- [{{ destination.display_name }}](/docs/{{ destination.url }}){% if destination.status == "PUBLIC_BETA" %} (beta){% endif %}
{% endif %}
{% endfor %}
