---
title: test tier table
hidden: true
---


there should be a Personas grid below here.
<br><br><br>
{% include content/plan-grid.md name="personas" %}


there should be a Privacy Portal grid below here.
<br><br><br>
{% include content/plan-grid.md name="privacy" %}


there should be an Access Management grid below here.
<br><br><br>
{% include content/plan-grid.md name="iam" %}



✅ ⬜️ &#10004; &#10133;

 hmmm hello

&#10004; &#10133; [Business tier add-on](https://segment.com/pricing/)

otherwise


&#9745; &#10133; [Add-on available](https://segment.com/pricing/)

{% assign thisProduct2 = "personas" %}
{% assign productData2 = site.data.products.items | where: "slug", thisProduct | first %}
{% assign productTiers = productData2.tiers %}

{% for item in productTiers %}

{% if item[1] == true %}
{{item[0]}} ✅
{% else %}
{{item[0]}} ⬜️
{% endif %}

{% endfor %}
