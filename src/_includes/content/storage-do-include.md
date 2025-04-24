{% capture title %}{{page.title}}{% endcapture %}
{% capture name %}{{page.title | replace: 'Destination', ''}}{% endcapture %}

<div class="premonition info"><div class="fa fa-info-circle"></div><div class="content"><p class="header">View observability metrics about your {{title}} with Delivery Overview</p><p markdown=1>Delivery Overview, Segment's built-in observability tool, is now in public beta for storage destinations. For more information, see the [Delivery Overview](/docs/connections/delivery-overview/) documentation.</p></div></div>