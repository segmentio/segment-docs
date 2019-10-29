<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign name = page.path | replace: "connections", "catalog" | remove: "/index.md" %}
{% assign destination = site.data.catalogV2.destinations.items | where: "name", name | first %}
<!--
components -> how do we send data
platforms -> what data do we recognize-->



The first step is to make sure {{ destination.display_name }} supports the source type and connection mode you've chosen to implement. You can learn more about what dictates [the connection modes we support here](https://segment.com/docs/destinations/#connection-modes).

<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-based</td>
    <td>{% if destination.device.web == true %} ✅ {% endif %}</td>
    <td>{% if destination.device.mobile == true %} ✅ {% endif %}</td>
    <td>{% if destination.device.server == true %} ✅ {% endif %}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-based</td>
    <td>{% if destination.cloud.web == true %} ✅ {% endif %}</td>
    <td>{% if destination.cloud.mobile == true %} ✅ {% endif %}</td>
    <td>{% if destination.cloud.server == true %} ✅ {% endif %}</td>
  </tr>
</table>
