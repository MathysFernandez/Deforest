<div align="center">
    <h1>🌐 API Documentation - Deforest</h1>
</div>

This document explains how the API used in the project works, the securing of access keys, and the communication between the frontend and the backend.

---

## 📌 Overview

The project uses the official **Global Forest Watch (GFW)** API to retrieve global deforestation data in real-time.

[Official Documentation](https://data-api.globalforestwatch.org/)

---

## 🔐 Securing API Keys

## Why secure the keys?

Initially, the API keys were directly present in the JavaScript frontend:

```js
const GFW_API_KEY = "...";
const GFW_BEARER_TOKEN = "...";
```

This posed a security issue because any user could see the keys from the browser.

---

## ✅ New Secure Architecture

The frontend no longer contacts Global Forest Watch directly.

The system now works like this:

```txt
Frontend → Backend Express.js → API Global Forest Watch
```

The backend:
- stores the API keys,
- makes secure requests,
- sends back only the necessary data to the frontend.

---

## 📁 Environment Variables (.env)

Sensitive information is stored in a `.env` file that must be placed in the backend because it is not included by default.

Example :

```env
GFW_API_KEY=  <NOTRE_CLE_API> 
GFW_BEARER_TOKEN=  <NOTRE_TOKEN>
PORT=3000
```

---

## ⚠️ Important for all project members

The .env file is never pushed to GitLab for security reasons.

Each user who clones the project must:
- retrieve the `.env` file,
- place it in the `backend/` directory,
- use their own API keys if necessary.

> **WARNING** Without the .env file, the backend cannot start properly and API requests will fail.

---

## 🚫 Git Protection

The `.env` file is ignored thanks to the `.gitignore`.

```gitignore
backend/.env
node_modules/
```

This prevents publishing sensitive keys on GitLab.

---

## ⚙️ Backend Installation

The backend uses **Node.js** and **Express.js**.

Each user must install the project dependencies after cloning the Git repository.

---

## 📦 Install Node.js

Node.js is required to start the backend server.

[Official download](https://nodejs.org/)

---

## 🪟 Installation on Windows

### 1. Download Node.js

Download the installer from:

[this](https://nodejs.org/)

> Choose the recommended LTS version.

---

### 2. Install Node.js

Run the .msi installer then:
- click on NEXT,
- accept the terms and conditions,
- leave the default options,
- finish the installation.

---

### 3. Verify the installation

Open a PowerShell or CMD terminal:

```bash
node -v
npm -v
```

The installed versions should appear in the terminal.

---

## 🐧 Installation on Linux (Ubuntu)

### 1. Install npm and Node.js

```bash
sudo apt update
sudo apt install npm
```

---

### 2. Verify the installation

```bash
npm --version
node -v
```

> The installed versions should appear in the terminal.  

---

## 📥 Installation of Project Dependencies

### 1. Go to the backend directory

```bash
cd backend
```

---

### 2. Install dependencies

```bash
npm install
```

This command:
- automatically downloads the necessary libraries,
- creates the `node_modules/` directory,
- installs Express, dotenv, and the other dependencies.

---

## 📁 Why is node_modules not pushed to GitLab?

The `node_modules/` directory can be automatically recreated using:

```bash
npm install
```

It is therefore ignored in the `.gitignore`.

This allows:
- avoiding overly large files on GitLab,
- keeping the project clean,
- ensuring that each user installs the correct versions.



## 🚀 Start the server

Once the `.env` file is configured and the dependencies are installed, start the server with:   

```bash
node server.js
```

> The terminal should display: Server started on port 3000.
