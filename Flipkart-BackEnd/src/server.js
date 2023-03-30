const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const cateogoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const carttRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");

//environment variable or you can say constants
env.config();

//mongo connection
//"mongodb+srv://tom777:<password>@cluster0.wi0w1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wi0w1.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", cateogoryRoutes);
app.use("/api", productRoutes);
app.use("/api", carttRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
