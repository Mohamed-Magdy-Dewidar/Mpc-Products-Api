
## 📡 API Documentation

### 1. Get All Products

Returns a list of all products. Image URLs are fully qualified.

* **URL:** `GET /products`
* **Query Params:** `category` (optional)

**cURL Request:**

```bash
curl "http://localhost:3000/products"

```

**cURL Request (Filter by Category):**

```bash
curl "http://localhost:3000/products?category=Apparel"

```

---

### 2. Get Product by ID

Returns a single product details.

* **URL:** `GET /products/:id`

**cURL Request:**

```bash
# Replace :id with a real UUID from the list above
curl "http://localhost:3000/products/c13dcbc4-cf94-4a96-89d6-d941cb7bde83"

```

---

### 3. Create Product

Creates a new product and uploads an image.

* **URL:** `POST /products`
* **Content-Type:** `multipart/form-data`

**Body Fields:**

* `name` (Text)
* `price` (Text/Number)
* `category` (Text)
* `image` (File) - **Required**
* `variants` (Text/JSON) - Optional, e.g. `["S", "M"]`

**cURL Request:**

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: multipart/form-data" \
  -F "name=Premium Denim Jacket" \
  -F "price=89.99" \
  -F "category=Apparel" \
  -F "variants=[\"S\", \"M\", \"L\"]" \
  -F "image=@/path/to/your/image.jpg"

```

*(Note: If testing via Postman, select Body -> form-data, and set key `image` to type 'File')*

---

### 4. Health Check

* **URL:** `GET /health`

**cURL Request:**

```bash
curl "http://localhost:3000/health"

```

```

---



```markdown
## 💡 Design Decisions
* **Local Storage:** For this assignment, images are stored locally in `public/images` to avoid external cloud dependencies (AWS S3) and keep the project self-contained.
* **Prisma Seeding:** The seed script automatically downloads real placeholder images from Unsplash to ensure the local filesystem stays in sync with the database state.
* **Validation:** Zod is used for request validation to ensure type safety extends from the API layer down to the service layer.

```