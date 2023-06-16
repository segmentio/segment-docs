---
title: Visual HTML Editor
beta: true
---

Use the Visual HTML Editor for both code and visual editing capabilities from a single view. With the Visual HTML Editor, you can import or update your email template with code, or use the visual editor for a code free design experience. 

On this page, you'll learn how to use the Visual HTML Editor to build personalized email templates for your Engage campaigns.

## Getting started

You can navigate to the Visual HTML Editor in two ways:
- When you build a new email template or edit an existing one.
- From a Send Email step in a Journey. 

From the **Select Editor** screen, select **Visual HTML Editor** and click **Build Email**.

## Visual Editor 

Use the visual editor on the right for a no-code option to design your email. With the visual editor, you can:
- Add headings and text
- Modify text color, size, and style
- [Insert an image](#insert-an-image) 
- Add [merge tags](#personalize-with-merge-tags) and links
- Add emojis

Engage updates any changes you make in the visual editor to the [HTML editor](#html-editor) in real-time.

### Insert an image

To insert an image from the visual editor:
1. Select the image icon in the visual editor toolbar.
2. Add the image URL source and alternative text. 
3. Edit the image width and height.
  - You can also click and drag the corners of the image to resize it in the visual editor. 
4. Click **Save**.

> info ""
> The maximum image file size you can upload is 10 MB.

### Preview for desktop or mobile display

To preview your email template, click the preview icon in the visual editor toolbar.

From the preview screen, you can toggle between desktop or mobile to view the email in both displays.  

## HTML Editor

Use the HTML editor on the left to maintain your email template with code. Import existing code or build a new template in the editor. 

Engage displays any changes you make to the HTML editor in the [visual editor](#visual-editor) in real-time. However, if there are any errors in your code, you must fix the errors before Engage displays your updates.

### Error flagging

Engage displays in-line error flags in the code editor to help you debug your code. If there are errors, Engage doesn't render any content in the visual editor until you've debugged your code. 

## Personalize with merge tags 
Add merge tags to personalize your message with user profile traits.

1. From the text toolbar in the visual editor, click the **Merge Tags** drop-down menu.
2. Select profile traits to add to the merge tags.
3. Based on cursor placement, Engage adds merge tags to your template.

> success ""
> You can also add merge tags to your email right from the code editor. 

### Liquid templating

Engage supports liquid templating to create dynamic content in the Visual HTML Editor.

{% raw %}

For example, use  `{% if %}`, `{% elseif %}`, and `{% else %}` tags to call a product by name if known, or use a default message:

```
{% if profile.traits.product_title == "Sneakers" %}
  Hey, view our latest sneakers!
{% elsif profile.traits.product_title == "Sandals" %}
  Hey, check out these sandals!
{% else %}
  Hey, check out our latest footwear.
{% endif %}
```
{% endraw %}


To view more examples related to your use case, visit the [LiquidJS docs](https://liquidjs.com/tags/if.html){:target="blank"}.

## Add unsubscribe links 
It's always best practice to include an unsubscribe link in the emails you build. Engage adds an unsubscribe link to email templates, which you can edit at any time. 

You can add unsubscribe links from the visual or HTML editor. 

From the visual editor: 

1. Select the link icon in the visual editor toolbar. 
2. Enter `[unsubscribe]` in the URL field. 
3. Enter the link attributes and text. 
4. Click **Save**.

To add a link from the code editor, use `<a href = "[unsubscribe]"> </a>` in your HTML. 

For more on email unsubscribe links, view SendGrid's [best practices](https://sendgrid.com/blog/managing-your-marketing-email-unsubscribes/){:target="blank"}.


## Save the template

After you design the email, click **Create Email Template**. Navigate to **Engage > Content > Templates** to view and maintain your email template. 

## Next steps

- Learn more about [building email templates](/docs/engage/content/template/) to include in your Engage campaigns.

- You can also use the [Drag and Drop Editor](/docs/engage/content/email/editor/) in Engage to build Email templates with drag and drop functionality. 

