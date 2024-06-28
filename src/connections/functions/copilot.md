---
title: Functions Copilot
---

Functions Copilot helps you generate JavaScript code for functions using natural language prompts.

> info "Functions Copilot Public Beta"
> Functions Copilot is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

## Functions Copilot benefits

Powered by OpenAI, Functions Copilot improves efficiency and productivity by streamlining the process of creating and managing custom functions. 

Functions Copilot can help you:

- Generate JavaScript code for custom integrations and data transformations.
- Analyze existing code and provide optimization suggestions.
- Secure sensitive data with minimal effort.
- Simplify code testing and maintenance.

## Example prompts

This table lists example prompts you can use with Functions Copilot:

| Function Type                    | Example Prompts                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Source Functions**             | "Transform incoming data into a track event."<br> "Enrich user data with additional demographic details using an external API."                |
| **Destination Functions**        | "Create a function that enriches an Identify event using the Profile API."<br>"Remove PII data and hash email addresses in an Identify event." |
| **Destination Insert Functions** | "Enrich an Identify event using an external API."<br>"Tokenize PII data before sending it downstream."                                         |
|                                  |                                                                                                                                                |

## Best practices and limitations

Follow this guidance when you use Functions Copilot:

- Avoid using personally identifiable information (PII) or sensitive data.
- Write specific prompts. Specificity leads to more accurate CustomerAI function generation. Use the names of existing events, related attributes, and properties.
- Iterate on your prompts. If you don't get the result you're looking for, try rewriting the prompt.

###  Limitations

Keep the following limitations in mind as you work with Functions Copilot:

- **Context limitations**: Functions Copilot generates code based on Segment-specific terminology and the prompts you write. As a result, the generated output may not always be accurate. If the function doesn't initially meet your needs, try to refine or rewrite your prompt.
- **Language support**: Functions Copilot only supports English prompts. Using other languages may impact the accurancy of the generated output.
- **Regional support**: Functions Copilot is only available for US region Segment workspaces. 

## Segment's generative AI service

<!-- PW/June 2024: Stealing this from Generative Audiences, but we should probably centralize this info at some point -->
For Copilot to generate a function, Segment sends your query to OpenAI, Segment’s 3rd party AI service. All queries sent to OpenAI from Segment are anonymized, meaning that OpenAI won’t be able to identify from whom the query was sent unless you include uniquely identifiable information in the input.

GPT is OpenAI’s state-of-the-art natural language generation tool powered by artificial intelligence. It can perform a variety of natural language tasks like text generation, completion, and classification. CustomerAI uses the service to inspire segmentation and build functions and audiences.

According to OpenAI’s policy, OpenAI will not use data sent from Segment to train or improve their models, and they will delete the data after 30 days. Any content generated using GPT belongs to you. Segment will not claim copyright ownership of such content and makes no warranty regarding any AI generated content.

For more information, see the [Functions Copilot Nutrition Facts Label](/docs/connections/functions/functions-copilot-nutrition-facts/).