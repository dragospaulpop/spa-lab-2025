import { Trash2Icon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "./button";

interface DeleteProductProps {
  id: number;
  fetchFromServer: () => void;
  setLoading: (loading: boolean) => void;
  setData: Dispatch<SetStateAction<never[]>>;
  setIsError: (isError: boolean) => void;
  setMessage: (message: string) => void;
  setTriggerFetch: (triggerFetch: boolean) => void;
}

export default function DeleteProduct({
  id,
  fetchFromServer,
  setLoading,
  setData,
  setIsError,
  setMessage,
  setTriggerFetch,
}: DeleteProductProps) {
  const deleteProduct = (id: number) => {
    setLoading(true);
    setData([]);
    setIsError(false);

    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchFromServer();
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

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => deleteProduct(id)}
    >
      <Trash2Icon className="text-destructive" />
    </Button>
  );
}
