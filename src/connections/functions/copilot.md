---
title: Functions Copilot
---

Powered by OpenAI, Functions Copilot helps you generate JavaScript code for Functions using natural language prompts.

Functions Copilot improves efficiency and productivity by streamlining the process of creating and managing custom functions, freeing up time and engineering resources. 

## Using Functions Copilot

Functions Copilot helps you:

- Generate JavaScript code for custom integrations and data transformations.
- Analyze existing code and provide optimization suggestions.
- Secure sensitive data with minimal effort.
- Simplify code testing and maintenance.

## Example prompts

This table lists examples of prompts you can use with Functions Copilot:

| Function Type                    | Example Prompts                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Source Functions**             | "Transform incoming data into a track event."<br> "Enrich user data with additional demographic details using an external API."                |
| **Destination Functions**        | "Create a function that enriches an identify event using the Profile API."<br>"Remove PII data and hash email addresses in an Identify event." |
| **Destination Insert Functions** | "Enrich an Identify event using an external API."<br>"Tokenize PII data before sending it downstream."                                         |
|                                  |                                                                                                                                                |


## Best practices 

Follow this guidance when you use Functions Copilot:

- Avoid using customer personally identifiable information (PII) or sensitive data.
- Write specific prompts. Specificity leads to more accurate CustomerAI function generation. Use the names of existing events, related attributes, and properties.
- Iterate on your prompts. If you don't get the result you're looking for, try rewriting the prompt.

## Limitations

Keep the following limitations in mind as you work with Functions Copilot:

- **Context limitations**: Functions Copilot generates code based  on Segment-specific terminology and the prompts you write. As a result, the generated output may not always be accurate. If the function doesn't initially meet your needs, try to refine or rewrite your prompt.
- **Language support**: Functions Copilot only supports English prompts. Using other languages may impact the accurancy of the generated output.
- **Regional support**: Functions Copilot is only available for US region workspaces. 
