---
title: Verify Destination Connection Modes
hidden: true
tests:
- test-1:
  name: Test 1
  cases:
    - Google Analytics
    - Mixpanel
    - Amplitude
  reference:
    device:
      web: true
      mobile: true
      server: false
    cloud:
      web: true
      mobile: true
      server: true
- test-2:
  name: Test 2
  cases:
    - ClearBrain
    - Amazon Kinesis
    - Amazon Kinesis Firehose
    - Help Scout
    - Impact
  reference:
    device:
      web: false
      mobile: false
      server: false
    cloud:
      web: true
      mobile: true
      server: true
- test-3:
  name: Test 3
  cases:
    - Algolia Insights
  reference:
    device:
      web: false
      mobile: false
      server: false
    cloud:
      web: true
      mobile: false
      server: false
- test-4:
  name: Test 4
  cases:
    - Firebase
  reference:
    device:
      web: false
      mobile: true
      server: false
    cloud:
      web: false
      mobile: false
      server: false
- test-5:
  name: Test 5
  cases:
    - Google Tag Manager
    - Pinterest Tag
  reference:
    device:
      web: true
      mobile: false
      server: false
    cloud:
      web: false
      mobile: false
      server: false
- test-6:
  name: Test 6
  cases:
    - Criteo App & Web Events
    - Doubleclick Floodlight
  reference:
    device:
      web: true
      mobile: false
      server: false
    cloud:
      web: false
      mobile: true
      server: false 
- test-7:
  name: Test 7
  cases:
    - Hubspot
  reference:
    device:
      web: true
      mobile: false
      server: false
    cloud:
      web: false
      mobile: true
      server: true 
---
Use this page to verify that the static table at the top of each section matches the API generated tables below it. Any mismatches indicate a change in the API that requires further research to determine impact to the main Connection Modes table [here](docs/connections/destinations/cmodes-compare/).

Mismatches are shown highlighted in Red.

{% for test in page.tests %}
<h2 id="{{test.name | slugify}}">{{test.name}}</h2>

<ul>
  {% for case in test.cases %} <li><a href="/docs/connections/destinations/catalog/{{case | slugify}}">{{case}}</a></li> {% endfor %}
</ul>

### Reference
{% assign reference = test.reference %}

<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-mode</td>
    <td>{% if reference.device.web == true %} ✅ {% endif %}</td>
    <td>{% if reference.device.mobile == true %} ✅ {% endif %}</td>
    <td>{% if reference.device.server == true %} ✅ {% endif %}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-mode</td>
    <td>{% if reference.cloud.web == true %} ✅ {% endif %}</td>
    <td>{% if reference.cloud.mobile == true %} ✅ {% endif %}</td>
    <td>{% if reference.cloud.server == true %} ✅ {% endif %}</td>
  </tr>
</table>


{% for case in test.cases %}
{% assign slug = case | slugify %}
{% assign currentIntegration = site.data.catalog.destinations.items | where: "slug", slug | first %}
{% assign connectionModes = currentIntegration.connection_modes %}
<h3>{{currentIntegration.display_name}}</h3>
<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-mode</td>
    <td style="{% if connectionModes.device.web != reference.device.web %}background-color:rgba(255,0,0,.4){% endif %}">{% if connectionModes.device.web == true %} ✅ {% endif %}</td>
    <td style="{% if connectionModes.device.mobile != reference.device.mobile %}background-color:rgba(255,0,0,.4){% endif %}">{% if connectionModes.device.mobile == true %} ✅ {% endif %}</td>
    <td style="{% if connectionModes.device.server != reference.device.server %}background-color:rgba(255,0,0,.4){% endif %}">{% if connectionModes.device.server == true %} ✅ {% endif %}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-mode</td>
    <td style="{% if connectionModes.cloud.web != reference.cloud.web %}background-color:rgba(255,0,0,.4){% endif %}">{% if connectionModes.cloud.web == true %} ✅ {% endif %}</td>
    <td style="{% if connectionModes.cloud.mobile != reference.cloud.mobile %}background-color:rgba(255,0,0,.4){% endif %}">{% if connectionModes.cloud.mobile == true %} ✅ {% endif %}</td>
    <td style="{% if connectionModes.cloud.server != reference.cloud.server %}background-color:rgba(255,0,0,.4){% endif %}">{% if connectionModes.cloud.server == true %} ✅ {% endif %}</td>
  </tr>
</table>
{% endfor %}


{% endfor %}







