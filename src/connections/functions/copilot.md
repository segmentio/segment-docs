---
title: Functions Copilot
---

Functions Copilot helps you generate JavaScript code for functions using natural language prompts. For more information about the language model used to generate JavaScript code, see the [Functions Copilot Nutrition Facts Label](/docs/connections/functions/functions-copilot-nutrition-facts/).

## Functions Copilot benefits

Functions Copilot improves efficiency and productivity by streamlining the process of creating and managing custom functions. 

Functions Copilot can help you:

- Generate JavaScript code for custom integrations and data transformations.
- Analyze existing code and provide optimization suggestions.
- Secure sensitive data with minimal effort.
- Simplify code testing and maintenance.

## Example prompts

This table lists example prompts you can use with Functions Copilot:

| Function Type                    | Example Prompts                                                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Source Functions**             | "Transform incoming data into a track event."<br><br>"Enrich user data with additional demographic details using an external API."                 |
| **Destination Functions**        | "Create a function that enriches an Identify event using the Profile API."<br><br>"Remove PII data and hash email addresses in an Identify event." |
| **Destination Insert Functions** | "Enrich an Identify event using an external API."<br><br>"Tokenize PII data before sending it downstream."                                         |

## Best practices and limitations

Follow this guidance when you use Functions Copilot:

- Avoid using personally identifiable information (PII) or sensitive data.
- Write specific prompts. Specificity leads to more accurate CustomerAI function generation. Use the names of existing events, related attributes, and properties.
- Iterate on your prompts. If you don't get the result you're looking for, try rewriting the prompt.

###  Limitations

Keep the following limitations in mind as you work with Functions Copilot:

- **Context limitations**: Functions Copilot generates code based on Segment-specific terminology and the prompts you write. As a result, the generated output may not always be accurate. If the function doesn't initially meet your needs, try to refine or rewrite your prompt.
- **Language support**: Functions Copilot only supports English prompts. Using other languages may impact the accuracy of the generated output.