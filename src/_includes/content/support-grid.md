<!--
This include is adapted from the plan-grid.md include.
An additional support-types.yml data file is added to centralize the support type data.
-->
{% assign supportTypesData = site.data.support-types.types %}
{% assign supportType = supportTypesData | where: "slug", page.support_type | first %}
<!-- The line below hides the grid if there's no matching data in sources.yml-->
{% if supportType %}

<div class="popover" data-popover data-active-class="popover--active">
<div class="flex flex--wrap waffle" style="margin-top: 8px;" >

{% for item in supportTypesData %}
{% if item.slug == supportType.slug %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--{% if item.slug == 'community' %}warning{% elsif item.slug == 'legacy' %}gray{% elsif item.slug == 'flagship' %}success{%endif%}"> {{item.display_name | capitalize }} ✓ </span>
</div>
{% else %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--gray" style="opacity:0.2"> {{item.slug | capitalize }} x </span>
        </div>
{% endif %}
{% endfor %}

<div class="flex__column flex__column--shrink" style="padding-top:0px">
  <a class="recent-contributor__button" style="padding: 4px 10px;" href="#" data-popover-target="contributors">?</a>
</div>
</div>

<div class="popover__body" data-popover-body="contributors">
{% if supportType.support-note %}
<p style="font-size:12px">{{supportType.support-note}}</p>
{% endif %}
</div>
</div>
{% endif %}