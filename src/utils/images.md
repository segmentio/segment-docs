---
title: images
hide_toc: true
hide-feedback: true
---
Images in this list are labeled 3 ways:

1. Locations that do not begin with a `/` are meant to be appended to the value of the heading above the table, and have `/docs/` added at the beginning. For example `privacy/` and `images/privacy-alerts.png` becomes `/docs/privacy/images/privacy-alerts.png`. This makes it a full URL. relative to the root of the site.
2. Some locations already include the full URL.
3. Some locations are hotlinked from external sources. This is bad and we will try to fix.

In the first two cases above, when looking for files in the file system, replace `docs` in the URL with `src` in your computer. So for case 1 above, the location in the repository is `src/privacy/images/privacy-alerts.png`.



{% for folders in site.data.img.image_files %}
{% if folders.images %}
<div>
<h2 style="position: sticky; top: 25px; background-color: white; cursor:pointer" id="{{folders.folder | slugify}}">{{folders.folder}}/</h2>
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
  <td style="width:200px; border: 1px solid red"><code style="max-width: 200px; overflow: scroll">{{image}}</code> - <strong>HOTLINK</strong></td>
  <td style="border: 1px solid red"><a href="{{image}}" target="_blank"><img src="{{image}}" style="width:100%; max-width: 100%; margin: 5px;" /></a></td>
  {% else %}
  <td style="width:200px"><code style="max-width: 200px; overflow: scroll">{{image}}</code></td>
  <td><a href="/docs/{{folders.folder}}/{{image}}" target="_blank"><img src="/docs/{{folders.folder}}/{{image}}" style="width:100%; max-width: 100%; margin: 5px;" /></a></td>
  {% endif %}
  </tr>
  {% endfor %}
</table>
</div>
{% endif %}
{% endfor %}
