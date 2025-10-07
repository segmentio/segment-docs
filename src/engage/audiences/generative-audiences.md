---
title: Generative Audiences
beta: true
plan: engage-foundations
---

With Generative Audiences, part of Segment's AI capabilities, you can use use generative AI to create Engage Audiences with natural language prompts. 

Describe your desired audience based on events performed, profile traits, or existing audiences in your workspace. Based on your prompt, Segment builds the audience with generative AI.

For more details on AI usage and data, see [Generative Audiences Nutrition Facts Label](/docs/engage/audiences/generative-audiences-nutrition-facts/).

In this article, you'll learn how to use Generative Audiences along with some best practices.
 
## Create an audience with Generative Audiences

To create an audience with Generative Audiences: 

1. From the Segment app, navigate to **Engage > Audiences**.
2. Click **+ New audience**, then select **Audience** from the dropdown menu.
3. Select your audience type. Generative Audiences is available for all audience types except Linked Audiences.
4. From the Build screen, click **Build with AI**.
5. Enter your audience prompt in the description box. 
    - Use a minimum of 20 characters and up to 300 characters maximum. 
6. Click **Build**. Based on your prompt, Segment generates audience conditions for your review. 
    - Segment displays a progress bar until the audience conditions are generated.

> success ""
> To help you write your prompt, view these [example prompts](#example-prompts) and [best practices](#best-practices).

> success "Before you begin"
> To use Generative Audiences, a workspace owner must first accept Segment's Terms and Conditions.

### Modify an audience description 

Once Segment generates the audience conditions, the prompt box remains open for reference. You can close this box, or modify your audience description and click **Build with AI** again. 

Modifying an audience description overwrites the existing conditions previously generated. You can also edit any conditions straight from the audience builder. 

## Example prompts

Use the following examples to help you get started with audience prompts. 

- To build an audience with customers who haven't made a purchase in the last 30 days, enter: `Customers who haven't purchased in the last 30 days.` 

- To find all profiles that have recently opened an email, enter: `Profiles that recently opened an email.`

- To build an audience with customers who spend over $50 on an order, enter: `Customers who have orders greater than $50.`

> info ""
> You'll have more accurate results if you base your audience prompts on specific events and traits that are in your Segment space.

### Using negative conditions 

This section shows a few examples of how Generative Audiences configures audience conditions for negative prompts. Negative conditions might include, for example, building an audience of users without a certain profile trait, or who haven't performed certain events.   

1. **Prompt**: "Customers who have not purchased in the last 30 days." 
    - **Expected output**: Segment generates audience conditions where *the event is performed at most 0 times*.

2. **Prompt**: "Customers who don't have a phone number."
    - **Expected output**: Segment generates audience conditions where *the trait doesn't exist*.

3. **Prompt**: "Customers who haven't received an email in the last 6 months."
    - **Expected output**: Segment generates audience conditions where *the event has been performed exactly 0 times*.

## Best practices

As you use Generative Audiences, keep the following best practices in mind:

- Avoid using any customer Personal Identifiable Information (PII) or sensitive data. Personal, confidential, or sensitive information isn't required to use Generative Audiences. 
- Write specific descriptions. Segment's models generate more accurate conditions when you use the names of existing events and traits. 
- Ensure that all events and traits you reference exist in your workspace.
- Try different prompts. If you don't receive what you want on the first try, rewrite your prompt. Submitting a new prompt replaces existing conditions.
- Preview your audience to ensure you're matching with the correct profiles prior to moving on to the next step.

### View events and traits in your workspace

As you're writing your prompt, you can view traits and events that are active in your workspace from the audience builder. After you add a condition in the builder, click the property field to view active and inactive traits or events in your workspace. 

You can also use the Profile explorer (**Unify** > **Profile explorer**) to view specific events and traits associated with profiles in your Segment space. 

Learn more about [using existing events and traits](/docs/engage/audiences/) to build audiences. 
 
> warning ""
> Due to a [limited space schema](#limited-space-schema), Segment may not recognize some events or traits that are inactive in your workspace. 
 
## Error handling

Engage uses the following error messages with Generative Audiences:

| Error message        | Cause                  |
|---------------------------|---------------------------------------|
| Something went wrong      | An unknown exception occurred.                  |
| Something went wrong. Try again later. | The AI service is down, or the LLM returned an error. |
| Segment had trouble creating an audience from this description. Try rewording it using these [best practices](#best-practices). | The prompt referenced an invalid or non-existing trait, audience, or event within the workspace. You may also see this when an audience description is impossible to build or misunderstood. |
| Your plan only supports a compute history of `##` days. | The prompt is asking the audience to include a look back window greater than your workspace's [event look back limit](/docs/unify/product-limits/#audiences-and-computed-traits). Reword your prompt to include a look back window of less than the limit.|
 
## Known limitations

### Limited space schema

Segment's generative AI service is handled by a third party that needs context about your Engage workspace and has limitations to how many contextual parameters Segment can send it.
Segment solves this limitation by including only the most recently used properties and values for events and traits within your Engage space. As a result, some event and traits within your workspace may not be recognized. 

### Language support

At this time, Segment only supports audience description prompts in the English language. Support in other languages is currently unavailable and might provide undesired results. 
