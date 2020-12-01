---
title: Segment Documentation
layout: home
landing: true
hide-sidebar: true
---

Learn how to use Segment to collect, responsibly manage, and integrate your customer data with hundreds of tools.

<!-- {% comment %} {% include components/callout-mobile.html heading="Segment Platform" content="Integrate once. Connect your entire stack." buttonText="Learn more about Segment" buttonHref="https://segment.com" %}{% endcomment %} -->

{% for section in site.data.landing.sections %}
  {% unless section.section_title == false %}
  <h2>{{section.section_title}}</h2>
  {% endunless %}
  {{section.section_description}}

  <div class="flex flex--wrap waffle waffle--large">
    {% for category in section.section %}
      {% if category.icon and category.icon != empty %}
        {% assign iconPath = "media/" | append: category.icon %}
      {% else %}
        {% assign iconPath = "" %}
      {% endif %}
      <div class="flex__column flex__column--{{section.section_col}} flex">
        {% include components/reference-button.html
          href=category.path
          icon=iconPath
          title=category.name
          description=category.description
        %}
      </div>
    {% endfor %}
  </div>
{% endfor %}

## Additional Resources

{% include components/reference-button.html
  href="https://segment.com"
  icon="media/icon-academy.svg"
  title="Totally new to Analytics?"
  description="Segment’s Analytics Academy walks you through the wide world of analytics, including best practices, an overview of the most popular tools, and case studies of how other developers have achieved success."
%}

{% include components/reference-button.html
  href="https://segment.com"
  icon="media/icon-academy.svg"
  title="Want more hands-on guidance?"
  description="For a more hands-on tutorial of Segment, check out Segment University. It offers step-by-step instructions, starting with first steps and going through some of our more advanced features."
%}
