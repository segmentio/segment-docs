---
name: adroll
display_name: AdRoll
description: 'AdRoll is a retargeting network that allows you to show ads to visitors
  who''ve landed on your site while browsing the web. '
type: STREAMING
website: http://adroll.com
status: PUBLIC
logos:
- logo: https://d3hotuclm6if1r.cloudfront.net/logos/adroll-default.svg
- mark: https://cdn.filepicker.io/api/file/IKo2fU59RROBsNtj4lHs
categories:
- primary: Advertising
- secondary: ''
- additional: []
components:
- type: WEB
settings:
- name: _version
  display_name: _version
  type: NUMBER
  deprecated: false
  required: false
  number_validators:
    min: 0
    max: 0
  settings: []
- name: advId
  display_name: Advertiser ID
  type: STRING
  deprecated: false
  required: true
  string_validators:
    regexp: "^[A-Z0-9]{22}$"
  settings: []
- name: events
  display_name: Events
  type: MAP
  deprecated: false
  required: false
  settings: []
- name: pixId
  display_name: Pixel ID
  type: STRING
  deprecated: false
  required: true
  string_validators:
    regexp: "^[A-Z0-9]{22}$"
  settings: []
---