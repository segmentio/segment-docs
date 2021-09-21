import { html } from 'htm/preact';
import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaHits, highlightHit } from '@algolia/autocomplete-js';
import {createAlgoliaInsightsPlugin} from '@algolia/autocomplete-plugin-algolia-insights';
import insightsClient from 'search-insights';


const appId = 'UINQ2M4D9S';
const apiKey = '3ecd0f228971adf2d5a4217789ae1765';
const searchClient = algoliasearch(appId, apiKey);

//insights
insightsClient('init', { appId, apiKey });
const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient });

// define locations to separate invocation for mobile and desktop
const locations = ['#autocomplete','#autocomplete-mobile'];

function initAutocomplete(item){
  const search = autocomplete({
    container: item,
    placeholder: 'Search the Segment documentation',
    debug: false,
    openOnFocus: false,
    keyboardShortcuts: ['s', 191],
    plugins: [algoliaInsightsPlugin,],
    detachedMediaQuery:'none',
    getSources( {query} ) {
      return [
        {
          sourceId: 'articles',
          getItemUrl({ item }){
            if (item.anchor != null) {
              var itemUrl = item.url+"#" + item.anchor;
            } else {
              var itemUrl = item.url;
            }
            return itemUrl;
          },
          getItems() {
            return getAlgoliaHits({
              searchClient,
              queries: [
                {
                  indexName: 'segment-docs',
                  query,
                  params: {
                    hitsPerPage: 7,
                    facetFilters: ['hidden:-true'],
                    clickAnalytics: true,
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
              <p class="aa-title" >${highlightHit({hit: item, attribute: 'title'})}</h3>
              <p class="aa-heading">${item.headings.join(' >')}</p>
              <p class="aa-content">${highlightHit({hit: item, attribute: 'content'})}</p></a>
            `;
            },
            noResults() {
              return html `<p class="aa-content">No results for <strong>${query}</strong></p>`;
            }
          },
          
        },
      ];
    },
    navigator: {
      navigate({ itemUrl }) {
        window.location.assign('/docs'+itemUrl);
      },
    }
  });
  
}

locations.forEach(initAutocomplete);