const client = algoliasearch('UINQ2M4D9S', '636b6d9e2dfb207e89ea7344859848f9');
const docs = client.initIndex('segment-docs');

autocomplete(
  '#autocomplete', {
    hint: false,
    debug: true,
    keyboardShortcuts: ['s', 191],
    templates: {
      dropdownMenu: '<div class="aa-dataset-article"></div>'
    },
  },
  [{
    source: autocomplete.sources.hits(docs, {
      hitsPerPage: 7,
      facetFilters: ['hidden:-true'],
    }),
    displayKey: 'title',
    name: 'article',
    templates: {
      suggestion({
        _highlightResult,
        headings,
        url,
        anchor,
        _snippetResult,
      }) {
        if (anchor != null) {
          var anchorLink = "#" + anchor;
        } else {
          var anchorLink = "";
        }
        return `<a class="aa-link" href="/docs${url}${anchorLink}">
                  <p class="aa-title" >${_highlightResult.title.value}</h3>
                  <p class="aa-heading">${headings.join(' >')}</p>
                  <p class="aa-content">${_snippetResult.content.value}</p></a>
                `;
      },
      empty: '<div class="aa-empty">No matching results</div>',
    },
  }, ]
).on('autocomplete:selected', function (event, suggestion, dataset) {
  if (suggestion.anchor) {
    window.location.href = '/docs' + suggestion.url + '#' + suggestion.anchor;
  } else {
    window.location.href = '/docs' + suggestion.url;
  }
});

window.addEventListener('/', (e) => {
  window.scrollTo(0, 0);
});
