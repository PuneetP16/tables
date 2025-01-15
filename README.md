# Simple Hierarchical Table

## Introduction

This application is a simple hierarchical table. It is built using ReactJS, Vite, and Tailwind CSS. The application displays a hierarchical table of financial data, allowing users to update values dynamically and see the changes reflected in real-time, along with calculated variances.

## Hosted Link

https://tables-zeta-henna.vercel.app/

## Features Implemented

- **Hierarchical Table:** Displays financial data with parent and child rows, supporting one level of hierarchy.
- **Dynamic Updates:** Calculates and updates subtotals and the grand total based on user input.
- **Input and Allocation:**
  - Each row has an input field for numeric values.
  - **Allocation % Button:** Increases the row's value by a specified percentage.
  - **Allocation Val Button:** Sets the row's value directly to the entered number.
- **Variance Display:** Calculates and displays the percentage variance from the original value after each update.
- **Subtotal Distribution:** Changes to parent row values are proportionally distributed among child rows (leaves).
- **State Management:** Utilizes React use state hook for efficient state management and updates.
- **Styling:** Implements a clean and user-friendly interface using Tailwind CSS.

## Installation and Setup

### Setup

Fetch the project by cloning the repository:

```bash
git clone https://github.com/PuneetP16/tables.git && cd tables
```

To install the required dependencies, run:

```bash
npm install
```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:3000/`.
