---
title: 'Single Page Apps with Analytics.js'
hidden: true
strat: ajs
---

Analytics.js can work with your single-page applications built with technologies such as React or Vue.  

## Integrating with your build tooling
If you are planning to do some deep integration with Analytics.js and your single-page application, you may need to integrate Analytics.js with your build system.  This can easily be done using our analytics node package instead of the Analytics.js snippet.  This package work like any standard nodejs dependency.

First add `analytics-node` as a dependency:

```shell script
$ npm install analytics-node 
```

or, if you are using yarn:

```shell script
$ yarn add analytics-node
```

Once installed, you can import `analytics-node` and instrument your events like you would with Analytics.js.  Here is an example implementation in React:

```js
import Analytics from 'analytics-node'

const analytics = new Analytics("YOUR WRITE KEY")

class ShoppingCartButton {
    onPurchase = () => {
        analytics.Track("Item Purchased", {
            itemId: "abc"
        })
    }
    
    render() {
        return <button onClick={this.onPurchase}>Buy Item</button>
    }   

}
```

Our snippet approach still works fine with the SPAs, and nothing should be done fundamentally different from non-SPA apps. I can guess big bulk of our customers have SPAs without any issue. So I don’t think we need to dedicate a section on SPAs. 

We should definitely write docs around how to integrate specifically with Next.JS / Gatsby frameworks as they don’t offer access to the index.html right out of the box, and that makes adding a snippet difficult. We need to spend some time and create a reference implantation to understand the right way of integrating with Next/Gatsby before prescribing that to the customers.

We can add a section to the docs about how to use analytics.js as an npm package ( similar to this ). I’m waiting to get some feedback from OSS community on the npm usage before moving it to the official docs, but we can offer that as an alternative solution to snippet specifically for SPA users.