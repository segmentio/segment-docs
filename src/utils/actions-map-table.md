---
title: Actions Mapping
---
{% assign configMap = site.data.actions.amplitude.config %}

<style>
tr.no-map td {
  color: #ddd
}


</style>
## Including non-mappable settings

<table>
  <thead>
    <tr>
      <th>Amplitude 1.0 Destination Setting</th>
      <th>Configurable in Amplitude (Actions)?</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    {% for category in configMap %}
    <tr>
      <td colspan="3" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;">{{category.category}}</td>
    </tr>
    {% for setting in category.settings%}
    <tr {%unless setting.configurable%}class="no-map"{%endunless%}>
      <td>{{setting.name}}</td>
      <td>{{setting.configurable}}</td>
      <td>{% if setting.location %}{{setting.location}} <br /> <br /> {% endif %}{{setting.notes}}</td>
    </tr>
    {% endfor %}
    {% endfor %}
  </tbody>
</table>


## Hiding non-mappable settings
<table>
  <thead>
    <tr>
      <th>Amplitude 1.0 Destination Setting</th>
      <th>Location in Amplitude (Actions)</th>
    </tr>
  </thead>
  <tbody>
    {% for category in configMap %}
    <tr>
      <td colspan="3" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;">{{category.category}}</td>
    </tr>
    {% for setting in category.settings%}
    {% if setting.configurable == true %}
    <tr>
      <td>{{setting.name}}</td>
      <td>{% if setting.location %}{{setting.location}} <br /> <br /> {% endif %}{{setting.notes}}</td>
    </tr>
    {% endif %}
    {% endfor %}
    {% endfor %}
  </tbody>
</table>