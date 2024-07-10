---
title: Iterate (Actions) Destination
hide-boilerplate: true
hide-dossier: true
beta: true
id: 62fec615a42fa3dbfd208ce7
---

{% include content/plan-grid.md name="actions" %}


[Iterate](https://iteratehq.com){:target="_blank"} helps you harness customer insights across your whole business with the world’s leading Customer Insights Manager. Put customer insights at the center of your business with user-friendly research tools that look and feel like your brand. With mobile, website and email surveys that are highly targeted, user-friendly, and on-brand, you can learn directly from your visitors, customers, and users.

Iterate maintains this destination. See [Iterate's documentation](http://help.iteratehq.com/en/articles/6515486-segment-integration){:target="_blank"} or contact [support@iteratehq.com](mailto:support@iteratehq.com) with any questions.



## Benefits of Iterate (Actions)

Iterate (Actions) provides the following benefits:

- **Simple setup** - Iterate (Actions) has a streamlined default setup process making it easier to get started in a way that "just works".
- **More control** - Actions-based destinations enable you to define the mapping between the data Segment receives from your sources, and the data Segment sends to Iterate.
- **Default property mappings** - Default mappings from the Segment like userId, userTraits, and more, allow data to be mapped correctly without any setup required.



## Getting started

1. From the Segment web app, navigate to **Connections > Catalog > Destinations**.
2. Click the **Destination Actions** category item in the left navigation.
3. Search for *Iterate (Actions)* and select it.
4. Click **Configure Iterate (Actions)**.
5. Select an existing Source to connect to Iterate (Actions).
6. Set your Embed API Key. See [Getting your Embed API Key](#getting-your-embed-api-key) for details.


{% include components/actions-fields.html %}

## Get your Embed API Key

To get your Embed API Key:
1. Log in to Iterate.
2. Create a Website survey.
3. Click **Preview and publish**.
4. In the 'Embed your survey script' section, select the value of the 'apiKey' property in the embed code.

## Create and configure your Iterate survey

Once the Iterate (Actions) destination is configured, you're ready to create your survey and display it in response to an event. To create and configure your Iterate survey:

1. Log in to your Iterate account.
2. Create a new website survey. Learn more about [setting up your website survey](https://help.iteratehq.com/en/articles/2835011-creating-a-website-survey){:target="_blank"}.
3. Add questions to your survey.
4. Customize your survey.
5. Enable event targeting.
    1. Click the **targeting options** tab.
    2. In the **Where the survey is displayed** section select **In response to an event**.
    3. Enter the name of the event(s) you would like to trigger this survey to be displayed.
6. Choose the rest of your your targeting options.
7. Test your survey.
    1. Click **Preview and publish**.
    2. Copy the `iterate_preview` parameter from the **Test your survey** section.
    3. Go to your website and add the `iterate_preview` parameter to the url.
    4. Trigger one of the events you are targeting to get the survey to display.
7. Publish your survey.

## Associate user data with your survey

You can associate user data with the responses to your survey by using the [Segment Identify](docs/connections/spec/identify/) call. Any data sent in this call associates with that user's responses to all surveys.
