---
title: Youbora Source
beta: true
hidden: true
id: 117eYCe9jH
---
{% include content/source-region-unsupported.md %}

YOUBORA is the most advanced and holistic suite of integrated video analytics and business intelligence for broadcasters, OTTs, telcos and media companies to help you make data-driven, business, operational and technical decisions to drive performance and maximize revenue across your entire video service. The latest version of YOUBORA has been thought through from the ground up to deliver the most detailed intelligence for your service.

This source is maintained by YOUBORA. For any issues with the source, [contact the YOUBORA Support team](https://nicepeopleatwork.com/contactus).

{% include content/beta-note.md %}


Adding YOUBORA as a Source to Segment will allow you to use YOUBORA data with other Segment collected data.

These events can be passed to your Segment Destinations such as data warehouses and analytics tools. Joined with data from other marketing programs, you can start telling a unified story of each customer's journey and tailor your reporting to the KPIs that matter most.

## Getting Started

1. From your Sources page in Segment, click Add Source.
2. Choose YOUBORA.
3. Click Connect.
4. Give the Source a nickname. The nickname is a label used in the Segment interface.
5. Copy the Segment `write_key` for YOUBORA from the Overview page.
6. contact your YOUBORA representative to enable the event-source with the `write_key` provided.
7. Click Save.
8. From your Segment account, click into your YOUBORA Source and you will be able to add other downstream Destinations where you want to see the YOUBORA auto-tracked events.

You're all set! YOUBORA auto-tracked events will now be sent to Segment and any other destinations that you've enabled.

## Components

### Stream

YOUBORA uses our stream Source component to send events to Segment. These events are then available in any destination that accepts server-side events, including your data warehouse.

## Events

For now, YOUBORA is sending all the auto-tracked events as `Youbora Event`

## YOUBORA Event Properties

Below is a table outlining the properties included in the event listed above.

<table class="table table-bordered table-hover table-condensed">
<thead><tr><th title="Field #1">Property</th>
<th title="Field #2">Description</th>
<th title="Field #3">Magnitude</th>
</tr></thead>
<tbody><tr>
<td>ad_campaign</td>
<td>Ad Campaign name</td>
<td>-</td>
</tr>
<tr>
<td>ad_duration</td>
<td>Ad media duration in seconds (duration of ad content)</td>
<td>-</td>
</tr>
<tr>
<td>ad_init</td>
<td>Init time for current ad</td>
<td>Milliseconds</td>
</tr>
<tr>
<td>ad_number</td>
<td>Ad number for current position: From 1 to N</td>
<td>1...N</td>
</tr>
<tr>
<td>ad_play_time</td>
<td>Ad play head for current event (playtime)</td>
<td>-</td>
</tr>
<tr>
<td>ad_position</td>
<td>Ad position (Pre / Mid / Post)</td>
<td>-</td>
</tr>
<tr>
<td>ad_resource</td>
<td>Ad url resource</td>
<td>-</td>
</tr>
<tr>
<td>ad_status</td>
<td>Ad status: Skipped / Finished</td>
<td>-</td>
</tr>
<tr>
<td>ad_title</td>
<td>Ad title name</td>
<td>-</td>
</tr>
<tr>
<td>ads_time</td>
<td>Ads time in milliseconds</td>
<td>Milliseconds</td>
</tr>
<tr>
<td>anonymous_user</td>
<td>Anonymous user token</td>
<td> </td>
</tr>
<tr>
<td>asn</td>
<td>Detedted asn number</td>
<td>-</td>
</tr>
<tr>
<td>avg_bitrate</td>
<td>Avg bitrate in the view (bps)</td>
<td>bps</td>
</tr>
<tr>
<td>avg_bitrate_count</td>
<td>Number of ping received with bitrate</td>
<td>Number</td>
</tr>
<tr>
<td>avg_fps</td>
<td>Avg fps</td>
<td>fps</td>
</tr>
<tr>
<td>avg_fps_count</td>
<td>Number of pings with fps informed</td>
<td>Number</td>
</tr>
<tr>
<td>avg_latency</td>
<td>Avg latency (in milliseconds)</td>
<td>Milliseconds</td>
</tr>
<tr>
<td>avg_latency_count</td>
<td>Number of pings with latency informed</td>
<td> </td>
</tr>
<tr>
<td>browser_name</td>
<td>Browser name</td>
<td> </td>
</tr>
<tr>
<td>browser_ver</td>
<td>Browser version</td>
<td>-</td>
</tr>
<tr>
<td>buffer_ratio</td>
<td>Buffer ratio (buffer time / viewtime)</td>
<td>Double</td>
</tr>
<tr>
<td>cdn</td>
<td>Cdn name</td>
<td> </td>
</tr>
<tr>
<td>city</td>
<td>Detected city from user</td>
<td>-</td>
</tr>
<tr>
<td>connection_type</td>
<td>Detected connection type from user</td>
<td>-</td>
</tr>
<tr>
<td>country_code</td>
<td>Detected country (ISO Code 2) from user</td>
<td>Country code ISO-2</td>
</tr>
<tr>
<td>device_model</td>
<td>Device-model</td>
<td>-</td>
</tr>
<tr>
<td>device_name</td>
<td>Device name</td>
<td> </td>
</tr>
<tr>
<td>device_type</td>
<td>Device type (table, pc)</td>
<td>-</td>
</tr>
<tr>
<td>device_vendor</td>
<td>Device vendor (sony, apple)</td>
<td>-</td>
</tr>
<tr>
<td>domain</td>
<td>Domain from which events have been received</td>
<td>-</td>
</tr>
<tr>
<td>duration</td>
<td>Media duration in seconds</td>
<td>seconds</td>
</tr>
<tr>
<td>effective_time</td>
<td>Effective time in milliseconds (viewtime minus ads, buffer, jointime, seeks, etc)</td>
<td>Milliseconds</td>
</tr>
<tr>
<td>error_metadata</td>
<td>Error metadata</td>
<td>-</td>
</tr>
<tr>
<td>error_player_code</td>
<td>Error Code reported by plugin</td>
<td>-</td>
</tr>
<tr>
<td>error_player_desc</td>
<td>Error Player reporder by plugin</td>
<td>-</td>
</tr>
<tr>
<td>error_severity</td>
<td>Error severity</td>
<td>-</td>
</tr>
<tr>
<td>error_type</td>
<td>Error type</td>
<td>-</td>
</tr>
<tr>
<td>event_time</td>
<td>Event time represented in unixtime (UTC). Get as &quot;timestamp&quot; on NiceDruidLib</td>
<td>Milliseconds</td>
</tr>
<tr>
<td>event_type</td>
<td>Event Name: PLAY, STOP, BUFFER, etc...</td>
<td>-</td>
</tr>
<tr>
<td>event_value</td>
<td>Event value for the current event, for error for example, is the error code</td>
<td>Depends of the event</td>
</tr>
<tr>
<td>exit_ad_status</td>
<td>Exit Ad Status value: &quot;ExitOnAds&quot; for example</td>
<td>-</td>
</tr>
<tr>
<td>exit_status</td>
<td>Exit status: Stopped or Expired</td>
<td>-</td>
</tr>
<tr>
<td>exit_type_crash</td>
<td>Exit type crash</td>
<td>-</td>
</tr>
<tr>
<td>extraparam1</td>
<td>Extraparam 1 provided by plugin / customer</td>
<td>-</td>
</tr>
<tr>
<td>extraparam10</td>
<td>Extraparam 10 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam11</td>
<td>Extraparam 11 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam12</td>
<td>Extraparam 12 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam13</td>
<td>Extraparam 13 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam14</td>
<td>Extraparam 14 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam15</td>
<td>Extraparam 15 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam16</td>
<td>Extraparam 16 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam17</td>
<td>Extraparam 17 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam18</td>
<td>Extraparam 18 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam19</td>
<td>Extraparam 19 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam2</td>
<td>Extraparam 2 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam20</td>
<td>Extraparam 20 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam21</td>
<td>Extraparam 21 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam3</td>
<td>Extraparam 3 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam4</td>
<td>Extraparam 4 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam5</td>
<td>Extraparam 5 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam6</td>
<td>Extraparam 6 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam7</td>
<td>Extraparam 7 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam8</td>
<td>Extraparam 8 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>extraparam9</td>
<td>Extraparam 9 provided by plugin / customer</td>
<td> </td>
</tr>
<tr>
<td>happiness_score</td>
<td>Happiness score double value (from 0 to 1)</td>
<td>Double</td>
</tr>
<tr>
<td>happiness_score_label</td>
<td>Happiness tag</td>
<td>-</td>
</tr>
<tr>
<td>ip</td>
<td>Detected IP from user</td>
<td>-</td>
</tr>
<tr>
<td>isp</td>
<td>Detected isp from user</td>
<td>-</td>
</tr>
<tr>
<td>lat</td>
<td>Latitude</td>
<td>double</td>
</tr>
<tr>
<td>lon</td>
<td>Longitude</td>
<td>double</td>
</tr>
<tr>
<td>media_resource</td>
<td>Media url resource</td>
<td>-</td>
</tr>
<tr>
<td>metadata</td>
<td>Json object with media info</td>
<td>-</td>
</tr>
<tr>
<td>node_host</td>
<td>Node Host (CDN info)</td>
<td>-</td>
</tr>
<tr>
<td>node_type</td>
<td>Node Type (CDN info)</td>
<td>-</td>
</tr>
<tr>
<td>offline_view</td>
<td>String that represents if is offline view</td>
<td>-</td>
</tr>
<tr>
<td>os</td>
<td>OS name</td>
<td>-</td>
</tr>
<tr>
<td>os_version</td>
<td>OS version</td>
<td>-</td>
</tr>
<tr>
<td>out_bytes</td>
<td>Traffic consumed on the view (represented on bytes)</td>
<td>Bytes</td>
</tr>
<tr>
<td>play_time</td>
<td>PlayHead of content on current event in seconds</td>
<td>Seconds</td>
</tr>
<tr>
<td>player</td>
<td>Player name</td>
<td>-</td>
</tr>
<tr>
<td>player_version</td>
<td>Player version</td>
<td>-</td>
</tr>
<tr>
<td>plugin_metadata</td>
<td>Plugin metadata (advanced details about plugin)</td>
<td>-</td>
</tr>
<tr>
<td>plugin_version</td>
<td>Plugin version</td>
<td>-</td>
</tr>
<tr>
<td>postal_code</td>
<td>Detected postal code from user</td>
<td>-</td>
</tr>
<tr>
<td>region</td>
<td>Region</td>
<td> </td>
</tr>
<tr>
<td>rendition</td>
<td>First rendition at start</td>
<td>-</td>
</tr>
<tr>
<td>state_province</td>
<td>State or Province detected from user</td>
<td>-</td>
</tr>
<tr>
<td>streaming_protocol</td>
<td>Streaming protocol</td>
<td> </td>
</tr>
<tr>
<td>streaming_type</td>
<td>Streaming Type (is P2P or not)</td>
<td>-</td>
</tr>
<tr>
<td>system_id</td>
<td>System ID (integer value), for example Antena 3 TV is &quot;65&quot;</td>
<td>-</td>
</tr>
<tr>
<td>throughput</td>
<td>Avg throughput in the view (bps)</td>
<td>bps</td>
</tr>
<tr>
<td>throughput_count</td>
<td>Number of ping received with throughput</td>
<td>Number</td>
</tr>
<tr>
<td>title</td>
<td>View title</td>
<td>-</td>
</tr>
<tr>
<td>title2</td>
<td>View channel title (or secundary title)</td>
<td>-</td>
</tr>
<tr>
<td>token</td>
<td>View unique identifier</td>
<td>-</td>
</tr>
<tr>
<td>transaction_code</td>
<td>Transaction code</td>
<td>-</td>
</tr>
<tr>
<td>type_view</td>
<td>LIVE / VOD</td>
<td>-</td>
</tr>
<tr>
<td>user_agent</td>
<td>User Agent detected by the data collector</td>
<td>-</td>
</tr>
<tr>
<td>user_id</td>
<td>User identifier</td>
<td>-</td>
</tr>
<tr>
<td>user_type</td>
<td>User type</td>
<td> </td>
</tr>
<tr>
<td>viewtime</td>
<td>Viewtime in milliseconds (from start to stop)</td>
<td>Milliseconds</td>
</tr>
</tbody></table>

## Adding Destinations

Now that your Source is set up, you can connect it with destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the YOUBORA team](https://nicepeopleatwork.com/contactus).

## User Identification

YOUBORA will only send in events that have a value for a `userId`. You must send in the same value for `userId` to YOUBORA as you are sending into Segment.
