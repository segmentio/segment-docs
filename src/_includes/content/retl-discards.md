<table>
  <thead>
      <tr>
      <th>Discard reason</th>
      <th>Error code</th>
      <th>What happened?</th>
      <th>Remedy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Duplicate record detected</td>
      <td><samp>ErrRecordDuplicate</samp></td>
      <td>Duplicate records have been found for the Unique Identifier configured</td>
      <td>Change the Unique Identifier column that has unique values per record or construct a query that returns distinct records for the Unique Identifier configured.</td>
    </tr>
    <tr>
      <td>Record with NULL unique ID detected</td>
      <td><samp>ErrRecordNullUniqueID</samp></td>
      <td>While extracting the records, the Unique Identifier column was found to have a null value.</td>
      <td>Make sure to select a Not null column to use as the unique identifier or construct a query that returns not null values for the Unique Identifier configured.</td>
    </tr>
    <tr>
      <td>Value for IdentifierColumn is required</td>
      <td><samp>ErrRecordMissingID</samp></td>
      <td>Tried saving the model without the Unique Identifier column; this is a required field</td>
      <td>Select a column to use as the unique identifier for each row and input the column name in the UI</td>
    </tr>
    <tr>
      <td>Value for IdentifierColumn must be text</td>
      <td><samp>ErrRecordInvalidID</samp></td>
      <td>The value returned for the Unique Identifier is other than text</td>
      <td>Construct a SQL query to cast the Identifier column to values in text and select the casted column as the Unique Identifier column. If possible, select an Identifier column that is of text data type</td>
    </tr>
    <tr>
      <td>Workspace reached the Reverse ETL usage limit</td>
      <td><samp>ErrSegmentNoEntitlement</samp></td>
      <td>Indicates that the workspace had reached the limit of their workspace billing plan</td>
      <td>To increase your usage limit, upgrade your workspace plan. <br> For more information, see the <a href="/docs/connections/reverse-etl/#usage-limits">Reverse ETL Usage Limits documentation</td>
    </tr>
  </tbody>
</table>