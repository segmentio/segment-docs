---
title: WhatsApp Template
plan: engage-premier
---

> info "WhatsApp Public Beta"
> WhatsApp as an Engage channel is in public beta. 

With Twilio Engage, you can build personalized WhatsApp templates to store and use throughout marketing campaigns. 

This page explains how to create, build, and submit WhatsApp templates for approval.

> warning "WhatsApp Template Approval"
> WhatsApp templates must be approved by Meta before you can use them in campaigns. 

## WhatsApp template types

You can choose between three WhatsApp template types:

- **Media**, which contain media and text content
- **Text**, which contain text content of up to 1600 characters
- **Call to action**, which contain text content and phone or website buttons

## Build a WhatsApp message template

Follow these steps to build a WhatsApp template:

1. Navigate to **Engage > Content** and click **Create template**.
2. Select **WhatsApp**, then click **Configure**.
3. Enter a template name and select your template's language.
4. Select your template's content type, then click **Next**.
    - For text templates, enter your message's text in the **Body** field and add any desired [merge tags](#personalize-with-merge-tags).
    - For media templates, enter your message's text in the **Body** field, add the media URL, then add any desired merge tags.
    - For call to action templates, enter your message's text in the **Body** field, then add buttons for a phone number or website. 
5. Once you've finished adding your template's content, click **Save and submit for WhatsApp approval** or **Save**. 
    - If you choose to submit your template for approval, confirm by clicking **Submit**.
6. Segment confirms that your template was saved **or** saved and submitted for approval.

## Submit a saved template for approval

If you saved your template without submitting it for approval, it won't be available for use in campaigns until you submit it for approval. 

Follow these steps to submit saved templates for approval:

1. Navigate to **Engage > Content > WhatsApp**.
2. In the WhatsApp Templates table, select the template you want to submit for approval.
3. Review your template. If you're ready to submit it for approval, select **Save and submit for WhatsApp approval**.
4. In the **Submit for WhatsApp review** overlay, select **Submit**.
5. Segment then confirms that your template was saved and submitted for approval.

## Personalize with merge tags

You can personalize your WhatsApp templates with merge tags based on profile traits. 

To include merge tags in your template, click **+ Add merge tag** in the template builder and select the profile trait(s) you want to include in your message. 

Segment displays the merge tag in the body as a numerical value surrounded by curly braces, like `{% raw %}{{1}}{% endraw %}`. When a susbcriber triggers your WhatsApp campaign, Segment will replace the merge tag with the specific value associated with that subscriber's profile. 

If a merge tag doesn't apply to a subscriber, Engage will use the content you enter into the **Default content** field.

![Using merge tags with a WhatsApp message](/docs/engage/images/merge_tag.png "Using merge tags with a WhatsApp message")

> info ""
> To learn more about profile traits, visit Segment's [Computed Traits](/docs/engage/audiences/computed-traits/) and [SQL Traits](/docs/engage/audiences/sql-traits/) documentation.


## Template approvals

Meta must first review and approve your WhatsApp template before you can use it in a campaign. Meta approves most templates in under an hour, but some approvals can take up to 48 hours. Keep this time frame in mind if you plan to send time-sensitive campaigns. 

For more on the template approval process, view [recommendations and best practices for creating WhatsApp Message Templates](https://support.twilio.com/hc/en-us/articles/360039737753-Recommendations-and-best-practices-for-creating-WhatsApp-Message-Templates){:target="_blank"}.

## Next steps

Once your template has been approved, you can [create a Journey to send a WhatsApp campaign](/docs/engage/campaigns/whatsapp-campaigns).
