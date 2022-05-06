---
title: Destination Filter Query Language
---

Destination Filter Reference documentation can be found in the [main Config API reference docs](https://reference.segmentapis.com/#6c12fbe8-9f84-4a6c-848e-76a2325cb3c5).

Filter Query Language ("FQL") is a simple language for filtering JSON objects used by the Transformations API to conditionally apply transformations. In the Transformations API, FQL statements evaluate to `true` or `false` based on the contents of each Segment event. If the statement evaluates to `true`, the transformation is applied, and if it is `false` the transformation is not applied.

In addition to boolean and equality operators like `and` and `>=`, FQL has built-in functions that make it more powerful such as `contains( str, substr )` and `match( str, pattern )`.

## Examples

Given the following JSON object:

```json
{
  "event": "Button Clicked",
  "type": "track",
  "context": {
    "library": {
      "name": "analytics.js",
      "version": "1.0"
    }
  },
  "properties": {
    "features": ["discounts", "dark-mode"]
  }
}
```

The following FQL statements will evaluate as follows:

| FQL                                                                    | Result  |
| ---------------------------------------------------------------------- | ------- |
| `event = 'Button Clicked'`                                             | `true`  |
| `event = 'Screen Tapped'`                                              | `false` |
| `context.path.path = '/login'`                                         | `false` |
| `type = 'identify' or type = 'track'`                                  | `true`  |
| `event = 'Button Clicked' and type = 'track'`                          | `true`  |
| `match( context.library.version, '1.*' )`                              | `true`  |
| `match( context.library.version, '2.*' )`                              | `false` |
| `type = 'track' and ( event = 'Click' or match( event, 'Button *' ) )` | `true`  |
| `!contains( context.library.name, 'js' )`                              | `false` |
| `'dark-mode' in properties.features`                                   | `true`  |
| `'blink' in properties.features`                                       | `false` |

## Field Paths

FQL statements may refer to any field in the JSON object including top-level
properties like `userId` or `event` as well as nested properties like
`context.library.version` or `properties.title` using dot-separated paths. For
example, the following fields can be pointed to by the associated field paths:

```json
{
  "type": "...",       // type
  "event": "...",      // event
  "context": {         // context
    "library": {       // context.library
      "name": "..."    // context.library.name
    },
    "page": {          // context. page
      "path": "...",   // context.page.path
    }
  }
}
```

### Escaping Field Paths

If your field name has a character not in the set of `{a-z A-Z 0-9 _ -}`, you must escape it using a `\` character. For example, the nested field below can be referred to by `properties.product\ 1.price`:

```json
{
  "properties": {
    "product 1": {
      "price": "19.99"
    }
  }
}
```

## Operators

### Boolean

| Operator | Left Side        | Right Side       | Result                                                                              |
| -------- | ---------------- | ---------------- | ----------------------------------------------------------------------------------- |
| `and`    | `bool` or `null` | `bool` or `null` | `true` if the left and right side are both `true`, `false` otherwise.               |
| `or`     | `bool` or `null` | `bool` or `null` | `true` if at least one side is `true`, `false` if either side is `false` or `null`. |

### Unary

| Operator | Right Side | Result                       |
| -------- | ---------- | ---------------------------- |
| `!`      | `bool`     | Negates the right-hand side. |

### Comparison

| Operator | Left Side                                     | Right Side                                    | Result                                                                                                      |
| -------- | --------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `=`      | `string`, `number`, `list`, `bool`, or `null` | `string`, `number`, `list`, `bool`, or `null` | `true` if the left and right side are the same type and are strictly equal, `false` otherwise.              |
| `!=`     | `string`, `number`, `list`, `bool`, or `null` | `string`, `number`, `list`, `bool`, or `null` | `true` if the left and right side are different types or if they are not strictly equal, `false` otherwise. |
| `>`      | `number`                                      | `number`                                      | `true` if the left side is greater than the right side.                                                     |
| `>=`     | `number`                                      | `number`                                      | `true` if the left side is greater than or equal to the right side.                                         |
| `<`      | `number`                                      | `number`                                      | `true` if the left side is less than the right side.                                                        |
| `<=`     | `number`                                      | `number`                                      | `true` if the left side is less than or equal to the right side.                                            |
| `in`     | `string`, `number`, `bool`, or `null`         | `list`                                        | `true` if the left side is contained in the list of values.                                                 |

## Subexpressions

You can use parentheses to group subexpressions for more complex "and / or" logic as long as the subexpression evaluates to true or false:

| FQL                                                                                                            |
| -------------------------------------------------------------------------------------------------------------- |
| `type = 'track' and ( event = 'Click' or match( 'Button *', event ) )`                                         |
| `( type = 'track' or type = 'identify' ) and ( properties.enabled or match( traits.email, '*@company.com' ) )` |
| `!( type in ['track', 'identify'] )`                                                                           |

## Functions

| Function                            | Return Type | Result                                                                                                                                                     |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contains( s string, sub string )`  | `bool`      | Returns `true` if string `s` contains string `sub`.                                                                                                        |
| `length( list or string )`          | `number`    | Returns the number of elements in a list or number of bytes (not necessarily characters) in a string. For example, `a`  is 1 byte and`ア` is 3 bytes long. |
| `lowercase( s string )`             | `string`    | Returns `s` with all uppercase characters replaced with their lowercase equivalent.                                                                        |
| `typeof( value )`                   | `string`    | Returns the type of the given value: `"string"`, `"number"`, `"list"`, `"bool"`, or `"null"`.                                                              |
| `match( s string, pattern string )` | `bool`      | Returns `true` if the glob pattern `pattern` matches `s`. See below for more details about glob matching.                                                  |

Functions handle `null` with sensible defaults to make writing FQL more concise.
For example, you can write `length( userId ) > 0` instead of `typeof( userId ) =
'string' and length( userId ) > 0`.

| Function                   | Result   |
| -------------------------- | -------- |
| `contains( null, string )` | `false`  |
| `length( null )`           | `0`      |
| `lowercase( null )`        | `null`   |
| `typeof( null )`           | `"null"` |
| `match( null, string )`    | `false`  |

### `match( string, pattern )`

The `match( string, pattern )` function uses "glob" matching to return `true` if the given string fully matches a given pattern. Glob patterns are case sensitive. If you only need to determine if a string contains another string, you should use `contains()`.

| Pattern | Summary                                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `*`     | Matches zero or more characters.                                                                                       |
| `?`     | Matches one character.                                                                                                 |
| `[abc]` | Matches one character in the given list. In this case, `a`, `b`, or `c` will be matched.                               |
| `[a-z]` | Matches a range of characters. In this case, any lowercase letter will be matched.                                     |
| `\x`    | Matches the character `x` literally. This is useful if you need to match `*`, `?` or `]` literally. For example, `\*`. |

| Pattern                       | Result  | Reason                                                                                                  |
| ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `match(` `'abcd', 'a*d' )`    | `true`  | `*` matches zero or more characters.                                                                    |
| `match( '', '*' )`            | `true`  | `*` matches zero or more characters.                                                                    |
| `match( 'abc', 'ab' )`        | `false` | The pattern must match the full string.                                                                 |
| `match( 'abcd', 'a??d' )`     | `true`  | `?` matches one character only.                                                                         |
| `match( 'abcd', '*d' )`       | `true`  | `*` matches one or more characters even at the beginning or end of the string.                          |
| `match( 'ab*d', 'ab\*d' )`    | `true`  | `\*` matches the literal character `*`.                                                                 |
| `match( 'abCd', 'ab[cC]d' )`  | `true`  | `[cC]` matches either `c` or `C`.                                                                       |
| `match( 'abcd', 'ab[a-z]d' )` | `true`  | `[a-z]` matches any character between `a` and `z`.                                                      |
| `match( 'abcd', 'ab[A-Z]d' )` | `false` | `[A-Z]` matches any character between `A` and `Z` but `c` is not in that range because it is lowercase. |

## Error Handling

If your FQL statement is invalid (for example `userId = oops"`), your Segment event will not be sent on to downstream Destinations. Segment defaults to not sending the event to ensure that invalid FQL doesn't cause sensitive information like PII to be incorrectly sent to Destinations.

For this reason, Segment recommends that you use the Destination Filters "Preview" API to test your filters without impacting your production data.
