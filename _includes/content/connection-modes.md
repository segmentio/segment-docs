The first step is to make sure {{ destination.title }} supports the source type and connection mode you've chosen to implement. You can learn more about what dictates [the connection modes we support here](https://segment.com/docs/destinations/#connection-modes).


<!--
components -> how do we send data
platforms -> what data do we recognize-->

{% for components in destination %}
  {% if destination.components.type == "ios" or destination.components.type == "android" %}
    {% assign has-mobile = true %}
    {% assign device-mobile = true %}
  {% endif %}
  {% if destination.components.type == "browser" %}
    {% assign has-browser = true %}
    {% assign device-web = true %}
  {% endif %}
  {% if destination.components.type == "server" %}
    {% assign has-server = true %}
    {% assign device-server = true %}
  {% endif %}
{% endfor %}

<!-- `cloud-web` is complicated -->
{% if has-browser == true and browserUnbundlingSupported == true && browserUnbundlingPublic == true %}
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
{% if has-server == true and destaintion.platforms.server == true %}
{% assign cloud-mobile = true %}
{% endif %}

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