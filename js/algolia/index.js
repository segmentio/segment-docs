import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import {createAlgoliaInsightsPlugin} from '@algolia/autocomplete-plugin-algolia-insights';
import insightsClient from 'search-insights';
import { highlightHit } from './highlight.js';


const sampleAppId = 'latency';
const sampleApiKey = '6be0576ff61c053d5f9a3225e2a90f76';
const envAppId = process.env.ALGOLIA_APP_ID;
const envApiKey = process.env.ALGOLIA_SEARCH_KEY;


const appId = envAppId != null ? envAppId : sampleAppId;
const apiKey = envApiKey != null ? envApiKey : sampleApiKey;
const placeHolder = envApiKey != null ? 'Search the Segment documentation' : 'Search disabled locally'

const searchClient = algoliasearch(appId, apiKey);
const loc = window.location.pathname

//insights
insightsClient('init', { appId, apiKey, useCookie: true });
const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient });

// define locations to separate invocation for mobile and desktop
const locations = ['#autocomplete','#autocomplete-mobile'];
const engage_locations = ['#engage-autocomplete']

function initAutocomplete(item){
  const search = autocomplete({
    container: item,
    placeholder: placeHolder,
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
              var itemUrl = '/docs'+item.url+"#" + item.anchor;
            } else {
              var itemUrl = '/docs'+item.url;
            }
            return itemUrl;
          },
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'segment-docs',
                  query,
                  params: {
                    hitsPerPage: 7,
                    facetFilters: ['hidden:-true','engage:-true'],
                    clickAnalytics: true,
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, createElement  }){
              if (item.anchor != null) {
                var anchorLink = "#" + item.anchor;
              } else {
                var anchorLink = "";
              }
              return createElement('div',{
                dangerouslySetInnerHTML: {
                  __html: `<a class="aa-link" href="/docs${item.url}${anchorLink}">
                     <p class="aa-title" >${highlightHit({hit: item, attribute: 'title'})}</h3>
                     <p class="aa-heading">${item.headings.join(' >')}</p>
                     <p class="aa-content">${highlightHit({hit: item, attribute: 'content'})}</p></a>`
                }
              })
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
        window.location.assign(itemUrl);
      },
      navigateNewTab({ itemUrl }) {
        const windowReference = window.open(itemUrl, '_blank', 'noopener');
  
        if (windowReference) {
          windowReference.focus();
        }
      },
      navigateNewWindow({ itemUrl }) {
        window.open(itemUrl, '_blank', 'noopener');
      },
    },
  });
  
}

function initEngageAutocomplete(item){
  const search = autocomplete({
    container: item,
    placeholder: "Search the Twilio Engage documentation",
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
              var itemUrl = '/docs'+item.url+"#" + item.anchor;
            } else {
              var itemUrl = '/docs'+item.url;
            }
            return itemUrl;
          },
          getItems() {
            return getAlgoliaResults({
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
            item({ item, createElement  }){
              if (item.anchor != null) {
                var anchorLink = "#" + item.anchor;
              } else {
                var anchorLink = "";
              }

              if (item.engage){
                var engage = "<span class='engage-pill'>Engage</span>"
              }
              return createElement('div',{
                dangerouslySetInnerHTML: {
                  __html: `<a class="aa-link" href="/docs${item.url}${anchorLink}">
                     <p class="aa-title" >${highlightHit({hit: item, attribute: 'title'})} ${engage}</h3>
                     <p class="aa-content">${highlightHit({hit: item, attribute: 'content'})}</p></a>`
                }
              })
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
        window.location.assign(itemUrl);
      },
      navigateNewTab({ itemUrl }) {
        const windowReference = window.open(itemUrl, '_blank', 'noopener');
  
        if (windowReference) {
          windowReference.focus();
        }
      },
      navigateNewWindow({ itemUrl }) {
        window.open(itemUrl, '_blank', 'noopener');
      },
    },
  });
  
}
if (loc.startsWith("/docs/engage")) {
  engage_locations.forEach(initEngageAutocomplete)
} else {
locations.forEach(initAutocomplete);
}