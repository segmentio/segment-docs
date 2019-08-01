---
name: appsflyer
display_name: AppsFlyer
description: Mobile app measurement and tracking.
type: STREAMING
website: http://www.appsflyer.com/
status: PUBLIC
logos:
- logo: https://d3hotuclm6if1r.cloudfront.net/logos/appsflyer-default.svg
- mark: https://cdn.filepicker.io/api/file/AnJUEBvxRouLLOvIeQuK
categories:
- primary: Attribution
- secondary: ''
- additional: []
components:
- type: IOS
- type: ANDROID
- type: CLOUD
settings:
- name: androidAppID
  display_name: Android App ID
  type: STRING
  deprecated: false
  required: false
  string_validators:
    regexp: ''
  settings: []
- name: appleAppID
  display_name: Apple App ID (iOS)
  type: STRING
  deprecated: false
  required: false
  string_validators:
    regexp: "^[0-9]*$"
  settings: []
- name: appsFlyerDevKey
  display_name: AppsFlyer Dev Key
  type: STRING
  deprecated: false
  required: true
  string_validators:
    regexp: "^[a-zA-Z0-9]{10,30}$"
  settings: []
- name: httpFallback
  display_name: Enable HTTP fallback (Android)
  type: BOOLEAN
  deprecated: false
  required: false
  settings: []
- name: rokuAppID
  display_name: Roku App ID
  type: STRING
  deprecated: false
  required: false
  string_validators:
    regexp: ''
  settings: []
- name: trackAttributionData
  display_name: Track Attribution Data
  type: BOOLEAN
  deprecated: false
  required: false
  settings: []
---