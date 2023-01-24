---
title: Test Your Destination
---

## Local End-to-end Testing

To test a destination action locally, you can create a local HTTP server with the Actions CLI.

```sh
# For more information, add the --help flag
./bin/run serve
```
> success "Customize the port number"
> The default port is set to `3000`. To use a different port, you can specify the `PORT` environment variable (for example, `PORT=3001 ./bin/run serve`).

After you run the `serve` command, select the destination you want to test.

To test a specific destination action, you can send a Postman or cURL request with the following URL format: `https://localhost:<PORT>/<ACTION>`. The CLI provides a list of eligible URLs when the server is running.

### Example

The following is an example of a cURL command for the `search` action of the `google-analytics-4` destination. The `payload`, `settings`, `auth`, and `features` values are all optional in the request body. Local testing requires that you pass the action's required fields in the `payload` object.

```sh
curl --location --request POST 'http://localhost:3000/search' \
--header 'Content-Type: application/json' \
--data '{
    "payload": {
        "client_id": "<CLIENT_ID>",
        "search_term": "<SEARCH_TERM>"
    },
    "settings": {
        "measurementId": "<MEASUREMENT_ID>",
        "apiSecret": "<API_SECRET>"
    },
    "auth": {
        "accessToken": "<ACCESS_TOKEN>",
        "refreshToken": "<REFRESH_TOKEN>"
    }
}'
```

### Testing Batches

You can test Actions-based destinations that support batching (those that have a `performBatch` handler) locally. Test events for batch-supporting destinations should include `payload` as an array, and not an object. Here is an example of `webhook`'s `send` action, with a batch `payload`.

```sh
curl --location --request POST 'http://localhost:3000/send' \
--header 'Content-Type: application/json' \
--data '{
    "payload": [{
        "url": "https://www.example.com",
        "method": "PUT",
        "data": {
            "cool": true
        }
    }],
    "settings": {},
    "auth": {},
    "features": {}
}'
```
## Unit Testing

When you build a destination action, Segment recommends that write unit and end-to-end tests to ensure your action works as intended. Tests  run on every commit in GitHhub Actions. Pull requests that don't include relevant tests are not approved.

Unit tests behave more like integration tests in that you test not only the `perform` operation/unit, but also how events and mappings are transformed and validated.

Run tests for all cloud destinations with `yarn cloud test` or target a specific destination with the `--testPathPattern` flag:

```
yarn cloud test --testPathPattern=src/destinations/sendgrid
```

### Mocking HTTP Requests


While testing, want to avoid hitting external APIs. Segment uses `nock` to intercept any outbound requests before they hit the network.

### Examples

#### Test events and mapping

```js
import nock from 'nock'
import { createTestIntegration, StatsClient } from '@segment/actions-core'
import SendGrid from '../index'

const statsClient = {} as StatsClient
const tags = ['integration:actions-sendgrid']

const testDestination = createTestDestination(SendGrid)

const SENDGRID_API_KEY = 'some random secret'

describe('SendGrid', () => {
  describe('createList', () => {
    it('should validate action fields', async () => {
      try {
        await testDestination.testAction('createList', {
          settings: { apiKey: SENDGRID_API_KEY },
          skipDefaultMappings: true
        })
      } catch (err) {
        expect(err.message).toContain("missing the required field 'name'.")
      }
    })

    it('should work', async () => {
      nock('https://api.sendgrid.com/v3')
        .post('/marketing/lists', { name: 'Some Name' })
        .reply(200)

      await testDestination.testAction('createList', {
        mapping: { name: 'Some Name' },
        settings: { apiKey: SENDGRID_API_KEY },
        features: { my_feature: true },
        statsContext: { statsClient, tags }
      })
    })
  })
})
```

#### Testing authentication scheme with unit tests

```js
// ...

describe('SendGrid', () => {
  // ...

  describe('authentication', () => {
    it('should validate api keys', async () => {
      try {
        await testDestination.testAuthentication({ apiKey: 'secret' })
      } catch (err) {
        expect(err.message).toContain('API Key should be 32 characters')
      }
    })

    it('should test that authentication works', async () => {
      nock('https://api.sendgrid.com/v3')
        .get('/user/profile')
        .matchHeader('authorization', `Bearer some valid super secret api key`)
        .reply(200, {})

      await expect(testDestination.testAuthentication(settings)).resolves.not.toThrow()
    })
    it('should test that authentication fails', async () => {
      nock('https://api.sendgrid.com/v3')
        .get('/user/profile')
        .reply(403, {
          errors: [{ field: null, message: 'access forbidden' }]
        })

      try {
        await testDestination.testAuthentication({ apiKey: `nope this is an invalid key` })
      } catch (err) {
        expect(err.message).toContain('Credentials are invalid')
      }
    })
  })
})
```

## Snapshot Testing

Snapshot tests help developers understand how their changes affect the request body and the downstream tool. In `action-destinations`, they are automatically generated with both the `init` and `generate:action` CLI commands - the former creating destination-level snapshots and the latter creating action-level snapshots. These tests can be found in the `snapshot.test.ts` file under the `__tests__` folder.

The `snapshot.test.ts` file mocks an HTTP server using `nock`, and generates random test data (w/ `Chance`) based on the destination action's fields and corresponding data type. For each destination action, it creates two snapshot tests - one for all fields and another for just the required fields. To ensure deterministic tests, the `Chance` instance is instantiated with a fixed seed corresponding to the destination action name.

Once the actions under a new destination are complete, developers can run the following command to generate a snapshot file (`snapshot.test.ts.snap`) under `/__tests__/snapshots/`.

```
yarn jest --testPathPattern='./packages/destination-actions/src/destinations/<DESTINATION SLUG>' --updateSnapshot
```

## Code Coverage

Code coverage is automatically collected upon completion of `yarn test`. Results may be inspected by examining the HTML report found at `coverage/lcov-report/index.html`, or directly in your IDE if _lcov_ is supported.


## Actions Tester

To see a visual representation of the settings/mappings fields Segment provides a tool to preview and execute simulated actions mappings against your in development destination. 


### Getting started

For cloud action destinations, run one of the following commands, depending on the destination type, inside the directory where you have cloned the `actions-destinations` repository:

| Type    | Command                                                                                  |
| ------- | ---------------------------------------------------------------------------------------- |
| Cloud   | `./bin/run serve`                                                                        |
| Browser | `./bin/run serve --directory ./packages/browser-destinations/src/destinations --browser` |


You can either select the new action destination from the command line menu, or optionally pass it with an environment variable.

The command will return some text which includes a URL to the action tester UI. Click or copy/paste this text into a browser to get started. If you're not logged in to the Segment App, log in with your Segment credentials.

### Using Actions Tester

The Actions tester UI is split into 3 main areas:

#### The Segment 'Test Event'

Think of this as the 'incoming' data sent from the customer's 'source' through the Segment data plane, and eventually to your actions destination.

#### Settings / Mappings

The middle pane provides an area that allows you to preview a representation of the Segment UI for your destination's configuration. The layout, including the order may not be 100% representative of how Segment will render the destination's user interface. This serves as a useful playground for determining the ways in which mappings are configurable by the end user, and the impact your choices in the field definitions have on user experience.

The settings pane shows a representation of the 'global' settings available for your destination.

The mappings pane (which mappings are shown is determined by the dropdown above) shows a representation of the individual mappings (as well as any defaults you have specified) for a given action.

#### Mappings output

The final pane is a JSON representation of the test event data after it is mapped by your destination. This is updated in real time as you make changes to the test event or the mappings. This data is representative of the data that is your destination provides on the `payload` property of the perform method at execution time.

### Editing field definitions

While working on your destination's definitions in TypeScript, if you have action tester running locally, the tester UI updates with settings or mapping field changes without the need to restart the local server component. There is a slight delay to account for the local bundling process.

#### Test your action

The Actions tester enables a simulated test of the action environment. Click **Test** in the lower right corner to trigger the `perform` method of your action and pass it the `settings` and `payload` generated in the testing UI. This allows you to debug the perform method, as well as validate any responses from your API in the output panel.

The output panel behaves in two 'modes'. The first is `immediate` failures. If your API call could not be completed due to invalid url, credentials, etc, the pane will displays any debug information in the client.

When you make a successful API call, the Actions Tester shows both the request and response objects that the actions runtime uses internally to track your event. These are persisted across individual calls. If multiple calls appear and this is not desired behavior, reload the browser instance.