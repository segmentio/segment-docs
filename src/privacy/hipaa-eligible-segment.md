---
title: HIPAA Eligible Segment
plan: hipaa-eligible
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

## HIPAA Auditing
Segment maintains audit logs of every read and update action a user performs in the Segment app that may involve PHI/PII. 

Data captured in the HIPAA audit logs includes:
 - `workspace_id`: unique identifier of the workspace
 - `actor_user_id`: unique identifier Segment assigns to the logged in user
 - `event_type`: The action performed by the user. For example, `Source Debugger Raw Viewed`, `Destination Filter Modified`, or other events
 - `end_user_id`: Segment sometimes assigns this unique identifier to an end-user, event, audience, or journey, depending on the event type
 - `timestamp`: Time in UTC when the action occurred

These logs can be provided upon request. For specific requests, please reach out to [friends@segment.com](mailto:friends@segment.com){:target="_blank"}.

## Data encryption

Segment encrypts the data in fields [marked as yellow in the Privacy Portal](/docs/privacy/portal) using a key pair. After Segment encrypts the data, it converts the data type to `string`. Any validation that looks for the datatype `integer` will fail for encrypted values.

> info "Data encryption is currently in public beta"
> This means that the data encryption features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.
>
> During the public beta, data encryption supports event-streaming, cloud-mode destinations.


### Configure data encryption for a new destination

To configure data encryption while setting up a new destination:
1. From the Destinations page in the Segment App, click **Add destination**.
2. Select a destination from the catalog and click **Configure**.
3. On the Select data source page, select the source you want to connect to your destination.
4. Click **Next**.
5. On the Setup page, give your destination a name, fill in any optional settings, and select the **Have Segment encrypt sensitive data** checkbox.
6. Open the **Fields** dropdown, select one or more fields you'd like to encrypt and click the **Generate Encryption Keys** button. 
7. Copy the Private Key to a secure location - **once you finish setting up the destination, this key cannot be retrieved**. 
8. Click **Save**.

> error "Private Key is not recoverable"
> Segment does not save the private key created during the data encryption setup flow, and cannot retrieve the key after you finish setting up your destination. You can generate a new key without decrypting your data using the instructions in the [Configure new key pairs](#configure-new-key-pairs) section.

### Configure data encryption for an existing destination
 
To configure data encryption for an existing destination:
1. Open the [My destinations page](https://app.segment.com/goto-my-workspace/destinations){:target="_blank”} in the Segment app.
2. Select a destination, and click the **Data Encryption** tab.
3. On the Data Encryption page, select the **Have Segment encrypt sensitive data** checkbox.
4. Open the **Fields** dropdown, select one or more fields you'd like to encrypt and click the **Generate Encryption Keys** button. 
5. Copy the Private Key to a secure location - **once you finish configuring data encryption, this key cannot be retrieved**. 
6. Click **Save**.

> error "Private Key is not recoverable"
> Segment does not save the private key created during the data encryption setup, and cannot retrieve the key after you add data encryption to your destination. Segment cannot decrypt data if this key is lost. You can generate a new key without decrypting your data using the instructions in the [Configure new key pairs](#configure-new-key-pairs) section.  


### Configure new key pairs

If you lose access to your initial private key, you can generate a new key pair in the settings tab of your destination. Any data previously encrypted using the previous key pair will remain encrypted.

To generate a new key pair:
1. Open the [My destinations page](https://app.segment.com/goto-my-workspace/destinations){:target="_blank”} in the Segment app.
2. Select a destination, and click **Settings**.
3. On the Settings page, deselect the **Have Segment encrypt sensitive data** checkbox.

<!---todo: after test env access, verify steps beyond step #3--->

### Remove encryption

Disabling the **Have Segment encrypt sensitive data** setting removes encryption on all data that comes into a source after the setting was disabled. Disabling the **Have Segment encrypt sensitive data** setting does not decrypt any data that has already been encrypted.

To remove encryption from future data coming into a destination:
1. Open the [My destinations page](https://app.segment.com/goto-my-workspace/destinations){:target="_blank”} in the Segment app.
2. Select a destination, and click **Settings**.
3. On the Settings page, deselect the **Have Segment encrypt sensitive data** checkbox.
4. On the **Turn off data encryption?** popup, click **Confirm**.

> success ""
> Disabling the data encryption setting does not decrypt data that is already in the destination, but does prevent any future data from being encrypted. 
