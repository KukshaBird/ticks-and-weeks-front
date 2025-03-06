# Week Management Module Documentation

## Overview

The Week Management Module is designed to facilitate the management of school children's meal payments over a single week. It provides a user-friendly interface for parents or guardians to track and manage payments for meals, specifically breakfast and lunch. The module allows for the addition, editing, and deletion of children, as well as the management of meal prices and payment statuses.

## Key Features

- **Weekly Table View**: Displays a table representing a single week, where each row corresponds to a child and each column represents a day of the week.
- **Meal Payment Tracking**: Allows users to check or uncheck payments for breakfast and lunch for each child.
- **Child Management**: Users can add new children, edit existing children's details, and delete children from the table.
- **Financial Management**: Users can set the starting balance for each child, record additional funds added during the week, and view the remaining balance at the end of the week.
- **Data Purge**: Provides functionality to reset all data, clearing the table for a new week.
- **Summary and Totals**: Generates summaries and totals for the week, providing insights into payments and balances.

## Components

1. **`Week.tsx`**: The main component that integrates all functionalities. It fetches and manages user and dish data, and renders the `WeekTable`, `WeekTitle`, and other components.

2. **`WeekTable.tsx`**: Renders the main table structure, including headers, body, and totals. It handles user interactions like toggling meal selections and deleting users.

3. **`WeekTableCell.tsx`**: Represents individual cells in the week table, allowing users to toggle meal selections (breakfast and lunch).

4. **`WeekTableDeleteCell.tsx`**: Provides a cell with a delete button to remove children from the table.

5. **`WeekTableHead.tsx`**: Renders the table header with column names.

6. **`WeekTableRow.tsx`**: Renders a single row in the week table, consisting of various cells.

7. **`WeekTitle.tsx`**: Displays the title of the week and provides functionality to download the table as an HTML file. It also shows a modal with totals for each day.

8. **`WeekTotals.tsx`**: Renders the totals row at the bottom of the week table, summarizing the data.

9. **`ResetTable.tsx`**: A component that provides a button to reset or purge all week data. It uses a modal to confirm the action and dispatches a Redux action to update the state.

10. **Utility Files**:
    - **`constants.ts`**: Defines constants used across the components, such as the days of the week and column headers for a table.
    - **`types.ts`**: Contains TypeScript type definitions used in the week components.
    - **`util.ts` & `utils.ts`**: Provide utility functions for handling day data and calculating totals.

## Future Extensions

The module is currently designed for a specific use case but can be extended in the future to support more generic and flexible scenarios. Potential extensions include multi-week management, additional meal types, and more complex financial tracking.
