# LokJonHarayGese 
THIS IS GENMERATED BY CHATGPT.
A decentralized application (DApp) smart contract for managing missing persons reports, investigator assignments, and paid appointment scheduling. Built with Solidity for CSE446 – Blockchain & Cryptocurrency Lab.

---

## Overview

This smart contract implements a role-based management system to handle missing persons cases on the Ethereum blockchain. It allows civilians to report missing persons, admins to assign investigators (FEDRA), and includes paid appointment scheduling for urgent cases. The contract focuses on data integrity, role-based access control, and secure payment handling.

---

## Core Features

### 1. User Registration
- Roles: `ADMIN`, `CIVILIAN`, `FEDRA`
- Admin is bootstrapped during deployment.
- Users register with name, NID, and role.

### 2. Report Missing Person
- CIVILIAN users can report missing persons with necessary details.
- Urgency is auto-calculated based on age:
  - **High urgency**: age < 18
  - **Medium urgency**: age > 50
  - **Low urgency**: others

### 3. Update Status (Admin Only)
- ADMIN can update a missing person’s status to `PawaGese` (Found).
- Status change is irreversible once set to found.

### 4. Assign Investigator
- ADMIN can assign a FEDRA to a specific case.
- FEDRA cannot be assigned to the same case twice.
- Each FEDRA can manage multiple cases.

### 5. Book Appointment (Paid Feature)
- CIVILIAN can pay a small ETH fee to book a 10-minute investigation slot with a FEDRA.
- Time slot uniqueness is enforced per FEDRA.
- Payment is transferred securely to the ADMIN wallet.

### 6. View FEDRA Schedule
- Public function to retrieve all appointments booked for a specific FEDRA.

---

## Technical Design

- Smart contract written in Solidity `^0.8.0`.
- Access control implemented using `enum` roles and Solidity modifiers.
- Structs used to store users, case data, and appointment details.
- Events emitted for all critical state changes.
- Mapping structures handle user records, cases, division stats, appointments, and slot tracking.

---

## Deployment Notes

- Requires an Ethereum-compatible environment (e.g., Remix IDE or Truffle).
- Contract owner (deployer) is automatically assigned as ADMIN.
- Appointment fee is set to `0.01 ETH` per booking.

---

## Security Considerations

- All state-changing functions are protected with appropriate access modifiers.
- ETH payments are verified and transferred using `payable` and `require` checks.
- Time slot collisions are prevented using dual-key mappings.

---

## Known Limitations

- Division filtering and sorting not yet implemented (for Part 1 scope).
- Frontend integration not included in this version.
