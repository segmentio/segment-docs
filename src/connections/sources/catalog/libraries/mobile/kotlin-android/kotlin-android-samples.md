---
title: Analytics for Kotlin Code Samples
strat: swift
---

## Samples
The code samples below demonstrate the implementation of common use cases of the Analytics Kotlin library across different platforms. 

### Sample applications
{% assign resources = site.data.catalog.kotlin_resources.items | where: "categories", "app" %}
{: .columns}
{% for resource in resources %}
- [{{resource.name}}]({{resource.url}}){:target="_blank"}
{%endfor%}

### Sample plugins 
{% assign resources = site.data.catalog.kotlin_resources.items | where: "categories", "plugin" %}
{: .columns}
{% for resource in resources %}
- [{{resource.name}}]({{resource.url}}){:target="_blank"}
{%endfor%}
