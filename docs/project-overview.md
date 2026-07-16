# RevealQR

## Project Overview

RevealQR is a web-based prototype that replaces traditional shipping labels containing customer information with a secure dynamic QR code.

Instead of printing sensitive information like customer name, phone number, and address on every package, only a QR code and an Order ID are printed.

The QR contains a secure token instead of personal data.

Whenever the QR is scanned, the backend determines what information should be displayed based on the current delivery stage and the role of the person scanning it.

After the package has been delivered, the QR no longer reveals any customer information.

---

## Problem Statement

Current shipping labels expose customer information to anyone handling the package.

This includes:

- Customer Name
- Phone Number
- Full Address

These details remain visible even after delivery.

This creates unnecessary privacy risks.

---

## Solution

RevealQR replaces printed customer information with a dynamic QR code.

The QR never stores personal information.

Instead, it stores only a unique secure token.

The backend uses this token to determine:

- Who is scanning
- Current delivery stage
- Information allowed to be viewed

Only the minimum required information is displayed.

---

## Objectives

- Protect customer privacy
- Replace printed shipping labels
- Reveal only necessary information
- Automatically revoke access after delivery
- Demonstrate a practical privacy solution for logistics companies

---

## User Roles

### Customer

- Manage profile
- Manage addresses
- View orders

### Company Employee

- Generate secure shipping labels
- Assign delivery partner

### Delivery Partner

- Scan QR
- Deliver package
- Mark delivery complete

### Admin

- Manage users
- View logs
- Monitor the system

---

## Workflow

Customer places an order.

↓

Company generates a shipping label.

↓

A secure QR code is printed.

↓

Warehouse and logistics staff scan the QR as the package moves.

↓

The backend reveals only the required information for that stage.

↓

The delivery partner receives the complete address only when the package is out for delivery.

↓

After successful delivery, the QR expires and customer information is no longer accessible.