# Smart Finance App

A fullstack financial management application developed to help users organize and monitor their personal finances.

The application allows users to create an account, authenticate securely, manage financial transactions and visualize their expenses through interactive charts.

🚀 Live Demo: https://smart-finance-app-silk.vercel.app

## Features

* 👤 User registration
* 🔐 User login with JWT authentication
* 🔒 Protected API routes
* 💰 Add financial transactions
* 📋 List registered transactions
* ✏️ Edit transactions
* 🗑️ Delete transactions
* 🏷️ Transaction categories
* 📊 Expense visualization by category
* 📈 Average expenses by category
* 📅 Monthly expense visualization
* 💵 Total expense calculation
* 🧾 Receipt upload and OCR processing
* 🗄️ PostgreSQL database
* 🔗 Prisma ORM
* ☁️ Vercel deployment support

## Technologies

### Frontend

* [Next.js](https://nextjs.org/)
* React
* TypeScript
* Recharts
* CSS

### Backend

* Next.js API Routes
* TypeScript
* JWT
* bcrypt
* Prisma ORM

### Database

* PostgreSQL
* Neon PostgreSQL for production

### Other technologies

* Docker
* Git
* GitHub
* Vercel
* OCR with `node-tesseract-ocr`
* Sharp for image processing

## 🏗️ Project Architecture

The project uses the Next.js App Router architecture.

```text
Smart-Finance-App/
│
├── app/
│   ├── api/
│   │   ├── login/
│   │   ├── cadastro/
│   │   ├── transacoes/
│   │   ├── grafico/
│   │   └── comprovante/
│   │
│   ├── dashboard/
│   ├── login/
│   ├── cadastro/
│   │
│   ├── components/
│   │   ├── GraficoCategorias
│   │   ├── GraficoMedia
│   │   ├── GraficoGastosMeses
│   │   └── UploadComprovante
│   │
│   ├── globals.css
│   └── layout.tsx
│
├── lib/
│   ├── prisma.ts
│   └── imagem.ts
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── README.md
```

## 🔐 Authentication

The application uses JWT (JSON Web Token) authentication.

When a user successfully logs in, the API generates a JWT containing information about the authenticated user.

The token is stored on the client and sent in requests using the `Authorization` header:

```text
Authorization: Bearer <token>
```

Protected API routes verify this token before allowing access to user-specific data.

Passwords are not stored directly in the database. They are processed using `bcrypt`.

##  Transactions

Users can manage their financial transactions through the dashboard.

Each transaction contains information such as:

```text
Name
Value
Date
Category
User
```

The transaction API supports the main CRUD operations:

```text
GET     → List transactions
POST    → Create transaction
PUT     → Update transaction
DELETE  → Delete transaction
```

Transactions are associated with the authenticated user, allowing financial data to be separated between accounts.

## Financial Dashboard

The dashboard provides a visual representation of the user's financial information.

### Expense by Category

Displays how expenses are distributed among categories such as:

* Food
* Transportation
* Housing
* Investments
* Leisure

### Average by Category

Displays the average amount spent in each category.

### Monthly Expenses

Displays the distribution of expenses according to the month in which the transaction occurred.

### Total Expenses

The dashboard also calculates the total amount spent based on the registered transactions.

The charts are implemented using **Recharts**.

## Receipt Processing

The application also contains a receipt upload feature.

The user can upload a receipt image, which is processed through OCR technology.

The current OCR implementation uses:

```text
node-tesseract-ocr
```

The system extracts information such as:

* Establishment name
* Transaction value
* Date found on the receipt

The extracted information can then be used to create a financial transaction.

Image processing is supported through the `Sharp` library.

## Database

The project uses **PostgreSQL** as its relational database.

Prisma is used as the ORM responsible for communication between the application and the database.

The main environment variable used by Prisma is:

```env
DATABASE_URL="your_database_connection_string"
```

For production, the database can be hosted using **Neon PostgreSQL**.

## 🧬 Prisma

Prisma manages the application's database schema and provides the Prisma Client used by the API routes.

To generate the Prisma Client:

```bash
npx prisma generate
```

To create and apply migrations during development:

```bash
npx prisma migrate dev
```

To inspect the database using Prisma Studio:

```bash
npx prisma studio
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Jonathalllllllllll/-Smart-Finance-App.git
```

Enter the project directory:

```bash
cd -Smart-Finance-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://neondb_owner:npg_DRsTXQ02UuZe@ep-summer-frost-ax1q7jz1-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

Do not commit your `.env` file to GitHub.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

For development:

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Available Scripts

| Command                  | Description                                |
| ------------------------ | ------------------------------------------ |
| `npm run dev`            | Starts the development server              |
| `npm run build`          | Creates the production build               |
| `npm run start`          | Starts the production server               |
| `npm run lint`           | Runs ESLint                                |
| `npx prisma generate`    | Generates Prisma Client                    |
| `npx prisma migrate dev` | Creates and applies development migrations |
| `npx prisma studio`      | Opens Prisma Studio                        |

## ☁️ Deployment

The application is designed to be deployed using **Vercel**.

The production database can be hosted using **Neon PostgreSQL**.

The general production architecture is:

```text
User
  │
  ▼
Vercel
  │
  ├── Next.js Frontend
  │
  └── Next.js API Routes
          │
          ▼
      Prisma ORM
          │
          ▼
    Neon PostgreSQL
```

### Environment Variables on Vercel

The `DATABASE_URL` environment variable must be configured in the Vercel project settings.

Example:

```env
DATABASE_URL="your_neon_connection_string"
```

The `.env` file should remain local and should not be uploaded to GitHub.

##  Production Prisma Client

Before creating the production build, Prisma Client must be generated:

```bash
npx prisma generate
```

The production build should ensure Prisma Client is generated before `next build`.

## Security

The application uses:

* JWT for authentication
* bcrypt for password hashing
* Protected API routes
* Environment variables for database credentials
* User-specific transaction queries

Sensitive environment variables should never be committed to the repository.

## Project Goals

The main goal of Smart Finance App is to provide a simple and practical financial management system while applying fullstack development concepts.

The project brings together:

* Frontend development
* Backend development
* REST API development
* Authentication
* Database management
* ORM usage
* Data visualization
* OCR
* Cloud deployment

## What I Practiced

During the development of this project, several technologies and concepts were applied, including:

* Next.js App Router
* React
* TypeScript
* API Routes
* PostgreSQL
* Prisma
* JWT authentication
* Password hashing
* CRUD operations
* REST APIs
* Data visualization
* OCR
* Image processing
* Docker
* Git and GitHub
* Vercel deployment
* Neon PostgreSQL

## Future Improvements

Possible improvements for future versions include:

* More advanced financial reports
* Improved authentication and session management
* More transaction categories
* Better receipt data extraction
* Automatic transaction categorization
* Financial recommendations
* More detailed charts
* Improved mobile responsiveness
* More robust error handling

## Author

Developed as a fullstack development project focused on financial management, modern web technologies and practical application of backend and frontend concepts.



