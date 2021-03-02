{% assign thisProduct = include.name %}
{% assign productData = site.data.products.items | where: "slug", thisProduct | first %}
{% assign productTiers = productData.tiers %}

<style>
table.plan tr td {
  padding: 12px;
  text-align: center;
}


</style>
<div class="flex flex--wrap waffle" style="margin-top: -25px;margin-bottom: 40px;">

{% for item in productTiers %}
{% if item[1] == true %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--primary"> {{item[0] | capitalize }} ✓ </span>
</div>
{% else %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--gray" style="opacity:0.2"> {{item[0] | capitalize }} x </span>
        </div>
{% endif %}

{% endfor %}

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
