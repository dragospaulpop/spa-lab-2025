import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          name,
          price,
          description,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setName("");
            setPrice("");
            setDescription("");
            setIsError(false);
            setMessage(data.message);
          } else {
            setIsError(true);
            setMessage(data.message || data.error.message);
          }
        })
        .catch((error) => {
          setIsError(true);
          setMessage(error.message);
        });
    },
    [name, price, description, setIsError, setMessage]
  );

  return (
    <form onSubmit={submit}>
      <fieldset className="flex flex-col gap-2 p-4">
        <legend>Add product form</legend>
        <div className="grid grid-cols-[100px_1fr]">
          <div className="gap-2 border p-4 col-start-1 col-end-3 grid-cols-subgrid grid">
            <label htmlFor="name" className="flex items-center">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-muted p-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="gap-2 border p-4 col-start-1 col-end-3 grid-cols-subgrid grid">
            <label htmlFor="price" className="flex items-center">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              id="price"
              className="bg-muted p-2 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="gap-2 border p-4 col-start-1 col-end-3 grid-cols-subgrid grid">
            <label htmlFor="description" className="flex items-center">
              Description
            </label>
            <textarea
              id="description"
              className="bg-muted p-2 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="gap-2 border p-4 col-start-1 col-end-3 grid-cols-subgrid grid">
            <button
              type="submit"
              className="col-start-1 col-end-3 bg-muted rounded-md px-2 py-4"
            >
              Add product
            </button>
          </div>
        </div>

        {message ? (
          <p className={cn(isError ? "text-red-500" : "text-green-500")}>
            {message}
          </p>
        ) : null}
      </fieldset>
    </form>
  );
}
