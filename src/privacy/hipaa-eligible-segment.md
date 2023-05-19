---
title: HIPAA Eligible Segment
---

Segment is a HIPAA eligible platform, and meets the data privacy and security requirements of healthcare customers and their stakeholders. For more information about Segment becoming HIPAA eligible, see the [announcement blog post](http://segment.com/blog/segment-for-healthcare){:target="_blank"}.

## Business Associate Addendum

> info ""
> Twilio BAA are available to customers on a Business Tier plan.

Before you begin, check that the Segment products and services you'll use for your HIPAA workflows are on the list of Twilio's [HIPAA Eligible Products and Services](https://twil.io/HIPAA-eligible-products-and-services){:target="_blank"}. After you've verified availability, contact your Account Expert to [request a demo](https://segment.com/contact/sales/){:target="_blank"}.

## Verify your Workspace

Ensure your Workspace is eligible for HIPAA before you configure and send any personal health information (PHI).

1. In your Workspace, navigate to **Settings > Workspace Settings**.
2. On the **General Settings** tab, ensure that the HIPAA badge appears. This badge confirms that the Workspace is HIPAA eligible. ![HIPAA Eligible](images/hipaa-eligible.png)

With the BAA signed and Workspace confirmed as eligible, you can start building. For more information about starting a HIPAA compliant implementation, see Twilio's [Architecting for HIPAA on Twilio](https://twil.io/architecting-for-hipaa){:target="_blank"}, which outlines the shared responsibilities and requirements for building and maintaining HIPAA-compliant workflows in Segment.

## Data hashing

When workspace owners add new destinations to a HIPAA eligible Segment workspace, they can hash any fields [marked as yellow in the Privacy Portal](/docs/privacy/portal) before data is sent to the destination. 

<!---This feature addresses the Special Considerations for HIPAA section on page 28 of Twilio's [Architecting for HIPAA on Twilio](https://twil.io/architecting-for-hipaa){:target="_blank"} guide.--->


### Configure data hashing for a new destination

To configure data hashing while setting up a new destination:
1. From the Destinations page in the Segment App, click **Add destination**.
2. Select a destination from the catalog and click **Configure**.
3. On the Select data source page, select the source you want to connect to your destination.
4. Click **Next**.
5. On the Setup page, give your destination a name, fill in any optional settings, and select the **Have Segment hash sensitive data** checkbox.
6. From the **Fields** dropdown, select one or more fields from which you'd like to hash data and click the **Generate hashing keys** button. 
7. Copy the Private Key to a secure location - **once you finish setting up the destination, this key cannot be retrieved**. 
8. Click **Save**.


> error "Private Key is not recoverable"
> Segment does not save the private key created during the data hashing setup flow, and cannot retrieve the key after you finish setting up your destination. You can generate a new key without un-encrypting and re-encrypting your data using the instructions in the [Configure new key pairs](#configure-new-key-pairs) section.

### Configure data hashing for an existing destination
 
To configure data hashing for an existing destination:
1. Open the [My destinations page](https://app.segment.com/goto-my-workspace/destinations){:target="_blank”} in the Segment app.
2. Select a destination, and click **Settings**.
3. On the Settings page, select the **Have Segment hash sensitive data** checkbox.
4. From the **Fields** dropdown, select one or more fields from which you'd like to hash data and click the **Generate hashing keys** button. 
5. Copy the Private Key to a secure location - **once you finish configuring data hashing, this key cannot be retrieved**. 
6. Click **Save**.


> error "Private Key is not recoverable"
> Segment does not save the private key created during the data hashing setup, and cannot retrieve the key after you add data hashing to your destination. You can generate a new key without un-encrypting and re-encrypting your data using the instructions in the [Configure new key pairs](#configure-new-key-pairs) section.


### Configure new key pairs

<!---TBD--->