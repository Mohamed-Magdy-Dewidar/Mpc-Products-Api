# Product API Service

A production-ready REST API for managing products, featuring local file storage, database seeding, and automated documentation.

## 🛠 Tech Stack
* **Runtime:** Node.js v20+
* **Language:** TypeScript (Strict)
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Validation:** Zod (with coercion)
* **Docs:** Swagger UI / OpenAPI

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have Node.js and Docker (for PostgreSQL) installed.

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb?schema=public"
BASE_URL="http://localhost:3000"