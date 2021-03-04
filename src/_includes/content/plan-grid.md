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
{% if productData.plan-note %}
<p style="font-size:12px"><a href="https://segment.com/pricing">{{productData.plan-note}}</a> For more information, <a href="https://segment.com/help/contact/">contact us</a>.</p>
{% elsif productData.tiers.add-on and productData.tiers.buisiness == false%}
<p style="font-size:12px">{{productData.product_display_name}} is available as an add-on for the displayed plans only. For more information, <a href="https://segment.com/help/contact/">contact us</a>.</p>
{% elsif productData.tiers.add-on and productData.tiers.business %}
<p style="font-size:12px">{{productData.product_display_name}} is available as an add-on for Business plans only. For more information, <a href="https://segment.com/help/contact/">contact us</a>.</p>
{% else %}
<p style="font-size:12px">{{productData.product_display_name}} is available for the listed account plans only. For more information, <a href="https://segment.com/help/contact/">contact us</a>.</p>
{% endif %}
</div>
</div>
