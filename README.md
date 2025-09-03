# Parcel Delivery System

### **🎯 Project Overview**

**secure, role-based, and user-friendly** frontend application for a **Parcel Delivery System** (similar to Pathao Courier or Sundarban) using **`Recact.js`** with **`TypeScript`** for type safety, **`TailwindCSS`** with **`ShadcnUI`** as the css libraries, and **`Redux Toolkit Query (RTK Query)`** for `State` & `API` handling.

The system will allow users to register as sender or receiver and perform parcel delivery operations such as **create parcel**, **track status**, and **cancel or receive parcels**.

The main goal is to build a functional and clean client-side application that interacts with a RESTful API, demonstrating proper state management, UI design, and core functionality.


---


## 🔏 Credentials
**ADMIN**
Email: `admin@gmail.com`
Password: `123456` 

**SENDER**
Email: `sender@gmail.com`
Password: `Abc@123` 

**RECEIVER**
Email: `receiver@gmail.com`
Password: `Abc@123` 


Visit here: [Parcel Delivery System](https://parcel-delivery-system-green.vercel.app/)


---


## 🛠️ Technology Stack  

| Category | Tools |
|---------|-------|
| ⚛️ Library | React.js |
| 🧠 Language | TypeScript |
| 🎨 Styling | Tailwind CSS, shadcn/ui |
| 🔄 State Management | Redux Toolkit, RTK Query |
| ⚙️ Build Tool | Vite |
| 🚀 Deployment | Vercel |
| 🧹 Linting | ESLint, Prettier |
| 📦 Others | React Router, Axios/Fetch, Lucide-react (icons) |


---


## 🔑 Key Features

- 🔐 Authentication & role-based Authorization (`admin`, `sender`, `receiver`)
- 🎭 Role-based *Dashboard*
- ❇️ Transactional Logic
- 🛠️ Parcel & Status Management
- ♾️ Tracking with status logs (status, timestamp, updatedBy, note)
- 📈 Statistical summary & history.
- 🔎 Searching & Filtering features
- 🔁 Pagination feature.


---


## 🧱 Installation & Setup Process

### CLI Commands :----------

- `bun create vite 'ProjectName' `
- `bun install`
- `bun add react-router react-hook-form`
- `bun add tailwindcss @tailwindcss/vite`
- `bun add -D @types/node`
- `bunx --bun shadcn@latest init`
- `bun add @reduxjs/toolkit react-redux`
- `bun add axios`


### At `index.css` :----------
```css
@import "tailwindcss";
```

### At `tsconfig.json` :----------

```json
// ...,
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
// ...
```

### At `tsconfig.app.json` :----------

```json
"compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
}
```

## At `vite.config.ts` :----------

```ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```
