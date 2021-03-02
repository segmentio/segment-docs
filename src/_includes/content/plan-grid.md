{% assign thisProduct = include.name %}
{% assign productData = site.data.products.items | where: "slug", thisProduct | first %}

<table>
  <tr>
    <th></th>
    <th> Available to: </th>
    <th> Free </th>
    <th> Team </th>
    <th> Business </th>
  </tr>
  <tr>
    <td> {{ productData.product_display_name }} </td>
    <td></td>
    <td> {% if productData.tiers.free %}✅{% else %}⬜️{% endif %} </td>
    <td> {% if productData.tiers.team %}✅{% else %}⬜️{% endif %} </td>
    <td> {% if productData.tiers.business == true and productData.tiers.add-on == false %}✅{% elsif productData.tiers.business == true and productData.tiers.add-on == true %} ✅ &#10133; Add-on <a href="https://segment.com/pricing/">available</a>{% else %}⬜️{% endif %} </td>
  </tr>
</table>
