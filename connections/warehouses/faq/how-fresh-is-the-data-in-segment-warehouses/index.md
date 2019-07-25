---
title: "How fresh is the data in Segment Warehouses?"
---

Your data will be available in Warehouses within 24-48 hours. The underlying Redshift datastore has a subtle tradeoff between data freshness, robustness, and query speed. For the best experience we need to balance all three of these.

Real-time loading of the data into Segment Warehouses would cause significant performance degradation at query time because of the way Redshift uses large batches to optimize and compress columns. To optimize for your query speed, reliability, and robustness, our guarantee is that your data will be available in Redshift within 24 hours.

As we improve and update our ETL processes and optimize for SQL query performance downstream, the actual load time will vary, but we’ll ensure it’s always within 24 hours.
