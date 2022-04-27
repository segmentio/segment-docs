{% assign versions = page.versions %}

<div class="premonition info">
<div class="fa fa-info-circle"></div>
<div class="content">
<p class="header">Additional versions of this destination are available</p>
<p>This page is about the {{page.title}}. See below for information about other versions of the {{page.title | split: " " | first}} destination:
<ul>
{% for version in versions%}
<li><a href="{{version.link}}">{{version.name}}</a></li>

{% endfor %}
</ul>
</p>


</div>
</div>