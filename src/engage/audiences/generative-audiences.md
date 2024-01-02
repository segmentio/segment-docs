---
title: Generative Audiences
beta: true

---

> info "Generative Audiences is in beta"
> Generative Audiences is in beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

With Generative Audiences, part of Segment's CustomerAI, use generative AI to create Engage Audiences with natural language prompts. 

Describe your desired audience based on events performed, profile traits, or existing audiences in your workspace. Based on your prompt, Segment builds the audience with generative AI.

In this article, you'll learn how to use Generative Audiences along with some best practices.


## Getting started with CustomerAI 
Use these steps to get started with CustomerAI:
<!-- ask for a demo of this process -->
1. From your message composer, select **Launch AI Copywriter**.
2. In the drag-and-drop editor for in-app messages, select a text block and select in the block's toolbar.
3. Enter a product name or description in the input field.
4. Select the output language. This can be different from your input language.
5. Select an appoximate output length.
6. Click **Generate Copy**.

## Create an audience with Generative Audiences 

To create an audience with Generative Audiences: 

1. Navigate to **Engage > Audiences**, and click **+ New audience**.
2. From the dropdown menu, select **Audience**.
3. Select **Generative Audiences** as your audience type. Generative Audiences is available for all audience types except Linked Audiences.
4. From the Build screen, click **Help me build**.
5. Enter your prompt in the audience description box. 
- Use a minimum of 20 characters and up to 300 characters maximum. 
6. Click **Build**. Based on your prompt, CustomerAI generates audience conditions for you to review. 
- Segment displays a progress bar until the audience conditions are generated.

> success ""
> To help you write your prompt, view these [example prompts](#use-cases-and-examples) and [best practices](#best-practices).

### Modify an audience description 

Once Segment generates the audience conditions, the prompt box remains open for reference. You can close this box, or modify your audience description and click **Build** again. Modifying an audience overwrites the existing audience conditions Segment previously generated. 

> info ""
> Once Segment generates the audience, you can also adjust or remove any conditions straight from the audience builder. 


## Use cases and examples

Use the following examples to help you get started with audience prompts.

- To build an audience with customers who haven't made a purchase in the last 30 days enter: `Customers who haven't purchased in the last 30 days.` 

- To find all profiles that have recently opened an email enter: `Profiles that recently opened an email.`

- To build an audience with customers who spend over $50 on an order enter: `Customers who have orders greater than $50.`


## Best practices

As you use generative audiences, keep the following best practices in mind:

- Write specific descriptions. CustomerAI generates more accurate conditions when you use the names of existing events and traits. 
- Ensure that all events and traits you reference exist in your workspace.
- Avoid using sensitive data or customer Personal Identifiable Information (PII).
- Experiment with your prompts. If you don't receive what you want on the first try, rewrite your prompt. Submitting a new prompt replaces existing conditions.

> success ""
> Segment recommends previewing your audience to ensure you're matching with the correct profiles prior to moving on to the next step.


## Known limitations

### Limited space schema 

Segment's generative AI service is handled by a third party that needs to be fed context about your Engage workspace and has limitations to how many contextual parameters Segment can send it. Because of this, Segment limits the amount of data it sends to the AI service. Segment solves this limitation by including up to 100,000 of the most recently used events and traits in your Engage space.

Event properties may not be populated due to this.

### Foreign language support

At this time, Segment only supports audience description prompts in the English language. Foreign language support is currently unavailable and might provide undesired results. 

### Negative conditions

Audience descriptions around not having profile traits or users who have not performed certain events are expected to have their conditions configured in the following way:

- **Prompt**: "Customers who have not purchased in the last 30 days."
- **Expected output**: Segment generates a condition where *the event is performed at most 0 times*.

![Creating an audience where customers haven't made a purchase in the last 30 days.](/docs/engage/images/No-purchases.png)

- **Prompt**: "Customers who don't have a phone number."
- **Expected output**: Segment generates a condition where *the trait doesn't exist*.

![Creating an audience where customers don't have a phone number.](/docs/engage/images/phone-doesn't-exist.png)


## Error handling

Engage uses the following error messages with Generative Audiences:

| Error message        | Cause                  |
|---------------------------|---------------------------------------|
| Something went wrong      | This error displays when one of the following occur: <br>  - Not found exception <br> - Invalid LLM output <br> - LLM error terminal <br> - Unknown exception                  |
| Something went wrong. Try again later. | The AI service is down or the LLM returned an error. |
| Segment had trouble creating an audience from this description. Try rewording it using these [best practices](#best-practices). | The prompt referenced an invalid or non-existing trait, audience, or event within the workspace. You may also see this when an objective is impossible or misunderstood. |


## More about Segment's generative AI service

#### How is my data used?

In order to generate the audience based on your description, Segment sends your query to OpenAI, Segment's 3rd party AI service. All queries sent to OpenAI from Segment are anonymized, meaning that OpenAI won't be able to identify from whom the query was sent unless you include uniquely identifiable information in the input.

Behind the scenes, Segment instructs GPT to generate an audience based on required parameters from Segment's system and contextual information such as traits and events performed in your workspace.

GPT is OpenAI's state of the art natural language generation tool powered by artificial intelligence. It can perform a variety of natural language tasks like text generation, completion, and classification. CustomerAI uses the service to help generate audiences and inspire segmentation.

Per OpenAI's policy, data sent to OpenAI's API with Segment isn't used to train or improve their models and will be deleted after 30 days. Any content generated using GPT is your intellectual property. Segment won't assert any claims of copyright ownership on such content and makes no warranty of any kind with respect to any AI generated content.