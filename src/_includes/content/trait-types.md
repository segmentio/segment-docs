## Comparing trait types

View the table below to better understand how Segment collects custom, computed, and SQL traits.

You can use the Profile explorer (**Unify > Profile explorer**) to view traits attached to a profile.

| **Trait type**     |  **Description**          |
|---------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Custom traits](/docs/unify/traits/custom-traits/)       | Traits created from source events you pass into Segment. From your sources, send custom traits as pieces of information that you know about a user in an Identify call. |
| [Computed traits](/docs/unify/traits/computed-traits/)     | Traits collected from computations off of event and event property data from your sources. Create user or account-level calculations like `most_viewed_page` or `total_num_orders` for a customer. Learn more by viewing [types of computed traits](/docs/unify/traits/computed-traits/#types-of-computed-traits).    |
| [SQL traits](/docs/unify/traits/sql-traits/)          | Traits created by running SQL queries on data in your warehouse. SQL traits are a type of computed trait. SQL traits help you import traits from your data warehouse back into Segment to build audiences or enhance data that you send to other destinations. |

<!--
| [Predictive traits](/docs/unify/traits/predictions/using-predictions/)  |  Segment creates Predictions as Computed Traits, with scores saved to user profiles as a percentage cohort. | -->