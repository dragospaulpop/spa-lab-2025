import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import AddProductForm from "./components/add-product-form";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import DeleteProduct from "./components/ui/delete-product";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "./components/ui/item";

import type { Product } from '../../server/src/lib/prisma';


function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const fetchFromServer = () => {
    setLoading(true);
    setData([]);
    setIsError(false);
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
        } else {
          setIsError(true);
        }
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage(error.message);
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
        setTriggerFetch(false);
      });
  };

  useEffect(() => {
    console.log("triggerFetch", triggerFetch);
    if (triggerFetch) {
      fetchFromServer();
    }
  }, [triggerFetch]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {loading ? <p>Loading...</p> : null}
      <Button
        onClick={() => setTriggerFetch(true)}
        disabled={loading}
        variant="default"
      >
        Refresh
      </Button>

      {isError ? (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}

      {data.length > 0 ? (
        <ItemGroup className="gap-2">
          {data.map((product) => (
            <Item key={product.id} variant="outline" size="sm">
              <ItemActions>
                <DeleteProduct
                  id={product.id}
                  fetchFromServer={fetchFromServer}
                  setLoading={setLoading}
                  setData={setData}
                  setIsError={setIsError}
                  setMessage={setMessage}
                  setTriggerFetch={setTriggerFetch}
                />
              </ItemActions>
              <ItemContent className="gap-1">
                <ItemTitle>{product.name}</ItemTitle>
                <ItemDescription>{product.description}</ItemDescription>
              </ItemContent>
              <ItemActions className="font-mono text-xs text-muted-foreground">
                ${product.price}
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      ) : null}

      <AddProductForm />
    </div>
  );
}

export default App;
