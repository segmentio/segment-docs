import { html } from 'htm/preact';
import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaHits } from '@algolia/autocomplete-js';

// import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  'UINQ2M4D9S', 
  '636b6d9e2dfb207e89ea7344859848f9'
);

autocomplete({
  container: '#autocomplete',
  placeholder: 'Search for the Segment documentation (press / to focus)',
  debug: true,
  detachedMediaQuery:'',
  getSources( {query} ) {
    return [
      {
        sourceId: 'articles',
        getItems() {
          return getAlgoliaHits({
            searchClient,
            queries: [
              {
                indexName: 'segment-docs',
                query,
                params: {
                  hitsPerPage: 5
                },
              },
            ],
          });
        },
        templates: {
          item({ item }){
            if (item.anchor != null) {
              var anchorLink = "#" + item.anchor;
            } else {
              var anchorLink = "";
            }
            return html `<a class="aa-link" href="/docs${item.url}${anchorLink}">
            <p class="aa-title" >${item.title}</h3>
            <p class="aa-heading">${item.headings.join(' >')}</p>
            <p class="aa-content">${item.content}</p></a>
          `;
          },
          noResults() {
            return 'no results';
          }
        }
      }
    ];
  },
});
