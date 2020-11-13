---
title: images
hide_toc: true
hide-feedback: true
---

{% for folders in site.data.img.image_files %}
{% if folders.images %}
<h2>{{folders.folder}}</h2>
<table>
  <tr>
  <th>Location</th>
  <th>Thumbnail</th>
  </tr> 
  {% for image in folders.images %}
  <tr>
  {% if image contains "/docs/" %}
  <td style="width:200px"><code style="max-width: 200px; overflow: scroll">{{image}}</code></td>
  <td><a href="{{image}}" target="_blank"><img src="{{image}}" style="width:100%; max-width: 100%; margin: 5px;" /></a></td>
  {% elsif image contains "http" %}
  <td style="width:200px"><code style="max-width: 200px; overflow: scroll">{{image}}</code> - <strong>HOTLINK</strong></td>
  <td><a href="{{image}}" target="_blank"><img src="{{image}}" style="width:100%; max-width: 100%; margin: 5px;" /></a></td>
  {% else %} 
  <td style="width:200px"><code style="max-width: 200px; overflow: scroll">{{image}}</code></td>
  <td><a href="/docs/{{folders.folder}}/{{image}}" target="_blank"><img src="/docs/{{folders.folder}}/{{image}}" style="width:100%; max-width: 100%; margin: 5px;" /></a></td>
  {% endif %}
  </tr>
  {% endfor %}
</table>
{% endif %}
{% endfor %}

