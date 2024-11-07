---
title: Git Sync Extension
---

Segment's Git extension lets you manage versioning by syncing changes you make in your Segment workspace to a Git repository.

Git Sync supports one-way synchronization from Segment to Git. This sync captures the current state of your workspace through a full sync and includes all new records and changes for supported resources.

Segment doesn't support syncing changes from Git back to Segment.

## Set up Git Sync

Follow these steps to set up Git Sync:

1. In your Segment workspace, navigate to **Settings > Extensions**.
2. Click **Set up Git sync**.
3. On the **Configure service credentials** page, select a service and protocol, add your GitHub App, SSH private key, or GitHub token, then click **Next**.
    - To connect to GitLab or Bitbucket, use your SSH private key.

## Working with Git Sync

The Git sync extension syncs the following resources from Segment to your Git repository:

- [Sources](/docs/connections/sources/) and [Destinations](/docs/connections/destinations/)
- [Warehouses](/docs/connections/storage/warehouses/)
- [Destination Filters and Mappings](/docs/connections/destinations/destination-filters/)
- [Tracking Plans](/docs/protocols/tracking-plan/create/)
- [Functions](/docs/connections/functions/)
- [Transformations](/docs/protocols/transform/)
- [Reverse ETL](/docs/connections/reverse-etl/)
- [Users](/docs/segment-app/iam/concepts/#team-members) and [User groups](/docs/segment-app/iam/concepts/#user-groups)
- [Labels](/docs/segment-app/iam/labels/#where-can-i-create-labels)

Reach out to [Segment support](https://app.segment.com/workspaces?contact=1){:target="blank"} to request support for additional Git Sync resources.

After you set up the Git sync extension for the first time, Segment performs an initial sync that sends the current state of your Segment workspace to the Git repository you connected. Segment automatically tracks all following workspace updates.

You can manually trigger syncs at any time by clicking **Full Sync** on the Git Sync page. To disable Git Sync from the Git Sync page, switch the **Enabled** toggle to off.

## Git Sync architecture and data model

Because a Segment workspace can represent a distinct environment (testing, staging, production), each workspace is mapped directly to a single Git repository. This direct mapping ensures a clear and organized relationship between workspace resources and a Git repository.

Segment uses its [Terraform provider](https://registry.terraform.io/providers/segmentio/segment/1.0.3){:target="_blank"} to manage key functions like tracking changes and retrieving information about those changes in Segment. Segment stores changes in HashiCorp Configuration Language (HCL), the format used by Terraform. To learn more about HCL and how it compares to JSON or YAML, visit [HashiCorp's HCL repository on GitHub](https://github.com/hashicorp/hcl){:target="_blank"}.

Using HCL makes it easier to document Segment's data model, especially for users managing versioning and Git Sync with Terraform. It also helps manage Segment configurations directly from Git. For more details on the Git Sync data model, read [Segment's Terraform provider documentation](https://registry.terraform.io/providers/segmentio/segment/latest/docs){:target="_blank"}.

## Managing your Segment workspace with Terraform and Git Sync

Segment supports one-way synchronization from Segment to Git, but you can set up two-way synchronization using the Segment Terraform provider.

Terraform offers an open-source way to manage Segment resources through a Git repository as an alternative to a fully managed two-way sync. However, this method requires third-party tools like [Atlantis](https://www.runatlantis.io/){:target="_blank"} for CI integration, which Segment doesn’t officially support.

To manage Segment resources using Git and Terraform, follow these steps:

1. Copy the generated Terraform configuration for the resources you want to manage into a separate Git repository dedicated to Terraform.
2. Include the following provider configuration blocks:

    ```hcl
    # providers.tf

    terraform {
    required_providers {
        segment = {
        source  = "segmentio/segment"
        version = "1.0.4"
        }
    }
    }

    provider "segment" {
    # Provide the token directly or load it from an environment variable
    }
    ```
3. Apply configuration changes by running Terraform locally or using a tool like Atlantis to run it directly from your Git provider.


For more information on using Terraform, visit [Terraform's documentation](https://developer.hashicorp.com/terraform/docs){:target="_blank"}.

## Git Connections

Git Connections enable Segment to sync data with your preferred Git repository through supported connection types. Segment supports several connection options connecting, including SSH and token-based authentication.

> info ""
> Git Sync and the dbt integration operate independently. You don’t need Git Sync set up to use dbt, and dbt Cloud can trigger its own syncs without relying on Git Sync.

### Supported connection types

Segment supports the following credential types for setting up a Git Connection:

- **SSH**: Compatible with GitHub, GitLab, and Bitbucket, SSH provides a secure method for connecting to your repository.
- **Git Token**: Git tokens are also supported across GitHub, GitLab, and Bitbucket, enabling token-based authentication for added flexibility.
- **GitHub App**: For GitHub users, GitHub App integrations offer enhanced security and functionality. This method is exclusive to GitHub and supports additional features, such as [CI checks]().

### Reusing Git Connections

Segment lets you set up multiple Git Connections, allowing you to reuse credentials across both dbt and Git Sync. You can either use the same credential for multiple configurations or create separate Git Connections for each product and environment as needed.

If you plan to reuse a Git token across both dbt and Git Sync, ensure it has the necessary read and write permissions for both integrations.


