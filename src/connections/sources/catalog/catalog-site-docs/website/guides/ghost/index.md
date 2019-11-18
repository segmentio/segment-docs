---
title: "Ghost Guide [Deprecated]"
hidden: true
---

Segment makes it simple for Ghost bloggers to integrate event and real-time analytics, heat map, optimization, and advertising tools. Rather than installing all your tools individually, you just install Segment once. We collect your data, translate it, and route it to any tool you want to use. Using Segment as the single platform to manage and install your third-party services will save you time and money.

<div align="center">![ghost logo](/docs/sources/website/guides/ghost/images/logo.png)</div>

The guide below explains how to install Segment in your Ghost blog. All you need to get up and running is copy and paste a few snippets of code. (You don't have to edit the code or be versed in JavaScript.) The following guide will show you how, step by step.

- - -

{% include content/deprecated.md %}


## Create a Segment Account

Start by creating a Segment account. We recommend creating an organization so you can invite teammates to your account in the future.

Once your account is created, add a new source.


## Install Your Snippet

Once your Segment account is ready to go you'll need to install a few lines of javascript into your Ghost theme templates. Start with your javascript snippet to load our Analytics.js library across your whole Ghost site.

Here's your standard snippet:

{{{snippet-example 'YOUR_WRITE_KEY'}}}


### Basic Setup

For the basic most basic page tracking and nothing else, all you have to do is copy the snippet above, replace `YOUR_WRITE_KEY` with the **Write Key** from your Segment source and paste the snippet into your theme folder `template.hbs` file. It should go write above the `</head>` tag.

If you only want basic page tracking you're done!


### Complete Setup

If you have a bit more time and want some deeper analysis we recommend going through the rest of this guide.

The first step is to copy the snippet above, replace `YOUR_WRITE_KEY` with the **Write Key** from your Segment source in the snippet. Then remove `analytics.page();` from the snippet.

We remove that line from the snippet because we'll manually add a [`page`](/docs/spec/page) call with extra details to each template in your Ghost theme.

- - -


## Page Templates

All of the remaining sections refer to a file in your Ghost theme folder. You'll need to copy the snippet provided and paste it into the `.hbs` file specified.

We recommend pasting the code we provide above the `{% raw %}{{> footer}}{% endraw %}` tag.


## Index Page

The first page we'll track is the Index page.

**File:** `index.hbs`

**Code:**
```html
<script type="text/javascript">
  analytics.page('Index');
</script>
```

Make sure the above script is pasted right above the `{% raw %}{{> footer}}{% endraw %}` tag. That way it won't have any issues with any other logic happening on the page.


## Blog Post

**File:** `post.hbs`

**Code:**
```js
<script type="text/javascript">
  analytics.page('Post', {
    postId: '\{{id}}',
    postClass: '\{{post_class}}',
    datePublished: '\{{date format="YYYY-MM-DD"}}',
    postAuthor: '\{{author.name}}',
    tags: '\{{tags}}'
  });

  function disqus_config() {
    this.callbacks.onNewComment = [function() {
      analytics.track('Commented');
    }];
  }
</script>
```


Make sure the above script is pasted right above the `{% raw %}{{> footer}}{% endraw %}` tag. That way it won't have any issues with any other logic happening on the page.


## Static Page

**File:** `page.hbs`

**Code:**
```js
<script type="text/javascript">
  analytics.page('Static', {
    postId: '\{{id}}',
    postClass: '\{{post_class}}',
    datePublished: '\{{date format="YYYY-MM-DD"}}',
    postAuthor: '\{{author.name}}',
    tags: '\{{tags}}'
  });

  function disqus_config() {
    this.callbacks.onNewComment = [function() {
      analytics.track('Commented');
    }];
  }
</script>
```

Make sure the above script is pasted right above the `{% raw %}{{> footer}}{% endraw %}` tag. That way it won't have any issues with any other logic happening on the page.


## Tags Page

**File:** `tags.hbs`

```js
<script type="text/javascript">
  analytics.page('Tags', {
    tagName: '\{{tag.name}}',
    tagSlug: '\{{tag.slug}}'
  })
</script>
```

Make sure the above script is pasted right above the `{% raw %}{{> footer}}{% endraw %}` tag. That way it won't have any issues with any other logic happening on the page.


## 404 Page

**File:** `error.hbs`

```js
<script type="text/javascript">
  analytics.page('404');
</script>
```

Make sure the above script is pasted right above the `{% raw %}{{> footer}}{% endraw %}` tag. That way it won't have any issues with any other logic happening on the page.


## That's It!

You're good to go tracking your Ghost blog!
