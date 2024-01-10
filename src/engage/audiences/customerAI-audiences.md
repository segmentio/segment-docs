---
title: CustomerAI Audiences
beta: true
plan: engage-foundations
---
 
> info "CustomerAI audience builder is in private beta"
> The CustomerAI audience builder is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

With CustomerAI, use generative AI to create Engage Audiences with natural language prompts. 

Describe your desired audience based on events performed, profile traits, or existing audiences in your workspace. Based on your prompt, Segment builds the audience with generative AI.

In this article, you'll learn how to use CustomerAI to build audiences along with some best practices.
 
## Create an audience with CustomerAI

To create an audience with CustomerAI: 

1. From the Segment app, navigate to **Engage > Audiences**.
2. Click **+ New audience**, then select **Audience** from the dropdown menu.
3. Select your audience type. You can use CustomerAI with all audience types except Linked Audiences.
4. From the Build screen, click **Help me build**.
5. Enter your audience prompt in the description box. 
- Use a minimum of 20 characters and up to 300 characters maximum. 
6. Click **Build**. Based on your prompt, CustomerAI generates audience conditions for your review. 
- Segment displays a progress bar until the audience conditions are generated.

> success ""
> To help you write your prompt, view these [example prompts](#use-cases-and-examples) and [best practices](#best-practices).

### Modify an audience description 

Once Segment generates the audience conditions, the prompt box remains open for reference. You can close this box, or modify your audience description and click **Build** again. Modifying an audience overwrites the existing audience conditions Segment previously generated. 

> info ""
> Once Segment generates the audience, you can also edit any conditions straight from the audience builder. 

## Use cases and examples

Use the following examples to help you get started with audience prompts. 

- To build an audience with customers who haven't made a purchase in the last 30 days, enter: `Customers who haven't purchased in the last 30 days.` 

- To find all profiles that have recently opened an email, enter: `Profiles that recently opened an email.`

- To build an audience with customers who spend over $50 on an order, enter: `Customers who have orders greater than $50.`

> info ""
> You'll have more accurate results if you base your audience prompts on specific events and traits that are in your Segment space.

## Best practices

As you build audiences with CustomerAI, keep the following best practices in mind:

- Avoid using any customer Personal Identifiable Information (PII) or sensitive data. Personal, confidential, or sensitive information isn't required to use CustomerAI. 
- Write specific descriptions. CustomerAI generates more accurate conditions when you use the names of existing events and traits. 
- Ensure that all events and traits you reference exist in your workspace.
- Try different prompts. If you don't receive what you want on the first try, rewrite your prompt. Submitting a new prompt replaces existing conditions.
- Preview your audience to ensure you're matching with the correct profiles prior to moving on to the next step.

### View events and traits in your workspace

As you're writing your prompt, you can view traits and events that are active in your workspace from the audience builder. After you add a condition in the builder, click the property field to view active and inactive traits or events in your workspace. 

You can also use the Profile explorer (**Unify** > **Profile explorer**) to view specific events and traits associated with profiles in your Segment space. 

Learn more about [using existing events and traits](/docs/engage/audiences/#building-an-audience) to build audiences. 

> warning ""
> Due to a [limited space schema](#limited-space-schema), CustomerAI may not recognize some events or traits that are inactive in your workspace. 

### Using negative conditions 

Below are a few examples of how CustomerAI configures audience conditions for negative prompts. Negative conditions might include, for example, building an audience of users without a certain profile trait, or who haven't performed certain events.  

1. **Prompt**: "Customers who have not purchased in the last 30 days."
- **Expected output**: Segment generates a condition where *the event is performed at most 0 times*.
![Creating an audience where customers haven't made a purchase in the last 30 days.](/docs/engage/images/No-purchases.png)


2. **Prompt**: "Customers who don't have a phone number."
- **Expected output**: Segment generates a condition where *the trait doesn't exist*.
![Creating an audience where customers don't have a phone number.](/docs/engage/images/phone-doesn't-exist.png)

## Error handling

Engage uses the following error messages with CustomerAI audiences:

| Error message        | Cause                  |
|---------------------------|---------------------------------------|
| Something went wrong      | An unknown exception occured.                  |
| Something went wrong. Try again later. | The AI service is down, or the LLM returned an error. |
| Segment had trouble creating an audience from this description. Try rewording it using these [best practices](#best-practices). | The prompt referenced an invalid or non-existing trait, audience, or event within the workspace. You may also see this when an audience description is impossible to build or misunderstood. |

## Known limitations

### Limited space schema 

Segment's generative AI service is handled by a third party that needs context about your Engage workspace and has limitations to how many contextual parameters Segment can send it. Because of this, Segment limits the amount of data it sends to the AI service. Segment solves this limitation by including up to 100,000 of the most recently used events and traits in your Engage space. As a result, some event properties may not be populated.

### Language support

At this time, Segment only supports audience description prompts in the English language. Support in other languages is currently unavailable and might provide undesired results. 


## More about Segment's generative AI service

#### How is my data used?

In order to generate the audience based on your description, Segment sends your query to OpenAI, Segment's 3rd party AI service. All queries sent to OpenAI from Segment are anonymized, meaning that OpenAI won't be able to identify from whom the query was sent unless you include uniquely identifiable information in the input.

Behind the scenes, Segment instructs GPT to generate an audience based on the user inputted audience description and contextual information such as traits and events performed in your workspace.

GPT is OpenAI's state of the art natural language generation tool powered by artificial intelligence. It can perform a variety of natural language tasks like text generation, completion, and classification. CustomerAI uses the service to help generate audiences and inspire segmentation.

Per OpenAI's policy, data sent to OpenAI's API with Segment isn't used to train or improve their models and will be deleted after 30 days. Any content generated using GPT is your intellectual property. Segment won't assert any claims of copyright ownership on such content and makes no warranty of any kind with respect to any AI generated content.