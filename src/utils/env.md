---
title: Environment Variable Test
hidden: true
---

## Build Metadata

| Field               | Value                         |
| ------------------- | ----------------------------- |
| Build ID            | `{{site.env.BUILD_ID}}`       |
| Build Context       | `{{site.env.CONTEXT}}`        |
| System Architecture | `{{site.env._system_arch}}`   |
| System Version      | `{{site.env_system_version}}` |

## Git Metadata

| Field             | Value                            |
| ----------------- | -------------------------------- |
| Repository URL    | `{{site.env.REPOSITORY_URL`      |
| Git Branch        | `{{site.env.BRANCH}}`            |
| Head              | `{{site.env.HEAD}}`              |
| Commit Ref        | `{{site.env.COMMIT_REF}}`        |
| Cached Commit Ref | `{{site.env.CACHED_COMMIT_REF}}` |
| Pull Request      | `{{site.env.PULL_REQUEST}}`      |
| Review ID         | `{{site.env.REVIEW_ID}}`         |



## Deploy URLs

| Field            | Value                           |
| ---------------- | ------------------------------- |
| URL              | `{{site.env.URL`                |
| Deploy URL       | `{{site.env.DEPLOY_URL}}`       |
| Deploy Prime URL | `{{site.env.DEPLOY_PRIME_URL}}` |
| Deploy ID        | `{{site.env.DEPLOY_ID}}`        |
| Site Name        | `{{site.env.SITE_NAME}}`        |
| Site ID          | `{{site.env.SITE_ID}}`          |




