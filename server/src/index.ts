import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import * as z from "zod";

const addProductSchema = z.object({
  name: z.string("Name is required").min(2, "Should be >= 2 chars"),
  price: z.number("Price is required").min(0, "Should be >= 0"),
  description: z
    .string("Description is required")
    .min(10, "Should be >= 10 chars"),
});

const app = new Hono();

let products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    description: "Product 1 description",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    description: "Product 2 description",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    description: "Product 3 description",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    description: "Product 4 description",
  },
];

app.use(cors());

let numberOfRequests = 0;

// list all products
app.get("/products", (c) => {
  numberOfRequests++;

  if (numberOfRequests > 100) {
    // throw new Error("Too many requests");
    return c.json(
      {
        data: [],
        status: "error",
        message: "Products fetch failed",
      },
      429
    );
  }
  return c.json(
    {
      data: products,
      status: "success",
      message: "Products fetched successfully",
    },
    200
  );
});

// delete a product by id
app.delete("/products/:id", (c) => {
  const id = parseInt(c.req.param("id"));

  // functional approach
  // products = products.filter((product) => product.id !== id);

  // procedural approach
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex === -1) {
    return c.json(
      {
        data: [],
        status: "error",
        message: "Product not found",
      },
      404
    );
  } else {
    products.splice(productIndex, 1);
  }

  return c.json(
    {
      data: [],
      status: "success",
      message: "Product deleted successfully",
    },
    200
  );
});

// add a product
app.post("/products", zValidator("json", addProductSchema), (c) => {
  const { name, price, description } = c.req.valid("json");

  products.push({
    id: products.length + 1,
    name,
    price,
    description,
  });

  return c.json(
    {
      data: [],
      status: "success",
      message: "Product added successfully",
    },
    200
  );
});

export default app;
