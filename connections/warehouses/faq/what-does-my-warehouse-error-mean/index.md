---
title: "What does my warehouse error mean?"
---

### ERROR: Schema "XXX" does not exist. (SQLSTATE 3F000)

This is a permissioning issue. To learn how to set up proper permissions, you can check out our [postgres](/docs/warehouses/postgres/#permissioning-segment-to-rds) and [redshift](/docs/warehouses/redshift/#permissioning-segment-to-redshift)permissioning guides.

### ERROR: Cannot execute query because system is in resize mode (SQLSTATE 57014)

This error occurs when your cluster is currently resizing. The warehouse will continue on its scheduled run interval - once the resize is complete, we’ll load all data from the failed run.

### ERROR: 1040 (SQLSTATE XX000)

This is a Redshift 500 - an internal server error. This is usually caused by having too many tables or too many columns. If you’re seeing this error, [please visit our contact form to submit a request](/contact/support).

### read tcp XXX.XX.XX.XXXX:XXXX-XXX.XX.XX.XXXX:XXXX: read: connection timed out

This is a networking error that typically arises when Redshift doesn't close properly close the connection or gets rebooted.

If you see this error on consecutive syncs, [contact us](/contact).

### pq: role "XXX" is not permitted to log in

This is a permissioning issue. To learn how to set up proper permissions, you can check out our [postgres](/docs/warehouses/postgres/#permissioning-segment-to-rds) and [redshift](/docs/warehouses/redshift/#permissioning-segment-to-redshift)permissioning guides.

### pq: password authentication failed for user "XXX";

This is a credential issue. To fix your credentials, head over to Warehouse > Settings > Connection.

### dial tcp: lookup XXX-hostname on 10.50.0.2:53: no such host

This is a credential issue. To fix your credentials, head over to Warehouse > Settings > Connection.

### dial tcp XX.XXX.XXX.XXX:XXXX: getsockopt: connection timed out / refused

This is a networking error. The connection times out because Redshift doesn't close properly or gets rebooted.

If you see this error on consecutive syncs, [contact us](https://segment.com/help/contact/).

### ERROR: syntax error at or near "ENCODE"; (SQLSTATE 42601)

This occurs when a Postgres database is incorrectly connected as Redshift. To resolve this, delete the warehouse and reconnect, using the Postgres setup option.

### Error during deduping step for collectionXXX: EOF

This error is generally a network error when Redshift closes the connection. If the problem persists on multiple runs, [contact us](https://segment.com/help/contact/).

### ERROR: permission denied for relation update (SQLSTATE 42501)

This is a permissioning issue. To learn how to set up proper permissions, you can check out our [postgres](/docs/warehouses/postgres/#permissioning-segment-to-rds) and [redshift](/docs/warehouses/redshift/#permissioning-segment-to-redshift)permissioning guides.

### EOF

This error is generally a network error when Redshift closes the connection. If the problem persists on multiple runs, [contact us](/contact).
