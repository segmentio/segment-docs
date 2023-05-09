---
title: Use Transformations to fix bad data
redirect_from: '/protocols/transformations/'
---

{% include content/plan-grid.md name="protocols" %}

## What is a Transformation?

With Transformations, you can change data as it flows through Segment to either correct bad data or customize data for a specific destination. Change event and property names to align events with your Tracking Plan, or to conform to a destination-specific requirement. For example, you can create a Transformation to change an event name from `completed_order` to `Order Completed` to conform to [Segment's ecommerce spec](/docs/connections/spec/ecommerce/v2/#order-completed).

You can also use [Segment's Public API](https://docs.segmentapis.com/tag/Transformations){:target="_blank"} to transform events, properties, and property values for many [use cases](#use-cases).


**Transformations are very powerful and should be applied with care.**

Transformations _irrevocably_ change the event payloads flowing through Segment and immediately affect either all destinations, or a single downstream destination, depending on your settings.

> warning ""
> As soon as you apply a Transformation, the original tracking payloads are not easily recoverable.

Segment's goal is to make Transformations a powerful tool that complements a well structured Tracking Plan. Together, these features help your organization scale and achieve high data quality. For that reason Segment recommends that you start your data quality strategy with a clearly defined Tracking Plan. Without this critical component, the risk of creating conflicting or detrimental transformations increases.

### Other important notes

- **Transformations cannot be applied retroactively:** They only apply to data moving forward. However, you can manually extract and re-send (or even [Replay](/docs/guides/what-is-replay)) events through a source with an active destination Transformation, which will send the transformed events to your destinations.
- **Transformations are available to Protocols customers:** If you're interested in this feature, contact your Account Executive or CSM to learn more about the Protocols package.
- **Source-level transformations are irrevocable:** When applied at the source, a transformation permanently changes the structure of the event. The original events are not easily recoverable or [Replayable](/docs/guides/what-is-replay). Assume that transformed data cannot be recovered.
- **Device-mode destinations are NOT supported:** Source scoped transformations will **only** apply to cloud-mode destinations, warehouses, and S3 destinations. Destination scoped transformations will **only** apply to cloud-mode destinations.

## View all Transformations

All Protocols Transformations are listed in the Transformations tab in the Protocols section. The list view supports filtering and sorting to organize transformations by transformation type, source, and destination.

![view all Transformations in your Segment workspace](../images/transformation_list_view.png)

Transformations can be enabled and disabled directly from the list view using the toggle.

Transformations can be deleted and edited by clicking on the overflow menu. When editing a Transformation, only the resulting event or property names, and Transformation name can be edited. If you want to select a different event or source, create a separate Transformation rule.

> note "Transformations created using the Public API"
> On the Transformations page in the Segment app, you can view and rename transformations that you created with the Public API. In some cases, you can edit these transformations in the UI.

## Create a Transformation

To create a Transformation, navigate to the Transformations tab in Protocols and click **New Transformation** in the top right. A three-step wizard guides you through creating a transformation.

> info ""
> Workspace Owner or Source Admin permissions are required to create and edit transformations.
> Source Read-only permissions are required to view transformations.

![create a transformation with the three-step wizard](../images/transformation_wizard.png)

### Step 1: Select the transformation type

To create a Transformation, you first need to select which type of transformation you want to create. For each transformation type, Segment displays a description, use cases, and example payload. Current transformation types available in your Segment workspace include:

**Rename track event:** Rename track event name at the source or per destination. The events listed in the event names dropdown menu correspond to the events listed on the [source schema view](/docs/getting-started/implementation-guide/#event-anatomy-and-naming-standards).
![rename track event](../images/event-rename-example.png)

**Edit track event properties:** Rename multiple properties and/or change property data structure at the source or per destination
![edit track event properties](../images/property-example.png)

**Edit identify or group event traits:** Rename multiple traits and/or change trait data structure at the source or per destination
![edit identify or group event traits](../images/traits-example.png)

> success ""
> View more [use cases](#use-cases) of Transformations available in both your workspace and [Segment's Public API](https://docs.segmentapis.com/tag/Transformations){:target="_blank"}.

### Step 2: Set up the transformation

Depending on the transformation type you selected, relevant drop-down selectors and fields are presented to define how you want to transform the data.

> info ""
> Multiple transformations cannot be created for the same source + type + event + destination combo. This restriction blocks circular transformations (for example, `order_updated` to `orderUpdated` to `order_updated`), minimizes unexpected transformations, and enables easy filtering across each dimension.

Regardless of the type of transformation selected, first select a source. Each Transformation can only apply to a single source. While this makes it more difficult to apply transformations broadly, it ensures you are only transforming data relevant to the selected source.

After selecting the source, you will need to select a scope. Scope determines where Segment applies the transformation.

> warning ""
> Source-scoped Transformations only apply to cloud-mode, S3, and data warehouse destinations.

![select a transformation scope](../images/transformation_scope.png)

* **Source scope:**
Events are transformed in all **active Segment cloud-mode destinations, warehouses, and S3 destinations.** This scope is best when you want to fix malformed events before sending them to all destinations. These transformations should be treated as a temporary solution to hold you over while your engineering team fixes the root event.

* **Destination scope:**
Events are transformed in ONLY the selected cloud-mode destination. **Device-mode destinations, S3, and data warehouses are not currently supported.** Use the Destination scope when you want to customize an event to the unique requirements of a destination. These transformations can exist permanently.

Depending on the type of transformation you selected, you will need to enter the relevant event, property, or trait mappings to create the transformation.

* **Select an Event:**
After you select the scope, use the search box to choose the event to transform. You can **only** select a single track event, identify or group call. If you are renaming the event, simply enter the new name in the provided text field.

* **Rename properties or traits:**
To rename properties or traits within a selected event, click **+ Add Property**. The dropdown that appears contains the properties or traits sent with the selected event. Segment supports JSON Path notation to select nested objects up to four levels deep. For example, `order.id` selects the `id` property in the `order` object. Segment does not support `.$.` notation to select a property from an array of objects. For example, the following event, which generates `products.$.product_id`, is unsupported.

```js
analytics.track('Example', {
  products: [{
      product_id: "123"
  }],
})
```

In this scenario, we do not support the transformation of product_id. 

After selecting a property/trait, select JSON Path or Simple String to change the property/trait. Simple string will change the name in-line, while JSON path allows you to move the property/trait in or out of an object.

> info ""
> When you see properties that have the escape character `\` in them - this escape character `\` is added to differentiate between a property name that has a . in it, and a nested field, like so:
> ```
> ingredients.salad → "ingredients": { "salad": "yum" }
> ingredients\.salad → "ingredients.salad": "yum"
> ```

### Step 3: Name the transformation and enable it

Enter a descriptive name to act as a label for the transformation. This label helps you organize your Transformations, and Segment recommends that you make this descriptive and focused on the problem you're solving. For example `Fix misnamed order_completed event for ecommerce spec` is much better than `Map order_completed`.

In this step, you can also choose to keep the Transformation disabled, so you can come back and edit it later. To update, enable, or disable a Transformation, click on the overflow menu and select **Edit Transformation**.

## Use Cases

Here's a list of Segment Transformations with some use case examples.

- **Rename an event:** Change an event name from `viewed_product` to `Product Viewed`.

- **Rename a property or trait:** Change the property name `revenue` to `total` for a specific destination.

- **Update a property value:** Use [Segment's Public API](https://docs.segmentapis.com/tag/Transformations){:target="_blank"} to transform the property `currency` to have the value `USD`. 

- **Property Transformations**
  - **Assigning static values:** If you want to create a new property and set a static value, use [Segment's Public API](https://docs.segmentapis.com/tag/Transformations){:target="_blank"} to create `new_property: static_value`. Segment currently supports setting static values for top-level fields, as well as fields within the `context` or `properties` object with `propertyValueTransformations`. However, Segment doesn't support changing fields outside the properties or traits object with `propertyRenames`. You can use `propertyValueTransformations` on a single object to assign the same value to different fields or on multiple objects to assign a static value to the same field across objects.
  - **Casing functions:** Use [Segment's Public API](https://docs.segmentapis.com/tag/Transformations){:target="_blank"} to transform property value casing to `lowercase`, `uppercase`, `snakecase`, `kebabcase`, or `titlecase`. When transforming data with casing functions, use the [`fqlDefinedProperties`](https://docs.segmentapis.com/tag/Transformations#operation/createTransformation!ct=application/vnd.segment.v1+json&path=fqlDefinedProperties&t=request){:target="_blank"} array to define the FQL you want to use and the new or existing `propertyName` you'd like to transform.
    - **Static and dynamic value casing:** Use casing functions to transform property values to create uniform tracking data. For example, you can convert `usa` to `USA` to keep your downstream data consistent. <br/>You can transform these properties using static casing functions: <br/>
    ```
    fqlDefinedProperties": [{"fql": "uppercase("United States)", "propertyName": "properties.propertyValue1"}]
    ``` 
    or dynamic casing functions:
    ```
    fqlDefinedProperties": [{"fql": "lowercase(properties.propertyValue1)", "propertyName": "properties.propertyValue1"}]
    ```
    - **Create a new property with applied casing**: Use [Segment's Public API](https://docs.segmentapis.com/tag/Transformations){:target="_blank"} to create a new property and set the value of the new property to the transformed value of an existing property. You can dynamically assign the value of one existing property to another, or assign the value of an existing property to a new property without applying casing functions. <br/>For example, create a new property (`prop2`) with a value of `lowercase(properties.prop1)` by including the following snippet in your payload:<br/>
    ```
    fqlDefinedProperties": [{"fql": "lowercase(properties.prop1)", "propertyName": "properties.prop2"}]
    ```
  - Note that you can only assign one property to `fqlDefinedProperties` array.
  - Note that you cannot use `fqlDefinedProperties` along with event or property rename or property value transformations.

> info ""
> Segment displays an error if the following property conflicts occur:
> - You create a property value transformation when one already exists for the same property value.
> - Two property paths in `propertyValueTransformations` are the same.
> - A property path in `propertyValueTransformations` is the same as a property name in `propertyRenames`.
