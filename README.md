```markdown
# 🚀 MPC Product API

A robust RESTful API built with **Node.js, TypeScript, and Prisma ORM**, using **PostgreSQL** as the database. This service handles product management, image uploads, and category filtering, fully Dockerized for easy deployment on AWS.

🔗 **Live Base URL:** `http://3.124.216.226:3000`

---

## 🛠 Tech Stack & Setup

This project leverages **Node.js** for the runtime and **TypeScript** for type safety, with **Prisma ORM** managing the PostgreSQL database schema and migrations. The entire stack, including the database, is containerized using **Docker** to ensure consistent environments from development to production.

### **How to Run Locally**

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Docker Containers (DB + API):**
   ```bash
   docker compose up -d
   ```
   *The app will automatically migrate the schema and seed initial data.*

3. **Access the API:**
   The server will start at `http://localhost:3000`.

---

## 📖 API Documentation

### 1. Get All Products

Returns a list of all available products.

* **Endpoint:** `GET /products`
* **Query Params:** `?category={string}` (Optional filter)
* **Example Request:**
   ```bash
   curl "http://3.124.216.226:3000/products?category=Apparel"
   ```

### 2. Get Single Product

Fetch details for a specific product by ID.

* **Endpoint:** `GET /products/:id`
* **Example Request:**
   ```bash
   curl "http://3.124.216.226:3000/products/1"
   ```

### 3. Create Product

Add a new product to the catalog. Supports image file upload.

* **Endpoint:** `POST /products`
* **Content-Type:** `multipart/form-data`
* **Body Parameters:**
  * `name`: Text
  * `price`: Number
  * `category`: Text
  * `variants`: JSON Array (e.g. `["S", "M"]`)
  * `image`: File
* **Example (cURL):**
   ```bash
   curl -X POST http://3.124.216.226:3000/products \
     -F "name=Denim Jacket" \
     -F "price=49.99" \
     -F "category=Apparel" \
     -F "variants=[\"S\",\"M\"]" \
     -F "image=@/path/to/image.jpg"
   ```

---

## 🚢 Deployment Architecture

* **Backend:** Deployed on **AWS EC2** (Ubuntu) via Docker Compose.
* **Database:** PostgreSQL running in a Docker container with persistent volumes.
* **CI/CD:** Images are built and pushed to **Docker Hub** (`mego1890/mpc-products-api`) for easy pulling on the server.

---

## ✅ Final Submission Checklist

### **Frontend:**
* [x] Responsive Product Card (React + TS + Tailwind).
* [x] Connected to Backend API.
* [x] Deployed on Vercel/Netlify.
* [x] README with layout notes.

### **Backend:**
* [x] Node.js + TS + Prisma API.
* [x] PostgreSQL Database (Dockerized).
* [x] Deployed on AWS EC2 (`http://3.124.216.226:3000`).
* [x] API Documentation (This README).

### **Integration:**
* [x] Frontend fetches real data from AWS.
* [x] Category filtering works.
* [x] Add Product (Image Upload) works.

**You are ready to submit! Good luck!** 🚀
```
