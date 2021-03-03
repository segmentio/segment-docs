{% assign thisProduct = include.name %}
{% assign productData = site.data.products.items | where: "slug", thisProduct | first %}
{% assign productTiers = productData.tiers %}


<div class="popover" data-popover data-active-class="popover--active">
<div class="flex flex--wrap waffle" style="margin-top: -25px;margin-bottom: 40px;" >

{% for item in productTiers %}
{% if item[1] == true %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--{% if item[0] == 'add-on' %}success{% else %}primary{%endif%}"> {{item[0] | capitalize }} ✓ </span>
</div>
{% else %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--gray" style="opacity:0.2"> {{item[0] | capitalize }} x </span>
        </div>
{% endif %}

{% endfor %}
<div class="flex__column flex__column--shrink" style="padding-top:0px">
<a class="recent-contributor__button button-link" href="#" data-popover-target="contributors">?</a>
</div>
</div>



<div class="popover__body" data-popover-body="contributors">
{% if productData.tiers.add-on %}
<p style="font-size:12px">{{productData.product_display_name}} is available as an add-on for Business tier accounts only. For more information, contact support.</p>
{% else %}
<p style="font-size:12px">{{productData.product_display_name}} is available as an add-on for the displayed account tiers only. For more information, contact support.</p>
{% endif %}
</div>
</div>


<!--
{% if productData.tiers.free %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--primary">Free ✓</span>
</div>
{% else %}
Free x</span>
</div>
{% endif %}
{% if productData.tiers.team %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--success">Team ✓</span>
</div>
{% else %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--gray" style="opacity:0.2">Team x</span>
</div>
{% endif %}
{% if productData.tiers.business %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--primary">Business ✓</span>
</div>
{% else %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--gray" style="opacity:0.2">Business x</span>
</div>
{% endif %}
{% if productData.tiers.add-on %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--success">+ Add-on</span>
</div>
{% else %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--gray" style="opacity:0.2">Add-on x</span>
</div>
{% endif %}
</div>

-->
