---
title: Release Notes Test
hide_toc: true
---

{% assign notes = site.data.release-notes.notes %}
{% for note in notes %}
<article class="release-note">
  <h2 id="{{note.slug }}">{{ note.title }}</h2>
  <div class="release-note__body">
    <main>
      <p>{{ note.description }}</p>
    </main>
  </div>
</article>
{% endfor %}
