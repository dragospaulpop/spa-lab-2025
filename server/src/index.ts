import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import * as z from "zod";
import { prisma } from "./lib/prisma";

const addProductSchema = z.object({
  name: z.string("Name is required").min(2, "Should be >= 2 chars"),
  price: z.coerce.number("Price is required").min(0, "Should be >= 0"),
  description: z
    .string("Description is required")
    .min(10, "Should be >= 10 chars"),
});

const app = new Hono();

app.use(cors());

let numberOfRequests = 0;

// list all products
app.get("/products", async (c) => {
  numberOfRequests++;

  if (numberOfRequests > 100) {
    // throw new Error("Too many requests");
    return c.json(
      {
        data: [],
        success: false,
        message: "Too many requests",
      },
      429
    );
  }

  const products = await prisma.product.findMany();

  return c.json(
    {
      data: products,
      success: true,
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

  return c.json(
    {
      data: [],
      success: true,
      message: "Product deleted successfully",
    },
    200
  );
});

// add a product
app.post("/products", zValidator("json", addProductSchema), async (c) => {
  const { name, price, description } = c.req.valid("json");

  await prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  });

  return c.json(
    {
      data: [],
      success: true,
      message: "Product added successfully",
    },
    200
  );
});

export default app;
