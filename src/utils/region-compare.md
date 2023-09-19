---
title: Manual vs Automatic Region Metadata Comparison
hidden: true
published: false
---

<style>
th {
position: sticky;
top: 0;
background-color: #fafbff;
box-shadow: 0 4px 2px -2px gray;

}
</style>    
## Destinations

The table below represents regional information for each destination captured manually, and from the Public API.

Destinations where the manually captured regions include `eu-west-1` and the Public API does not, are highlighted red.

Destinations where the Public API lists `eu-west-1` and the manually captured information does not are highlighted blue-ish.

**TBD**: What do we do with the endpoints as listed. We use these right now to handle the usecase of destinations that can be used in EU-based workspaces, but point to `us-west-2` for data processing.

{% assign destinations = site.data.catalog.destinations.items %}



### All destinations
<table>
<thead>
<th>Destination</th>
<th>Endpoints</th>
<th>Regions</th>
</thead>
<tbody>
{% for destination in destinations %}
<tr {% if destination.endpoints contains "eu-west-1"%} {%unless destination.endpoints_papi contains "eu-west-1" %}style="background: rgba(255,0,0,.1);"{%endunless%}{%endif%} {% if destination.endpoints_papi contains "eu-west-1"%} {%unless destination.endpoints contains "eu-west-1" %}style="background: rgba(0,0,255,.1);"{%endunless%}{%endif%}>
<td>{{destination.name}}</td>
<td style="white-space:nowrap;">{{destination.endpoints | join:'<br/>'}}</td>
<td>{{destination.regions | join:'<br/>'}}</td>
</tr>
{% endfor %}
</tbody>
</table>


## Sources

As far as I can tell, sources do not return any region-related information from the Public API.
{% assign sources = site.data.catalog.sources.items %}


<table>
<thead>
<th>Destination</th>
<th>Manual Regions</th>
<th>Manual Endpoints</th>
<th>PAPI Regions</th>
<th>PAPI Endpoints</th>
</thead>
<tbody>
{% for source in sources %}
<tr>
<td>{{source.display_name}}</td>
<td style="white-space:nowrap;">{{source.endpoints | join:'<br/>'}}</td>
<td>{{source.regions | join:'<br/>'}}</td>
<td style="white-space:nowrap;">{{source.endpoints_papi | join:'<br/>'}}</td>
<td>{{source.regions_papi | join:'<br/>'}}</td>
</tr>
{% endfor %}
</tbody>
</table>