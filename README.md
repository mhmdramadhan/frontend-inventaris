
# 📦 Product Dashboard — React

## Fitur Utama

### 🔐 Autentikasi
- Login menggunakan username & password.
- Token disimpan di localStorage.
- Halaman tertentu hanya bisa diakses jika sudah login.
- Jika belum login → redirect otomatis ke /login.

### 📦 Produk
- Menampilkan daftar produk.
- Tambah produk (login required).
- Edit produk (login required).
- Refresh data produk.
- Modal form tambah/edit.
- Validasi error & state loading.

---

## 📁 Struktur Folder

```
src/
│
├── api/
│   └── api.ts
│
├── components/
│   ├── ProductList.tsx
│   └── ProductForm.tsx
│   └── LoginForm.tsx
│   └── Navbar.tsx
│
├── pages/
│   ├── Login.tsx
│   └── Dashboard.tsx
│
├── types/
│   └── index.ts
│
└── App.tsx
```

---

## 🔧 Instalasi

### 1. Clone repository
```bash
git clone <url-repo>
cd frontend-inventaris
```

### 2. Install dependencies
```bash
npm install
```

### 3. Jalankan project
```bash
npm run dev
```

Aplikasi berjalan di:
```
http://localhost:5173
```

Backend berjalan di:
```
http://localhost:8000
```

---

## 🔐 Login

Endpoint:
```
POST /login
```

Response:
```json
{
  "token": "your-jwt-token"
}
```

Simpan token:
```js
localStorage.setItem("token", token);
```

---

## 🚀 CRUD Produk

### GET — daftar produk
```
GET /products
```

### POST — tambah produk
```
POST /products
```

### PUT — edit produk
```
PUT /products/:id
```