---
title: [Twilio Messaging] Destination
---

{% include content/plan-grid.md name="actions" %}

[Twilio Messaging](https://www.twilio.com/en-us/messaging/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} allows businesses to send and receive SMS, MMS, WhatsApp and other messaging platform messages, enabling direct communication with customers. Use this Destination to send SMS, MMS, WhatsApp or Messenger messages via Twilio Messaging.  

This destination is maintained by Segment. For any issues with the destination [contact the Segment Support team](mailto:friends@segment.com).

## Getting started

### Create Twilio API Key and Secret

1. Sign in to your [Twilio Console](https://console.twilio.com/). On the "Twilio Home" page save the **Account SID** value securely. You will need it in a later step. 
2. While still on the "Twilio Home" page, click on **Go to API Keys**.
3. On the "API keys & tokens" page, click **Create API key** then follow the instructions to create the key. **Key Type** should be set to Standard.
4. On the "Copy secret key" page, save the **SID** and **Secret** values securely. You will need these in a later step. 
5. Click the **Done** button to create the API Key. 

### Create the Twilio Messaging Destination 

1. From your Segment workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Twilio Messaging".
2. Select the Twilio Messaging tile and click **Add Destination**.
3. Select an existing Source to connect to Twilio Messaging.
4. On the Settings page, provide the **Twilio Account SID**, **Twilio API Key SID** and **Twilio API Key Secret** values.
5. Enable the Destination then click the **Save Changes** button. 

### Configure the Send message Mapping

1. From the Twilio Messaging Destination's **Settings** page, click **Mapping** > **New Mapping**.  
2. Select the **Send message** Action. 
3. Provide Mapping Trigger and Field values to configure the Mapping. Then Save and Enable the Mapping. 

{% include components/actions-fields.html %}

## Additional information

### Supported messaging channels
Messages can be sent via SMS, MMS, WhatsApp and Facebook Messenger channels. 

### Supported Content Template types
The following Twilio Content Template types are supported: **Text**, **Media**, **Quick reply**, **Call to action**, **List picker**, **Card**, **WhatsApp card**, **WhatsApp Authentication** and **Catalog**.

### Inline messages
Messages can also be sent without referencing a Twilio Content Template. In this case the message body, Media URLs, and variables can be defined directly in Mapping fields. Segment then constructs the final message body by combining the provided body and variables before sending it through Twilio.

1. Select **Inline** from the 'Content Template Type' mapping field. 
2. Provide the message body in the **Inline Template** field. Variables can be included using Handlebars notation. e.g. {{first_name}} 
3. Provide Media URLs in the **Inline Media URLs** field. 
4. Define variables using the **Inline Variables** field. Make sure to define variables for every variable included in the message body. 

### Can templates be defined or edited in Segment?
Segment does not have a Content Template Builder capability. Content Templates must be built in Twilio first, then referenced in Segment. Alternatively, the 'Inline message' option can be used (see above). 

### Sender details
Three types of Sender types are supported: 
1. Phone Number - An E.164 formatted phone number. Check the Twilio Console to ensure that the selected number supports the selected Channel type. 
2. Messenger Sender ID - This is supported only when the **Facebook Messenger** channel type is selected.
3. Twilio Messaging Service - This is supported for all channels. 

### Variables
Variables can be used in both Content Templates and for inline messages and can be included in the message body as well as Media URLs. Variables referenced when using Content Templates must be pre-defined in Twilio.  