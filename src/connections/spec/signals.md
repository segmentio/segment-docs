---
title: 'Spec: Signals'
---

This page is a guide for developers who want to track events with Segment's Auto-Instrumentation. It explains structure and definition of Signals.


## Overview

Signals provides automated user activity tracking through a sophisticated breadcrumb system. It captures crucial user interactions and allows you to transform them into meaningful analytics events using JavaScript.

### Key Features

- **Comprehensive Activity Tracking**
  - User interface interactions
  - Network activity monitoring (inbound/outbound)
  - Local data access patterns
  - Integration with existing analytics events
- **Enterprise-Grade Privacy**
  - Built-in PII protection
  - Automatic data obfuscation in release builds
  - Configurable privacy rules
- **Flexible Event Generation**
  - Transform breadcrumbs into Segment events using JavaScript
  - Create custom event generation rules
  - Process and filter data in real-time

## Signal Types

There are 6 different types of Signals:

- **Interaction Signal** - Captures user interactions with interface elements such as clicks, form submissions, and input changes
- **Navigation Signal** - Tracks navigation events and screen/page transitions in web and mobile applications
- **Network Signal** - Monitors HTTP requests and responses, including API calls and data fetching operations
- **Local Data Signal** - Records local data storage operations like creating, reading, updating, or deleting data
- **Instrumentation Signal** - Captures existing analytics events and instrumentation data from Segment Analytics
- **User Defined Signal** - Allows for custom signal types with application-specific data and properties

### Base Signal Properties

All signals include these base properties:

| Property | Type | Description |
|----------|------|-------------|
| `type` | `string` | The category of signal: `'interaction'`, `'navigation'`, `'network'`, `'localData'`, `'instrumentation'`, or `'userDefined'` |
| `anonymousId` | `string` | Anonymous identifier for the user |
| `timestamp` | `string` | ISO timestamp when the signal was created |
| `index` | `number` | Sequential index for signal ordering |
| `data` | `any` | Signal-specific data. Each type has different shape of data. See specific Signal for details |
| `context` | `Context` | Runtime context information |

**Example:**
```json
{
  "type": "interaction",
  "anonymousId": "user-abc123",
  "timestamp": "2024-01-15T14:30:00.000Z",
  "index": 42,
  "data": { "eventType": "click" },
  "context": { "app": { "name": "ShopApp" } }
}
```

#### Content Properties

The `Context` type is defined as follow:

| Property | Type | Description |
|----------|------|-------------|
| `app.name` | `string` | Application name |
| `app.version` | `string` | Application version |
| `app.build` | `string` | Application build identifier |
| `app.namespace` | `string` | Application namespace |
| `library.name` | `string` | Signals library name |
| `library.version` | `string` | Signals library version |
| `signalsRuntime` | `string` | Signals Runtime version identifier |

**Example:**
```json
{
  "app": {
    "name": "ShopApp",
    "version": "2.1.0",
    "build": "build-456",
    "namespace": "com.shop.mobile"
  },
  "library": {
    "name": "@segment/signals-runtime",
    "version": "1.0.0"
  },
  "signalsRuntime": "1.0.0"
}
```


#### Web-Specific Properties

Web signals include additional page context:

| Property | Type | Description |
|----------|------|-------------|
| `page.url` | `string` | Full URL of the current page |
| `page.path` | `string` | Path portion of the URL |
| `page.search` | `string` | Query string parameters |
| `page.hostname` | `string` | Hostname of the current page |
| `page.hash` | `string` | Hash fragment of the URL |
| `page.referrer` | `string` | Referrer URL |
| `page.title` | `string` | Page title |

**Example:**
```json
{
  "page": {
    "url": "https://shop.com/products/laptop",
    "path": "/products/laptop",
    "search": "?color=silver&size=15",
    "hostname": "shop.com",
    "hash": "#reviews",
    "referrer": "https://google.com/search",
    "title": "Gaming Laptop - ShopApp"
  }
}
```

### Specific Signal Properties
#### Interaction Signals

Capture user interactions with interface elements.

##### Web

| Property | Type | Description |
|----------|------|-------------|
| `eventType` | `'click' \| 'submit' \| 'change'` | The type of interaction event |
| `target` | `TargetedHTMLElement` | The HTML element that was interacted with |
| `submitter` | `TargetedHTMLElement` (optional) | For submit events, the element that triggered submission |
| `listener` | `'contenteditable' \| 'onchange' \| 'mutation'` | For change events, the listener type that detected the change |
| `change` | `JSONValue` | For change events, the specific change that occurred |

**Example:**
```json
{
  "eventType": "click",
  "target": {
    "id": "add-to-cart-btn",
    "attributes": {
      "data-product-id": "laptop-15",
      "class": "btn btn-primary"
    }
  }
}
```

##### Mobile

| Property | Type | Description |
|----------|------|-------------|
| `eventType` | `string` | The type of interaction event |
| `target.component` | `string` | The component that was interacted with |
| `target.title` | `string` | The title or label of the target component |
| `target.data` | `any` | Additional data associated with the target |

**Example:**
```json
{
  "eventType": "tap",
  "target": {
    "component": "ProductCard",
    "title": "Premium Headphones",
    "data": {
      "productId": "headphones-pro",
      "price": 299.99
    }
  }
}
```

#### Navigation Signals

Track navigation and screen changes.

##### Web

| Property | Type | Description |
|----------|------|-------------|
| `currentUrl` | `string` | The current URL after navigation |
| `previousUrl` | `string` (optional) | The previous URL before navigation |
| `hash` | `string` | The hash portion of the URL |
| `search` | `string` | The query string portion of the URL |
| `path` | `string` | The path portion of the URL |
| `changedProperties` | `('path' \| 'search' \| 'hash')[]` (optional) | Properties that changed during navigation |

**Example:**
```json
{
  "currentUrl": "https://shop.com/checkout",
  "previousUrl": "https://shop.com/cart",
  "path": "/checkout",
  "search": "",
  "hash": "",
  "changedProperties": ["path"]
}
```

##### Mobile

| Property | Type | Description |
|----------|------|-------------|
| `previousScreen` | `string` (optional) | The previous screen identifier |
| `currentScreen` | `string` | The current screen identifier |

**Example:**
```json
{
  "previousScreen": "ProductList",
  "currentScreen": "ProductDetail"
}
```

#### Network Signals

Monitor network requests and responses.

| Property | Type | Description |
|----------|------|-------------|
| `action` | `'request' \| 'response'` | Whether this is a request or response signal |
| `url` | `string` | The URL of the network request |
| `body` | `object` | The request/response body |
| `contentType` | `string` | The content type of the request/response |
| `method` | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH' \| 'HEAD' \| 'OPTIONS'` | HTTP method (request only) |
| `status` | `number` | HTTP status code (response only) |
| `ok` | `boolean` | Whether the response was successful (response only) |
| `requestId` | `string` | Unique identifier linking requests and responses |

**Example:**
```json
{
  "action": "request",
  "url": "https://api.shop.com/products",
  "method": "GET",
  "body": {},
  "contentType": "application/json",
  "requestId": "req-abc123"
}
```

#### Local Data Signals

Track local data storage operations.

| Property | Type | Description |
|----------|------|-------------|
| `action` | `'created' \| 'read' \| 'updated' \| 'deleted' \| 'undefined'` | The type of data operation performed |
| `identifier` | `string` | Unique identifier for the data being operated on |
| `data` | `string` | The data content or reference |

**Example:**
```json
{
  "action": "created",
  "identifier": "cart-item-laptop-001",
  "data": "{\"productId\":\"laptop-001\",\"quantity\":1,\"price\":1299.99}"
}
```

#### Instrumentation Signals

Capture analytics events and instrumentation data.

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'track' \| 'page' \| 'screen' \| 'identify' \| 'group' \| 'alias'` | The type of analytics event |
| `rawEvent` | `RawEvent` | The raw event data from Segment Analytics |

**Example:**
```json
{
  "type": "track",
  "rawEvent": {
    "event": "Product Viewed",
    "properties": {
      "productId": "laptop-001",
      "category": "Electronics",
      "price": 1299.99,
      "brand": "TechCorp"
    }
  }
}
```

#### User Defined Signals

Allow for custom signal types with arbitrary data.

| Property | Type | Description |
|----------|------|-------------|
| `[key: string]` | `any` | Custom properties defined by the application |

**Example:**
```json
{
  "customEventType": "product_recommendation",
  "recommendationEngine": "ml-v2",
  "products": ["laptop-001", "mouse-pro", "keyboard-mech"],
  "userId": "user-12345",
  "confidence": 0.85
}
```