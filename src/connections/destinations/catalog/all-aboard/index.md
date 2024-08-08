---
title: All Aboard Destination
---

This destination is maintained by the All Aboard team.

## Getting Started

Once the Segment library is integrated with your server, toggle All Aboard! to "on" in your Segment destination catalog and add your API key which you can find on All Aboard under Integrations > Segment.

All Aboard! supports the `identify` method.

- - -

## Identify

When you `identify` a user we pass that user's information to All Aboard. You can use the `identify` call to add new customers to All Aboard! or append traits to existing customers.

All Identify calls must include a user's `email` trait. You must also include a `createdAt` trait to add new customers to All Aboard!. For example:

```
{
  "type": "identify",
  "userId": "43",
  "traits": {
    "email": "jack@example.com ",
    "createdAt": "2015-08-04T01:04:24+00:00",
    "finished_registration": "true"
  }
}
```

Upon receiving this `identify` call All Aboard! will search for a customer with email address `jack@example.com`, create one of none exists, and append the `finished_registration: TRUE` trait to the customer.

## Best concierge onboarding practices

Segment allows you to expose what your users do in your application. This information helps can help you qualify your trial customers based on their potential business value and send them more personalized call invitations through All Aboard!

For instance, using our simple example above perhaps you only want to invite customers who completed the registration process to an onboarding call. The `finished_registration: TRUE` trait allows you to quickly identify these customers.

Traits are also useful in helping you have a more personal dialog with your trial customers. More personal call invitations encourage your most qualified customers to schedule a call with you.
