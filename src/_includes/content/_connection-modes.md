<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign currentSlug = page.url | split: "/" | last %}
{% assign overrideInfo = site.data.catalog.overrides.items % | where: "slug", currentSlug | first %}



{% assign currentIntegration = site.data.catalog.destinations.items | where: "slug", currentSlug | first %}


{% if page.cmode-override %}
{% assign connectionModes = overrideInfo.connection_modes %}
{% else %}
{% assign connectionModes = currentIntegration.connection_modes %}
{% endif %}

{% if currentIntegration.components.size > 0 %}
<!--don't show a blank table if we can't find any info about these. -->
<!--
components -> how do we send data
platforms -> what data do we recognize-->


Before you start, make sure {{ currentIntegration.display_name }} supports the source type and connection mode you've chosen to implement. You can learn more about [connection modes here](https://segment.com/docs/connections/destinations/#connection-modes).

<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-mode</td>
    <td>{% if connectionModes.device.web == true %} ✅ {% else %}⬜️{% endif %}</td>
    <td>{% if connectionModes.device.mobile == true %} ✅ {% else %}⬜️{% endif %}</td>
    <td>⬜️</td>
  </tr>
  <tr>
    <td>☁️  Cloud-mode</td>
    <td>{% if connectionModes.cloud.web == true %} ✅ {% else %}⬜️{% endif %}</td>
    <td>{% if connectionModes.cloud.mobile == true %} ✅ {% else %}⬜️{% endif %}</td>
    <td>{% if connectionModes.cloud.server == true %} ✅ {% else %}⬜️{% endif %}</td>
  </tr>
</table>
{% endif %}
