---
title: Segment Query Language Reference
plan: papi
---

Segment's query language lets you define audience segments and computed traits. With clear syntax and practical functionality, the language simplifies the process of defining conditions and computations, helping you extract valuable insights from customer data. 

This reference provides a comprehensive overview of the Segment query language.

> info "Segment's query language in private beta"
> Segment's query language is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

## Overview

Audience definitions specify the criteria for identifying users or accounts as members of a particular audience, while computed trait definitions outline the logic for aggregating or calculating values stored as traits on user or account level profiles.

With Segment's query language, you can create these definitions and use them with Segment APIs to generate audiences and computed traits. 

## Available functions and operators

This section outlines the functions and operators you can use with the query language.

### Syntax

Follow these syntax rules when you create definitions:

- All definitions consist of expressions connected by optional junctions.
- Expressions are composed of chained functions, starting with an extractor and ending with a result.
- `.` serves as the delimiter when chaining functions.
- Audience definitions must return a boolean result (for example, a comparator), while computed trait definitions must return a scalar.
- Functions have well-defined return types that determine the permissible functions in the call chain.
- When you use junctions, `AND` holds precedence over `OR`, but parentheses offer control over expression combination.
- Each definition allows a maximum of 50 primary expressions.

### Syntactic sugar

The language supports the following syntactic sugar adjustments:

- The language automatically wraps a 'literal' extractor function around string or number inputs wherever a scalar expression expects them.
- You can invoke the boolean comparator functions `equals`, `differs`, `greater_than`, `at_least`, `less_than`, and `at_most` by omitting the period and parenthesis and replacing the function name with the equivalent symbols `=`, `!=`, `>`, `>=`, `<`, and `<=`. Regardless of the syntactic sugar, the comparison still dictates the operations allowed in the call-chain.

### Definition type

The definition type (`USERS` or `ACCOUNTS`) determines whether the computation operates at the user or account level. For account-level audiences, you can apply additional functions `ANY` (to verify that all underlying users meet the defined conditions) and `ALL` (to check if any of the underlying users meet the defined conditions).

These functions use the association between accounts and users to determine audience membership.

## Functions

The following tables list the query languages's available functions.

### Extractors

| `event`     |                                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| Syntax      | `event({s: String})` <br> `s` - the name of the event to build an extractor for |
| Return Type | `VectorExtractor`                                                               |
| Example     | `event('Shoes Bought')`                                                         |

| `trait`     |                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Syntax      | `trait({s: String})` <br> `s` - the name of the trait to reference                                  |
| Return Type | `ScalarExtractor`                                                                                   |
| Description | Similar to the event operator, the trait operator is used to specify profile trait filter criteria. |
| Notes       | You can reference other audiences by using the audience key as the trait name. The `.` character indicates traversal through nested structures. If the trait name contains a literal period (`.`), it must be escaped using `\\\\`.                                              |
| Example     | `trait('total_spend')`                                                                              |

| `entity`     |                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Syntax      | `entity({s: String})` <br> `s` - the relationship slug of the entity to build an extractor for      |
| Return Type | `VectorExtractor`                                                                                   |
| Description | Similar to the event operator, the entity operator is used to specify entity filter criteria.       |
| Notes       | Entity is only used with Linked Audiences.                                                          |
| Example     | `entity('accounts')`                                                                                |

| `property`  |                                                                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `property({s: String})` <br> `s` - the name of the property to build an extractor for  <br> In the context of funnel audiences, you can add a parent prefix to reference the parent event. <br> `property(parent: {s: String})` |
| Return Type | `ScalarExtractor`                                                                                                                                                                                                               |
| Notes       | Only valid within a `where` function or a Reducer. The `.` character indicates traversal through nested structures. If the trait name contains a literal period (`.`), it must be escaped using `\\\\`.                 |
| Example     | `property('total')`                                                                                                                                                                                                             |

| `context`   |                                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| Syntax      | `context({s: String})` <br> `s` - the name of the context to build an extractor for |
| Return Type | `ScalarExtractor`                                                                   |
| Notes       | Only valid within a `where` function or a Reducer.                                  |
| Example     | `context('page.url')`                                                               |

| `literal`                        |                                                                                                                                                                                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax                           | `literal({a: Any})`  <br> `a` - the value to treat as a literal expression                                                                                                                                                                      |
| Operations allowed in call-chain | None allowed; typically used within another function, like a comparison (with syntactic sugar, this would appear on the right side of the comparison). The outer function or comparison dictates the operations allowed in the call-chain. |
| Notes                            | Literals can be `int`, `float`, `string`, `date` or `timestamp`, where `date` uses the format `yyyy-mm-dd` and `timestamp` follows the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} format. `string` is generally interchangeable with all other formats, except when used in a `property` chained to an `entity`. In this case, Segment recommends matching the data type of the entity property being targeted.                                             |
| Example                          | `literal(100)`, `literal('value')`, or `literal(2022-10-17T00:00:00)`                                                                                                                                                                          |



### Filters

| `where`     |                                                                                       |
| ----------- | ------------------------------------------------------------------------------------- |
| Syntax      | `where({e: Comparator})`<br>`e` - a subexpression terminating in a boolean Comparator |
| Return Type | `StreamFilter`                                                                        |
| Description | Filters the stream to only items where a property satisfies a particular condition.   |
| Notes       | The parameter is a sub-expression, something that terminates in a boolean Comparator. |
| Example     | `where({property('price_usd') > 100})`                                                |

| `sources`   |                                                                                       |
| ----------- | ------------------------------------------------------------------------------------- |
| Syntax      | `sources({exclude: {a: Array}})`<br>`a` - an array of source `ids` to exclude         |
| Return Type | `StreamFilter`                                                                        |
| Description | Filters the stream to only items whose source `id` does not match the exclusion list. |
| Example     | `sources({exclude: 'QgRHeujRJBM9j18yChyC', '/;hSBZDqGDPvXCKHbikPm'})`               |

| `within`    |                                                                                                                                                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `within({d: Integer} {u: TimeUnit})`<br>`d` - duration value<br>u - hour (s) day (s)<br>In the context of funnel audiences, you can add a parent prefix to reference the parent event.<br>`within(parent: {d: Integer} {u: TimeUnit})` |
| Return Type | `WindowedFilter`                                                                                                                                                                                                                       |
| Description | Provides time windowing so that events are only looked at over a specified number of hours or days into the past. You can add a prefix to direct the evaluation to be relative to the timestamp of a different event.                  |
| Example     | `within(7 days)`                                                                                                                                                                                                                       |

| `between`   |                                                                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `between({s: Integer} {su: TimeUnit}, {e: Integer} {eu: TimeUnit})`<br>`s` - start value<br>su - hour (s) day (s)<br>`e` - end value<br>eu - hour (s)  day (s) |
| Return Type | `WindowedFilter`                                                                                                                                               |
| Description | You can add a prefix to direct the evaluation to be relative to the timestamp of a different event.                                                            |
| Example     | `between(7 days, 10 days)`                                                                                                                                     |


### Reducers

| `count`     |                                                                  |
| ----------- | ---------------------------------------------------------------- |
| Syntax      | `count()`                                                        |
| Return Type | `Scalar`                                                         |
| Description | Counts the number of entries in a stream and returns the result. |
| Example     | `count()`                                                        |

| `sum`       |                                                             |
| ----------- | ----------------------------------------------------------- |
| Syntax      | `sum({s: EventPropertyExtractor})`<br>`s` - property to sum |
| Return Type | `Scalar`                                                    |
| Example     | `sum(property('spend'))`                                    |

| `avg`       |                                                                 |
| ----------- | --------------------------------------------------------------- |
| Syntax      | `avg({s: EventPropertyExtractor})`<br>`s` - property to average |
| Return Type | `Scalar`                                                        |
| Example     | `avg(property('spend'))`                                        |

| `max`       |                                                                                                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `max({s: EventPropertyExtractor})` or `max({s: EventPropertyExtractor} as type)`<br>`s` - property to get the maximum value of <br>`type` - number, string                                                                  |
| Return Type | `Scalar`                                                                                                                                                                                                                    |
| Notes       | If no type is passed, Segment assumes `number` as the `type` and selects the greatest value. You can override the behavior to select the max based on lexicographical ordering by specifying `as string`.            |
| Example     | `max(property('spend'))`<br>`max(property('spend') as string)`                                                                                                                                                              |

| `min`       |                                                                                                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `min({s: EventPropertyExtractor})` or `min({s: EventPropertyExtractor} as type)`<br>`s` - property to get the minimum value of <br>`type` - number, string                                                                  |
| Return Type | `Scalar`                                                                                                                                                                                  
                                  |
| Notes       | If no type is passed, Segment assumes `number` as the `type` and selects the smallest value. You can override the behavior to select the max based on lexicographical ordering by specifying `as string`.            |
| Example     | `min(property('spend'))`<br>`min(property('spend') as string)`                                                                                                                                                              |

| `mode`      |                                                                                                                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `mode({s: EventPropertyExtractor}, {d: Integer})` or `mode({s: EventPropertyExtractor} as type, {d: Integer})`<br>`s` - the property to find the most frequent value of <br>`d` - minimum frequency expected <br>`type` - number, string, array |
| Return Type | `Scalar`                                                                                                                                                                                                                                        |
| Description | Find the most frequent value for a given property name.                                                                                                                                                                                         |
| Notes       | If no type is passed, Segment assumes `string` as the `type` and selects the most frequent value assuming all data is a string. `number` will behave the same as `string`. `array` will also behave the same way, except when used in combination with the `$` operator where instead of treating each individual value within the array separately Segment will instead treat the whole array as a string.                                               |
| Example     | `mode(property('spend'), 2)`<br>`mode(property('spend') as array, 2)`                                                                                                                                                                           |

| `first`     |                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------ |
| Syntax      | `first({s: EventPropertyExtractor})`<br>`s` - the property to find the first value of            |
| Return Type | `Scalar`                                                                                         |
| Description | Find the first value for the given property name within the stream of filterable data extracted. |
| Example     | `first(property('spend'))`                                                                       |

| `last`      |                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Syntax      | `last({s: EventPropertyExtractor})`<br>`s` - the property to find the last value of             |
| Return Type | `Scalar`                                                                                        |
| Description | Find the last value for the given property name within the stream of filterable data extracted. |
| Example     | `last(property('spend'))`                                                                       |

| `unique`    |                                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| Syntax      | `unique({s: EventPropertyExtractor})`<br>`s` - property to get the unique values of |
| Return Type | `ListScalar`                                                                        |
| Description | Generate a unique list of values for the given property name.                       |
| Example     | `unique(property('spend'))`                                                         |


### Comparisons

| `equals`    |                                                              |
| ----------- | ------------------------------------------------------------ |
| Syntax      | `equals({v: Scalar})`<br>`v` - value to compare for equality |
| Return Type | `Comparator`                                                 |
| Example     | `equals(500)`<br>Syntactic Sugar: `== 500`                   |

| `differs`   |                                                                                                                                                                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `differs({v: Scalar})`<br>`v` - value to compare for inequality                                                                                                                                                                                            |
| Return Type | `Comparator`                                                                                                                                                                                                                                               |
| Notes       | 'differs' only returns true if the value exists and is not equal. If null values need to be considered then use 'NOT (expression) = (value)' or add a condition to check for nulls '(expression) != (value) OR (expression).absent()'.              |
| Example     | `differs(500)`<br>Syntactic Sugar: `!= 500`                                                                                                                                                                                                                |

| `absent`    |                                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| Syntax      | `absent()`                                                                    |
| Return Type | `Comparator`                                                                  |
| Description | Returns true when a value is null. Equivalent to `NOT (expression).exists()`. |
| Example     | `absent()`                                                                    |

| `exists`    |                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Syntax      | `exists()`                                                                                      |
| Return Type | `Comparator`                                                                                    |
| Description | Returns true when a value is set, meaning not null. Equivalent to `NOT (expression).absent()`.  |
| Example     | `exists()`                                                                                      |

| `greater_than` |                                                       |
| -------------- | ----------------------------------------------------- |
| Syntax         | `greater_than({n: Scalar})`<br>`n` - value to compare |
| Return Type    | `Comparator`                                          |
| Example        | `greater_than(500)`<br>Syntactic Sugar: `> 500`       |

| `at_least`     |                                                   |
| -------------- | ------------------------------------------------- |
| Syntax         | `at_least({n: Scalar})`<br>`n` - value to compare |
| Return Type    | `Comparator`                                      |
| Example        | `at_least(500)`<br>Syntactic Sugar: `>= 500`      |

| `less_than`    |                                                  |
| -------------- | ------------------------------------------------ |
| Syntax         | `less_than({n: Scalar})`<br>n - value to compare |
| Return Type    | `Comparator`                                     |
| Example        | `less_than(500)`<br>Syntactic Sugar: `< 500`     |

| `at_most`      |                                                  |
| -------------- | ------------------------------------------------ |
| Syntax         | `at_most({n: Scalar})`<br>`n` - value to compare |
| Return Type    | `Comparator`                                     |
| Example        | `at_most(500)`<br>Syntactic Sugar: `<= 500`      |

| `contains`     |                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| Syntax         | `contains({a: Array})`<br>`a` - array of possible values                                   |
| Return Type    | `Comparator`                                                                               |
| Description    | Matches when the value contains one of the elements of the parameter array as a substring. |
| Example        | `contains('shoes','shirts')`                                                             |

| `omits`     |                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `omits({s: String})`<br>`s` - string to search for if missing in a containing string                                            |
| Return Type | `Comparator`                                                                                                                    |
| Description | Evaluates to true when a substring isn't present in a containing string, equivalent to `NOT (expression).contains(<argument>)`. |
| Example     | `omits('shoes')`                                                                                                                |

| `starts_with` |                                                                                        |
| ------------- | -------------------------------------------------------------------------------------- |
| Syntax        | `starts_with({s: String})`<br>`s` - string to search for at start of containing string |
| Return Type   | `Comparator`                                                                           |
| Example       | `starts_with('total')`                                                                 |

| `ends_with` |                                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| Syntax      | `ends_with({s: String})`<br>`s` - string to search for at end of containing string |
| Return Type | `Comparator`                                                                       |
| Example     | `ends_with('total')`                                                               |

| `one_of`    |                                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| Syntax      | `one_of({a: Array})`<br>`a` - array of possible values                             |
| Return Type | `Comparator`                                                                       |
| Description | Matches when the value exactly matches one of the values from the parameter array. |
| Example     | `one_of('shoes','shirts')`                                                         |

| `none_of`    |                                                                                          |
| ----------- | ----------------------------------------------------------------------------------------- |
| Syntax      | `none_of({a: Array})`<br>`a` - array of possible values                                   |
| Return Type | `Comparator`                                                                              |
| Description | Matches when the value does not exactly match one of the values from the parameter array. |
| Example     | `none_of('shoes','shirts')`                                                               |

| `before_date` |                                                                              |
| ------------- | ---------------------------------------------------------------------------- |
| Syntax        | `before_date({t: Timestamp})`<br>`t` - ISO 8601 timestamp                    |
| Return Type   | `Comparator`                                                                 |
| Notes         | `string` format can also be used                                              |
| Example       | `before_date(2023-12-07T18:50:00Z)` or `before_date('2023-12-07T18:50:00Z')` |

| `after_date` |                                                                            |
| ------------ | -------------------------------------------------------------------------- |
| Syntax       | `after_date({t: Timestamp})`<br>`t` - ISO 8601 timestamp                   |
| Return Type  | `Comparator`                                                               |
| Notes        | `string` format can also be used                                           |
| Example      | `after_date(2023-12-07T18:50:00Z)` or `after_date('2023-12-07T18:50:00Z')` |

| `within_last` |                                                                                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax        | `within_last({d: Integer} {u: TimeUnit})`<br>`d` - duration value<br>u - hour(s), day(s)                                                                                                       |
| Return Type   | `Comparator`                                                                                                                                                                                  |
| Description   | Represents the date range between today and the past `d` days - inclusive where today represents the current date at the time Segment determines audience membership or calculates the trait. |
| Example       | `within_last(7 days)`                                                                                                                                                                         |

| `within_next` |                                                                                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax        | `within_next({d: Integer} {u: TimeUnit})`<br>`d` - duration value<br>`u` - hour(s), day(s)                                                                                                     |
| Return Type   | `Comparator`                                                                                                                                                                                  |
| Description   | Represents the date range between today and the next `d` days - inclusive where today represents the current date at the time Segment determines audience membership or calculates the trait. |
| Example       | `within_next(7 days)`                                                                                                                                                                         |

| `before_last` |                                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Syntax        | `before_last({d: Integer} {u: TimeUnit})`<br>`d` - duration value<br>u - hour(s), day(s)                                                                                                                            |
| Return Type   | `Comparator`                                                                                                                                                                                                       |
| Description   | Represents the date range between today - `d` days and any past date prior to that - inclusive where today represents the current date at the time Segment determines audience membership or calculates the trait. |
| Example       | `before_last(7 days)`                                                                                                                                                                                              |

| `after_next` |                                                                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Syntax       | `after_next({d: Integer} {u: TimeUnit})`<br>`d` - duration value<br>u - hour(s), day(s)                                                                                                                |
| Return Type  | `Comparator`                                                                                                                                                                                           |
| Description  | Represents the date range between today + `d` days and any future date - inclusive where today represents the current date at the time Segment determines audience membership or calculates the trait. |
| Example      | `after_next(7 days)`                                                                                                                                                                                   |


### Junctions

| `AND`       |                                                      |
| ----------- | ---------------------------------------------------- |
| Syntax      | `{Comparator} AND {Comparator}`                      |
| Base Type   | `Junction`                                           |
| Return Type | `Comparator`                                         |
| Description | True only if both subexpressions evaluate to `true`. |

| `OR`        |                                                   |
| ----------- | ------------------------------------------------- |
| Syntax      | `{Comparator} OR {Comparator}`                    |
| Base Type   | `Junction`                                        |
| Return Type | `Comparator`                                      |
| Description | True if either subexpression evaluates to `true`. |

| `NOT`       |                                                      |
| ----------- | ---------------------------------------------------- |
| Syntax      | `NOT ({Comparator})`                                 |
| Base Type   | `Junction`                                           |
| Return Type | `Comparator`                                         |
| Description | True only if the subexpression evaluates to `false`. |

| `ANY`       |                                                                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Syntax      | `ANY ({Comparator})`                                                                                                                                                                 |
| Base Type   | `Junction`                                                                                                                                                                           |
| Return Type | `Comparator`                                                                                                                                                                         |
| Description | Used to evaluate an aggregatable boolean expression to determine if any expression is true. Used to specify account-level audience queries that aggregate across user-level queries. |

| `ALL`       |                                                                                                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Syntax      | `ALL ({Comparator})`                                                                                                                                                                   |
| Base Type   | `Junction`                                                                                                                                                                             |
| Return Type | `Comparator`                                                                                                                                                                           |
| Notes       | Used to evaluate an aggregatable boolean expression to determine if every expression is true. Used to specify account-level audience queries that aggregate across user-level queries. |


## Return Type

| `Extractor` |                        |
|-------------|------------------------|
| Operations  | None included          |

| `VectorExtractor` (extends `Extractor`, `StreamFilter`) |                                                                                                                                                          |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base Type                                               | `Extractor`, `StreamFilter`                                                                                                                              |
| Operations allowed in call-chain                        | `where`, `sources`, `within`, `between`, `count`, `sum`, `avg`, `max`, `min`, `mode`, `first`, `last`, `unique` (inherited from `StreamFilter`)          |
| Notes                                                   | A `VectorExtractor` represents extractions of data sets that need to be filtered and reduced to a scalar. Adds `isVector` property to entire expression. |


| `ScalarExtractor` (extends `Extractor`, `Scalar`) |                                                                                                                                                                                                                                          |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base Type                                         | `Extractor`, `Scalar`                                                                                                                                                                                                                    |
| Operations allowed in call-chain                  | `equals`, `differs`, `absent`, `exists`, `greater_than`, `at_least`, `less_than`, `at_most`, `contains`, `omits`, `starts_with`, `ends_with`, `one_of`, `none_of`, `before_date`, `after_date`, `within_last`, `before_last`, `after_next` (inherited from `Scalar`) |
| Notes                                             | A `ScalarExtractor` represents extractions of a single data element, like a field value or a trait value.                                                                                                                                |

| `EventPropertyExtractor` (extends `Extractor`) |                                                      |
| ---------------------------------------------- | ---------------------------------------------------- |
| Base Type                                      | `Extractor`, `Scalar`                                |
| Operations allowed in call-chain               | None                                                 |
| Notes                                          | Used to refer to properties for comparison purposes. |

| `Filter`                         |               |
| -------------------------------- | ------------- |
| Operations allowed in call-chain | None included |

| `StreamFilter` (extends `Filter`) |                                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Base Type                         | `Filter`                                                                                                        |
| Operations allowed in call-chain  | `where`, `sources`, `within`, `between`, `count`, `sum`, `avg`, `max`, `min`, `mode`, `first`, `last`, `unique` |

| `WindowedFilter` (extends `StreamFilter`) |                                                                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Base Type                                 | `StreamFilter`                                                                                                  |
| Operations allowed in call-chain          | `where`, `sources`, `within`, `between`, `count`, `sum`, `avg`, `max`, `min`, `mode`, `first`, `last`, `unique` |

| `Scalar`                         |                                                                                                                                                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operations allowed in call-chain | `equals`, `differs`, `absent`, `exists`, `greater_than`, `at_least`, `less_than`, `at_most`, `contains`, `omits`, `starts_with`, `ends_with`, `one_of`, `none_of`, `before_date`, `after_date`, `within_last`, `before_last`, `after_next`, `within_next` |

| `ListScalar`                     |         |
| -------------------------------- | ------- |
| Operations allowed in call-chain | `count` |

| `Comparator`                     |                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| Base Type                        | `Comparator`                                                                       |
| Operations allowed in call-chain | None allowed; once an expression is terminated with a Comparator, it is completed. |

| `Junction` |                                                     |
| ---------- | --------------------------------------------------- |
| Base Type  | `Junction`                                          |
| Notes      | Preserves any set properties set by subexpressions. |

## Examples

### Audiences

Suppose you wanted to collect all users who performed the `Shoes Bought` event at least once within the last seven days, where the purchase price was greater than or equal to 100.

Another way to think of this scenario would be:

- Collect all users who performed the `Shoes Bought` event. 
- Filter down to only consider events with a price greater than or equal to 100.
- Filter for events that occurred within the last seven days.
- Only include users who have one or more of the previous events.

Here's how you could do that in Segment's query language:

```sql
event('Shoes Bought').where( property('price') >= 100 ).within(7 days).count() >= 1
```

#### Bought and returned

This example collects:

- all users who performed the `Shoes Bought` event at least once within the last 30 days
- where the price was greater than or equal to the average spend
- and the user performed the `Shoes Returned` event at least once, five days after the `Shoes Bought` event

```sql
event('Shoes Bought').where( 
property('price') >= trait('avg_spend')
AND 
event('Shoes Returned').within(parent: 5 days).count() >= 1 
).within(30 days).count() >= 1
```

#### Did not perform `Shoes Bought`

This example collects all users who did not perform the `Shoes Bought` event at least once and don't have a `total_spend` trait with a value greater than `200`:

```sql
NOT ( event('Shoes Bought').count() >= 1 AND trait('total_spend') > 200 )
```

#### Bought with minimum total spend

This example collects all accounts where all associated users performed the `Shoes Bought` event at least once and have a `total_spend` trait greater than `200`: 

```sql
ALL ( event('Shoes Bought').count() >= 1 AND trait('total_spend') > 200 )
```

#### No users bought at least once

This example collects all accounts where no associated users performed the `Shoes Bought` event at least once:

```sql
ALL NOT event('Shoes Bought').count() >= 1
```

#### Any users bought at least once

This example collects all accounts where any associated users performed the `Shoes Bought` event at least once:

```sql
ANY event('Shoes Bought').count() >= 1
```

#### Associated with Orders that have an association to Order Products

This example collects all users who have at least 1 association to an `orders` entity where the `orders` entity has at least 1 association to an  `order-products` entity:

```sql
entity('orders').where(entity('order-products').count() >= 1).count() >= 1
```

#### Associated to Orders or is a VIP user

This example collects all users which have at least 1 association to an `order` entity or have a `VIP` trait equal to true:

```sql
entity('orders').count() >= 1 OR trait('VIP') = 'true'
```

#### Associated with orders that have a total greater than 500

This example collects all users with at least 1 association to an `orders` entity where the `orders` entity has a `total` property greater than 500:

```sql
entity('orders').where(property('total') > 500).count() >= 1
```

### Computed Traits

Suppose you wanted to calculate the average spend based on all `Shoes Bought` events performed within the last 30 days for each user.

Another way to think of this would be:

- Find all `Shoes Bought` events.
- Filter down to only consider events that occurred within the last 30 days.
- For these events, calculate the average spend for each user.

Here's how you could do that in Segment's query language:

```sql
event('Shoes Bought').within(30 days).avg(property('spend'))
```

#### Calculate minimum spend 

This example calculates the minimum spend for each user, based on all `Shoes Bought` events, where the price was greater than `100` and the brand was `My_Brand`:

```sql
event('Shoes Bought').where( property('price') > 100 AND property('brand') = 'My Brand' ).min(property('spend'))
```

#### Calculate first seen spend

This example calculates the first-seen spend value for each user, based on all `Shoes Bought` events performed within the last 30 days:

```sql
event('Shoes Bought').within(30 days).first(property('spend'))
```

#### Most frequent spend value

This example calculates the most frequent spend value for each user, based on all `Shoes Bought` events performed within the last 30 days. It only considers spend values that have a minimum frequency of `2`:

```sql
event('Shoes Bought').within(30 days).mode(property('spend'), 2)
```
