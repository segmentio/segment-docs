{% assign name = page.path | replace: "connections", "catalog" | remove: "/index.md" %}
{% assign destination = site.data.catalog.destinations.destinations | where: "name", name | first %}


<h1>{{ name }}</h1>
<h1> {{ destination.display_name }}
Unbundling supported: {{ destination.browserUnbundlingSupported }}
Unbundling public: {{ destination.browserUnbundlingPublic }}
Browser available: {{destination.platforms.browser}}
Server available: {{destination.platforms.server}}


{% for component in destination.components %}
{{ destination.components }} <br>
{% endfor %}</h1>

<!--
components -> how do we send data
platforms -> what data do we recognize-->

{% for components in destination.components %}
  {% if destination.components.type == "IOS" or destination.components.type == "ANDROID" %}
    {% assign has-mobile = true %}
    {% assign device-mobile = true %}
  {% endif %}
  {% if destination.components.type == "WEB" %}
    {% assign has-browser = true %}
    {% assign device-web = true %}
  {% endif %}
  {% if destination.components.type == "CLOUD" %}
    {% assign has-server = true %}
    {% assign device-server = true %}
  {% endif %}
{% endfor %}

<!-- `cloud-web` is complicated -->
{% if has-browser == true and destination.browserUnbundlingSupported == true && destination.browserUnbundlingPublic == true %}
  {% assign cloud-web = true %}
{% elsif has-server == true and has-browser == false and destination.platforms.browser == true %}
  {% assign cloud-web = true %}
{% else %}
  {% assign cloud-web = false %}
{% endif %}

<!-- cloud-mobile only checks for server? -->
{% if has-server == true %}
{% assign cloud-mobile = true %}
{% endif %}

<!-- cloud-server is also complicated -->
{% if has-server == true and destination.platforms.server == true %}
{% assign cloud-mobile = true %}
{% endif %}

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
    <td>{% if device-web == true %} ✅ {% endif %}</td>
    <td>{% if device-mobile == true %} ✅ {% endif %}</td>
    <td>{% if device-server == true %} ✅ {% endif %}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-based</td>
    <td>{% if cloud-web == true %} ✅ {% endif %}</td>
    <td>{% if cloud-mobile == true %} ✅ {% endif %}</td>
    <td>{% if cloud-server == true %} ✅ {% endif %}</td>
  </tr>
</table>
