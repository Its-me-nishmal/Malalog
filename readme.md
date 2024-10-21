# 📦 Malalog.js

**A versatile and colorful logging library for Node.js with optional Telegram and file integrations.**

---

## 📖 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Initialization](#initialization)
  - [Logging Functions](#logging-functions)
  - [Examples](#examples)
- [Configuration Options](#configuration-options)
- [Multilingual Support](#multilingual-support)
- [Security Best Practices](#security-best-practices)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## 📝 Introduction

`Malalog.js` is a powerful and flexible logging library designed for Node.js applications. It provides colorful console logging with support for multiple languages and optional integrations with Telegram and file systems. Whether you're running your application online or offline, `Malalog.js` ensures that your logs are accessible and organized.

---

## 🌟 Features

- **Colorful Console Logging:** Utilize vibrant colors for different log levels using Malayalam color names:
  - `m` (Manja) - Yellow
  - `p` (Pacha) - Green
  - `c` (Chuvappu) - Red
  - `n` (Neela) - Blue

- **Short Logging Functions:** Single-letter functions (`m`, `p`, `c`, `n`) for streamlined logging, along with descriptive aliases (`log`, `info`, `error`, `debug`).

- **Dual Invocation Support:** Use both **Tagged Template Literals** and **Regular Function Calls** for logging.

- **Optional Telegram Integration:** Send logs to a specified Telegram chat via a Telegram bot when configured.

- **Optional File Logging:** Persist logs to a file for offline access and archival.

- **Multilingual Support:** Log messages in **any language**, leveraging JavaScript's inherent Unicode support.

- **Automatic Timestamps:** Each log entry is timestamped in ISO format for better traceability.

---

## 📥 Installation

Ensure you have [Node.js](https://nodejs.org/) installed. Then, install `Malalog.js` and its dependencies:

```bash
mkdir malalog-project
cd malalog-project
npm init -y
npm install chalk axios
