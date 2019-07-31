<hr/>

{% if integration.methods.identify == true and integration.platforms.server == true %}

{% include content/personas.md %}

{% endif }


{% if integration.components %}

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
    <td>{% if device-web integration == true %} ✅ {% endif %}</td>
    <td>{% if device-mobile integration == true %} ✅ {% endif %}</td>
    <td>{% if device-server integration == true %} ✅ {% endif %}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-based</td>
    <td>{% if cloud-web integration == true %} ✅ {% endif %}</td>
    <td>{% if cloud-mobile integration == true %} ✅ {% endif %}</td>
    <td>{% if cloud-server integration == true %} ✅ {% endif %}</td>
  </tr>
</table>

To learn more about about Connection Modes and what dictates which we support, [see here](https://segment.com/docs/integrations/#connection-modes).

{% endif %}

{% if integration.browserUnbundlingSupported == true and integration.browserUnbundlingPublic == true %}
We offer an optional **Cloud-based** Connection Mode for **Web** data with {{ integration.name }}. As a reminder, this removes the {{ integration.name }} javascript library from your site, improving performance.
{% if integration.browserUnbundlingChangelog == true %} However, there are a few disparities between the Cloud-based and Device-based connection modes to keep in mind brefore enabling it in the Segment app. When you enable the **Cloud-based** destination mode, here's what happens:

<!--{% comment% } I don't know if this even works anymore {% comment %}-->

{{ integration.browserUnbundlingIntegrationChangelog }}
{{ integration.browserUnbundlingChangelog }}

{% endif %}
{% endif %}

{% if has-mobile integration == true and has-server integration == true %}}
Segment offers an *optional* **Device-based** Connection Mode for **Mobile** data with {{ @root.integration.name }}. If you'd like to use those features that require client-based functionality, follow the steps above to ensure you have packaged the {{ @root.integration.name }} SDK with Segment's.
{% else %}
This destination *requires* a **Device-based** Connection Mode for **Mobile** data. Follow the steps above to ensure you have packaged the {{ @root.integration.name }} SDK with Segment's.
{% endif %}

## Settings

Segment lets you change these destination settings via your Segment dashboard without having to touch any code.

<!-- I'm not sure how to handle the `each` here  -->
{% for options in integrations %}
{% if hidden == false and label != "Unused"}}
### {{ option.label}}
{{{option.description}}}
{% endif %}
{% endfor %}
