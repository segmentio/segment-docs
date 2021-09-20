import {
  parseAlgoliaHitHighlight,
  parseAlgoliaHitReverseHighlight,
  parseAlgoliaHitSnippet,
  parseAlgoliaHitReverseSnippet,
} from '@algolia/autocomplete-preset-algolia';

function concatParts(parts, {
  highlightPreTag,
  highlightPostTag
}) {
  return parts.reduce((acc, current) => {
    return (acc +
      (current.isHighlighted ?
        `${highlightPreTag}${current.value}${highlightPostTag}` :
        current.value));
  }, '');
}
/**
 * Highlights and escapes the matching parts of an Algolia hit.
 */
export function highlightHit({
  hit,
  attribute,
  highlightPreTag = '<mark>',
  highlightPostTag = '</mark>',
  ignoreEscape,
}) {
  return concatParts(parseAlgoliaHitHighlight({
    hit,
    attribute,
    ignoreEscape,
  }), {
    highlightPreTag,
    highlightPostTag
  });
}
/**
 * Highlights and escapes the non-matching parts of an Algolia hit.
 *
 * This is a common pattern for Query Suggestions.
 */
export function reverseHighlightHit({
  hit,
  attribute,
  highlightPreTag = '<mark>',
  highlightPostTag = '</mark>',
  ignoreEscape,
}) {
  return concatParts(parseAlgoliaHitReverseHighlight({
    hit,
    attribute,
    ignoreEscape,
  }), {
    highlightPreTag,
    highlightPostTag
  });
}
/**
 * Highlights and escapes the matching parts of an Algolia hit snippet.
 */
export function snippetHit({
  hit,
  attribute,
  highlightPreTag = '<mark>',
  highlightPostTag = '</mark>',
  ignoreEscape,
}) {
  return concatParts(parseAlgoliaHitSnippet({
    hit,
    attribute,
    ignoreEscape,
  }), {
    highlightPreTag,
    highlightPostTag
  });
}
/**
 * Highlights and escapes the non-matching parts of an Algolia hit snippet.
 *
 * This is a common pattern for Query Suggestions.
 */
export function reverseSnippetHit({
  hit,
  attribute,
  highlightPreTag = '<mark>',
  highlightPostTag = '</mark>',
  ignoreEscape,
}) {
  return concatParts(parseAlgoliaHitReverseSnippet({
    hit,
    attribute,
    ignoreEscape,
  }), {
    highlightPreTag,
    highlightPostTag
  });
}
