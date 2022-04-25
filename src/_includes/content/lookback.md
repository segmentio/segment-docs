You can set a “lookback window” for both computed traits and audiences, which limits the period of time in which data is considered when calculating the trait or audience. For example, you might set a lookback window of 7 days on an audience or trait like `new_users_7_days`, but you would not add a lookback window to a trait that isn't time-bounded, for example `lifetime_value` .

When you specify a lookback window, Personas updates the audience or trait hourly. If you do not specify a lookback window, Personas continuously updates both computed traits and audiences in real time.
