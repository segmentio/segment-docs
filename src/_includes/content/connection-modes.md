<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign currentSlug = page.url | split: "/" | last %}
{% assign currentIntegration = site.data.catalog.destinations.items | where: "slug", currentSlug | first %}
{% assign connectionModes = currentIntegration.connection_modes %}

{% if currentIntegration.components.size > 0 %}
<!--don't show a blank table if we can't find any info about these. -->
<!--
components -> how do we send data
platforms -> what data do we recognize-->



The first step is to make sure {{ currentIntegration.display_name }} supports the source type and connection mode you've chosen to implement. You can learn more about what dictates [the connection modes we support here](https://segment.com/docs/connections/destinations/#connection-modes).

<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-mode</td>
    <td>{% if connectionModes.device.web == true %} ✅ {% endif %}</td>
    <td>{% if connectionModes.device.mobile == true %} ✅ {% endif %}</td>
    <td>{% if connectionModes.device.server == true %} ✅ {% endif %}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-mode</td>
    <td>{% if connectionModes.cloud.web == true %} ✅ {% endif %}</td>
    <td>{% if connectionModes.cloud.mobile == true %} ✅ {% endif %}</td>
    <td>{% if connectionModes.cloud.server == true %} ✅ {% endif %}</td>
  </tr>
</table>
{% endif %}
