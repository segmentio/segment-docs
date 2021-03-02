{% assign thisProduct = include.name %}
{% assign productData = site.data.products.items | where: "slug", thisProduct | first %}
<style>
table.plan tr td {
  padding: 12px;
  text-align: center;
}


</style>
<div class="flex flex--wrap waffle" style="margin-top: -25px;margin-bottom: 40px;">
{% if productData.tiers.free %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--primary">Free ✓</span>
</div>
{% else %}
<div class="flex__column flex__column--shrink">
        <span class="badge badge--gray" style="opacity:0.2">Free x</span>
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



<!-- <h2>{{ productData.product_display_name }} compatibility</h2>
<table class="plan" style="max-width:375px">
  <tr>
    <td>Free</td>
    <td>Team</td>
    <td>Business</td>
    <td>Add-on</td>
  </tr>
  <tr>
    <td> {{ productData.product_display_name }} </td>
    <td></td>
    <td> {% if productData.tiers.free %}✅{% else %}⬜️{% endif %} </td>
    <td> {% if productData.tiers.team %}✅{% else %}⬜️{% endif %} </td>
    <td> {% if productData.tiers.business == true and productData.tiers.add-on == false %}✅{% elsif productData.tiers.business == true and productData.tiers.add-on == true %} ✅ &#10133; Add-on <a href="https://segment.com/pricing/">available</a>{% else %}⬜️{% endif %} </td>
  </tr>
</table> -->
