## Row Creation in WeekTable.tsx

The row creation process in `WeekTable.tsx` is a key part of rendering the weekly table, where each row represents a child and their meal payment status for the week. Here's a detailed breakdown of the process:

1. **User Mapping**: The `users` array is created by mapping over the `data` prop, which contains user information. Each user is converted from JSON format to a `User` object using `User.fromJSON`.

2. **Row Construction**: For each user, a `WeekRow` is constructed. This involves several steps:
   - **Filled Days**: The `filledDays` array is created by mapping over the `DAYS` constant. For each day, the `getWeekDay` utility function is used to retrieve the payment data for that day. If no data exists, a default object is created using `INIT_DAY_DATA`.
   - **Totals Calculation**: The `fillTotals` function is called to update the `totals` array with the sum of payments for each day.
   - **Start Data**: An object `startData` is created, containing the initial columns for the row, such as delete button, edit button, order number, name, and balance information. Components like `WeekTableDeleteCell` and `EditUser` are inserted here.
   - **Days Data**: The `days` array is created by mapping over `filledDays`, generating a `WeekTableCell` for each day. This component allows users to toggle meal selections (breakfast and lunch).
   - **End Data**: An object `endData` is created, containing the final columns for the row, such as the total spent and remaining balance.

3. **Row Assembly**: The final row is assembled by concatenating the values from `startData`, `days`, and `endData` into a single array, which represents a complete row in the table.

4. **Totals Update**: After all rows are generated, the `totals` array is updated with the total spent and remaining balance for all users.

This process ensures that each row accurately reflects the user's payment status and allows for interactive elements like toggling meal payments and editing user details. The use of components like `WeekTableCell` and `WeekTableDeleteCell` within the row provides a modular and maintainable structure.
