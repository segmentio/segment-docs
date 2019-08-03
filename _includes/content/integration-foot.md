<hr/>
<!--
components -> how do we send data
platforms -> what data do we recognize-->

{% for components in destination %}
  {% if destination.components.type == "ios" or destination.components.type == "android" %}
    {% assign has-mobile = true %}
    {% assign device-mobile = true %}
  {% if destination.components.type == "browser" %}
    {% assign has-browser = true %}
    {% assign device-web = true %}
  {% if destination.components.type == "server" %}
    {% assign has-server = true %}
    {% assign device-server = true %}
{% endfor %}

<!-- `cloud-web` is complicated -->
{% if has-browser == true and browserUnbundlingSupported == true && browserUnbundlingPublic == true %}
  {% assign cloud-web = true %}
{% elseif has-server == true and has-browser == false and destination.platforms.browser == true %}
  {% assign cloud-web = true %}
{% else %}
  {% assign cloud-web = false %}
{% endif %}

<!-- cloud-mobile only checks for server? -->
{% if has-server == true %}
{% assign cloud-mobile = true}
{% endif %}

<!-- cloud-server is also complicated -->
{% if has-server == true and destaintion.platforms.server == true %}
{% assign cloud-mobile = true}
{% endif %}

<!-- if it uses Identify calls and is available on Server, you can use personas?  -->
{% if destination.methods.identify == true and destination.platforms.server == true %}

{% include content/personas.md %}

{% endif }


{% if destination.components %}

## Supported Sources and Connection Modes

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

To learn more about about Connection Modes and what dictates which we support, [see here](https://segment.com/docs/destinations/#connection-modes).

{% endif %}

{% if destination.browserUnbundlingSupported == true and destination.browserUnbundlingPublic == true %}
We offer an optional **Cloud-based** Connection Mode for **Web** data with {{ destination.name }}. As a reminder, this removes the {{ destination.name }} javascript library from your site, improving performance.
{% if destination.browserUnbundlingChangelog %} However, there are a few disparities between the Cloud-based and Device-based connection modes to keep in mind before enabling it in the Segment app. When you enable the **Cloud-based** destination mode, here's what happens:

<!-- holy crap lets NOT expose the changelog wtf has anyone looked at that content-->
{% endif %}
{% endif %}

{% if destination.platforms.mobile == true and destination.platforms.server == true %}}
Segment offers an *optional* **Device-based** Connection Mode for **Mobile** data with {{ destination.name }}. If you'd like to use those features that require client-based functionality, follow the steps above to ensure you have packaged the {{ destination.name }} SDK with Segment's.
{% else %}
This destination *requires* a **Device-based** Connection Mode for **Mobile** data. Follow the steps above to ensure you have packaged the {{ destination.name }} SDK with Segment's.
{% endif %}

## Settings

Segment lets you change these destination settings via your Segment dashboard without having to touch any code.

<!-- I'm not sure how to handle the `each` here  -->
{% for options in destination %}
{% if destination.option.hidden == false and destination.option.label != "Unused" %}
### {{ destination.option.label }}
{{ destination.option.description }}
{% endif %}
{% endfor %}
