# Book Store

An interactive and user-friendly online platform to explore, buy, and manage a collection of books. The application provides a seamless shopping experience, allowing users to browse through various categories, view detailed descriptions, and purchase their favorite books.

![image_alt](https://github.com/Badhon40/My-book-shop-frontend-3/blob/a62bdf8bfa865c8bd13a5604ea606df1ff26eda6/Screenshot%202025-05-10%20005555.png)

URl : (https://book-shop-frontend-weld-tau.vercel.app/)

## Features

* 📚 **Browse Books:** Discover a wide range of books across different genres.
* 🔍 **Search & Filter:** Quickly find books by title, author, genre, or price.
* 💳 **Secure Checkout:** Smooth and secure payment process.
* 📝 **User Authentication:** Sign up, log in, and manage your account.
* ⭐ **Ratings & Reviews:** View and add reviews for books.
* 📦 **Order History:** Track your previous purchases and order status.

## Technologies Used

* **Frontend:** React, Redux, TailwindCSS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Token)
* **Payment Integration:** Stripe
* **State Management:** Redux Toolkit

## Getting Started

### Prerequisites

* Node.js
* MongoDB
* Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/book-store.git

# Navigate to the project directory
cd book-store

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be running at `http://localhost:5173`.

### Environment Variables

Create a `.env` file in the root directory and add the following:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## Usage

* Visit the homepage to explore books.
* Use the search bar and filters to refine your search.
* View your order history and manage your profile.

## API Endpoints

* `GET /api/v1/books` - Get all books
* `GET /api/v1/books/:id` - Get book details by ID
* `POST /api/v1/auth/register` - Register a new user
* `POST /api/v1/auth/login` - Log in as an existing user
* `POST /api/v1/orders` - Place a new order

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, feel free to reach out:

* **Email:**(badhonraniroy@gmail.com)
* **GitHub:**(https://github.com/Badhon40)

---

Happy Reading! 📖✨
