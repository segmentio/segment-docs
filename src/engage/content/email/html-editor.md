---
title: HTML Editor
beta: true
---

Use the HTML Editor to design your email template with both code and visual editing capabilities. Build your email template with code, copy and paste existing code, or use the Visual Editor for a code free design experience. 

On this page, you'll learn how to use the HTML Editor to build personalized email templates for your Engage campaigns.

## Getting started

You can navigate to the HTML Editor in two ways:
- When you build a new email template or edit an existing one.
- From a Send Email step in a Journey. 

From the **Select Editor** screen, select **HTML Editor** and click **Build Email**.

 
## Visual Editor 

Use the Visual Editor for a no-code option to design your email. With the Visual Editor, you can:
- Add or modify headings and text
- Modify text color, size, and style
- [Insert an image](#insert-an-image) 
- Add [merge tags](#personalize-with-merge-tags) and links
- Add emojis

Engage updates any changes you make in the Visual Editor to the HTML Editor in real-time.

### Insert an image

To insert an image from the Visual Editor:
1. Select the image icon in the Visual Editor toolbar.
2. Add the image URL source and alternative text. 
3. Edit the image width and height.
  - You can also click and drag the corners of the image to resize it in the Visual Editor. 
4. Click **Save**.


### Preview for desktop or mobile display

To preview your email template, click the preview icon in the Visual Editor toolbar.

From the preview screen, you can toggle between desktop or mobile to view the email in both displays.  

## HTML Editor

Use the HTML Editor to maintain your email template with code. Copy and paste existing code or build a new template in the editor. 

Engage displays any changes you make in a preview screen to the right of your code. You can preview your email in both desktop and mobile display.

Click **Format** at any time to properly indent and format your code in the HTML Editor. 

> info ""
> When you toggle from the HTML Editor to the Visual Editor, Engage may make minor changes to your code formatting. If Engage re-formats your code, it will not affect the email layout.

### Error flagging and content validation

Engage displays in-line error flags in the code editor to help you debug your code. If there are errors, you might not see content as expected in the preview screen until you've debugged your code.

For all content editors in Engage, you'll see alerts for any issues in your template, such as invalid profile traits or incorrect [liquid syntax](https://liquidjs.com/tags/overview.html){:target="blank"}. Engage both flags template issue(s), and displays recommended next steps. While you can save these templates, you must fix any issues before using them in Engage campaigns. 

## Personalize with merge tags 
Add merge tags to personalize your message with user profile traits.

1. From the text toolbar in the Visual Editor, click the **Merge Tags** drop-down menu.
2. Select profile traits to add to the merge tags.
3. Based on cursor placement, Engage adds merge tags to your template.

> success ""
> You can also add merge tags to your email right from the code editor. 

### Liquid templating

Engage supports liquid templating to create dynamic content in the HTML Editor. 

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

If you use liquid templating, be sure to [test your email](/docs/engage/content/email/template/#test-the-email-template/) to make sure that everything renders properly. 

> success ""
> While both the HTML and Visual Editor support liquid templating, Segment recommends using the HTML Editor to write liquid templating.

> warning ""
> Engage doesn't support liquid template syntax that produces partial blocks of HTML. 

To view more examples related to your use case, visit the [LiquidJS docs](https://liquidjs.com/tags/if.html){:target="blank"}.

## Add unsubscribe links 
It's always best practice to include an unsubscribe link in the emails you build. Engage adds an unsubscribe link to email templates, which you can edit at any time. 

You can add unsubscribe links from the visual or HTML Editor. 

From the Visual Editor: 

1. Select the link icon in the [Visual Editor](#visual-editor) toolbar. 
2. Enter `[unsubscribe]` in the URL field. 
3. Enter the link attributes and text. 
4. Click **Save**.

To add a link from the code editor, use `<a href = "[unsubscribe]"> </a>` in your HTML. 

For more on email unsubscribe links, view SendGrid's [best practices](https://sendgrid.com/blog/managing-your-marketing-email-unsubscribes/){:target="blank"}.

## Toggle between editors

From the editor screen, you can click **Use HTML Editor** or **Use Visual Editor** to toggle between the two editors.
 
The Visual Editor renders your HTML in an editable preview (similar to an email client), so you might need to accept formatting changes to your HTML to use the Visual Editor. In this case, Segment displays a confirmation modal with HTML differences.

Potential HTML changes may include formatting, removing attributes with potentially unsuported scripts in your HTML (for example, `onclick` or `onblur`), attribute reordering, and adding missing tags.

If you don't want to accept the changes required to use the Visual Editor, you can continue editing in the HTML Editor.

### Formatting your HTML

In the HTML Editor, you can use the **Format** button to properly indent and format your code. Note that the Format button may not implement all changes necessary to use the Visual Editor.


## Save the template

After you design the email, click **Create Email Template**. You can navigate to **Engage > Content > Templates** to view and maintain your email template. 

## Next steps

- Learn more about [building email templates](/docs/engage/content/template/) to include in your Engage campaigns.

- You can also learn about the [Drag and Drop Editor](/docs/engage/content/email/editor/) in Engage to build Email templates with drag and drop functionality. 

> warning ""
> Once you create an email with the HTML Editor, you can't modify it with the Drag and Drop Editor, and vice versa.  

 