# Bank App Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
   - [Transfers](#transfers)
   - [Account Management](#account-management)
   - [View Accounts](#view-accounts)
   - [Currency Conversion](#currency-conversion)
   - [Balance Overview](#balance-overview)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Mocked Account IDs](#mocked-account-ids)
6. [Changelog](#changelog)
7. [License](#license)

## Introduction

This Bank App allows users to manage their bank accounts, make transfers between accounts, view balances, and handle multiple currencies with conversions. This document provides an extensive guide to using the app, including its features, installation instructions and usage.

## Features

### Transfers

- **Make Transfers**: Transfer funds between accounts in your list.
- **Validations**: Ensure all necessary validations are in place, such as sufficient balance and account existence.
- **Currency Conversion**: Transfer between different currencies with real-time conversion rates.

### Account Management

- **Create Accounts**: Create a personal account.
- **Add Accounts**: Add existing accounts from other owners to your account list.
- **Edit Accounts**: Edit details of existing accounts in owner's list.
- **Delete Accounts**: Remove accounts from owner's list.
- **Account Existence Check**: Can only add accounts if they exist in the bank (DB) and belong to another owner.

### View Accounts

- **List Accounts**: View a list of all your accounts and accounts on your list.
- **Account Details**: View detailed information of each account, including balance and currency.

### Currency Conversion

- **Real-Time Conversion**: Convert amounts between different currencies.

### Balance Overview

- **View Balances**: Check the balance of each account.
- **Total Balance**: View the total balance per currency.

### Other Features

- **Error Handling**: Comprehensive error handling for all operations.
- **Validation Rules**: Ensure all input fields meet the required validation criteria.

## Installation

  To set up the Bank App, follow these steps:

  - **Clone the repository**: 
      ```
      git clone https://github.com/emg1990/bank-app.git
      ```

  - **Navigate to the project directory**:
      ```
      cd bank-app
      ```

  - **Install dependencies**:
      ```
      npm install
      ```

  - **Start the development api**:
      ```
      npm run start-api
      ```

  - **Start the development app**:
      ```
      npm run start
      ```

  - **Open your browser**:
      - After starting the server, open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the Bank App.

## Usage

  Once the Bank App is installed and running, follow these steps to use it:

  - **Navigate to the Bank App URL**: 
      - Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the Bank App.

  - **View Your Accounts**:
      - Upon accessing the web page, you'll be able to view your list of accounts, on the top you'll find the ownr's accounts and on the bottom you'll find the accounts saved by the owner.
      - You can also search the accounts using the search button on the account's list header

  - **Perform Transactions**:
      - Transfer funds between your accounts and to other accounts.
        - On the bottom right you'll find the New Transfer button which will open a modal to create a new transaction.

  - **Manage Your Accounts**:
      - Create new personal accounts.
        - On the bottom right you'll find the New Account button which will open a modal to create a new account.
      - Add accounts to your list, the account must exist on the DB (view [Mocked Account IDs](#mocked-account-ids) for examples).
        - On the far right of the Accounts header you'll find a button which will open the Add modal.
      - Edit existing accounts.
        - On the right of each account from the list you'll find a notepad icon which will open the Edit modal.
      - Delete accounts as needed.
        - On the right of each account from the list you'll find a red trash icon which will pop a confirmation modal.

  - **View Account Balances**:
      - Check the balances of your accounts.
      - View total balance per currency.

  Enjoy using the Bank App for managing your finances seamlessly!

### Mocked Account IDs
- **List of Mocked Account IDs** Add one of the following accounts:
    - DE89370400440532013000
    - FR7630006000011234567890189
    - FR1420041010050500013M02606
    - ES9121000418450200051332
    - ES4321000418401234567891
    - IT40X0542811101000000123457
    - NL91ABNA0417164300
    - NL27SNSB0917829871
    - BE68539007547034
    - BE62510007547061
    - DK5000400440116243
    - DK9550400123456238
    - FI2112345600000785
    - FI1410093000123458
    - NO9386011117947
    - NO9386011117948

## Changelog

### v1.0.0
Initial release with transfer, account management, view accounts, and balance features.

## License

The Bank App is licensed under the [MIT License](LICENSE).
