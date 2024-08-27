---
title: Release Notes Test
hide_toc: true
---

{% assign notes = site.data.release-notes.notes %}
{% for note in notes reversed %}
<article class="release-note-card">
<div class="release-note-card--box">
  <span class="release-note-card--note-header">{{ note.title }}</span>
  <span class="badge badge--purple">{{ note.release-stage }}</span>
  {% assign plans = note.plan %}
    {% for plan in plans %}
    <span class="badge badge">{{ plan }}</span>
    {% endfor %}
  {% assign product-area = note.product-area %}
    {% for item in product-area %}
    <span class="badge badge--success">{{ item }}</span>
    {% endfor %}
<div class="release-note-card--content">
  <main>
    <p>{{ note.description }}</p>
    <small class="release-note-card--date">Released {{ note.date }}</small>
  </main>
</div>
</div>
</article>
{% endfor %}