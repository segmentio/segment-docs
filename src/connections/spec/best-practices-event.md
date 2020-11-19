---
title: Best Practices for Event Calls
---

How do you to determine which type of call you should use? When should you make a Page call instead of a just using a Track call? In theory, you _could_ put together a full implementation using only track events, but this is a bad idea - this page explains some of the things you should consider when deciding which call to use.

Segment _strongly_ encourages you to follow [the Spec](/docs/connections/spec/) for clarity and simplicity's sake, however we also give you the flexibility to make only the calls that fit your needs. In the end, it is up to you.

## What is the Spec?

Segment recommends that you follow [the Spec](/docs/connections/spec/), which gives general guidance about which methods to use when. You might read about "semantic spec", which simply means `page` calls should be about the page you're viewing, and `track` calls should be about events or activities you want to track.

The Spec outlines the specific data you should collect with each type of call. Each call type represents and is intended to collect specific information about a user or their activities. This means that your choice of method can imply things about the data you intend to collect.

For example, the properties for `page()` and `screen()` calls are intended to describe the page, not the user or their actions. Similarly, the data automatically included in a `page()` in particularly is important for UTM campaign capture. <!-- Do we have any examples for other calls? -->

## Simplifying implementation

As we mentioned above, you _could_ build a full Segment implementation using only `track` events, and this is probably a bad idea. To do this, you would need to include page-related data in every `track` call, which means adding all of the information that `page` calls automatically include, except now manually as event properties. As you might imagine, this gets unwieldy fast!

It's better to pair a `page` and a `track` call together (making one of each call), especially if you have a complex tracking implementation. When you use the semantic methods you reduce the amount of information and other properties required in a single call.

## Ensuring destination compatibility

The `track()` call, and `page()` or `screen()` calls are handled very differently by your downstream tools, and how you can use that data is different. When you use the Spec, Segment uses the call type to help translate the data into destination's tracking format. This ensures the highest level of compatibility with the end tools.

Some destinations were built around a specific call type and Segment maps to those specific methods. Some downstream tools do not accept `page()` and `screen()` calls at all. Many of the destinations that _do_ accept these calls, also expect a _limited_ range of data in a `page()` call, and may not properly receive or handle data that would be expected in `track()` calls.

To help you with this, the Segment documentation includes [a list of all of the supported destinations and the calls they accept](/docs/connections/destinations/methods-compare/).

## Filtering data by purpose

Finally, when you use the different methods correctly, it can help you separate out “types” of information in your downstream tools and warehouses, so you can use them for different purposes.


<!-- TODO: when is it legit to *not* follow the spec?-->
