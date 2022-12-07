import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

type FirebaseLists = Record<
  string,
  {
    description: string;
    itens: Record<
      string,
      {
        mandatory: boolean;
        name: string;
        status: boolean;
      }
    >;
    owner: string;
    shared: boolean;
    title: string;
  }
>;

interface Item {
  mandatory: boolean;
  name: string;
  status: boolean;
}

interface Lists {
  id: string;
  description: string;
  itens: Item[];
  owner: string;
  shared: boolean;
  title: string;
}

export function useLists() {
  const [lists, setLists] = useState<Lists[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const listsRef = database.ref(`lists`);

    listsRef.on("value", (lists) => {
      const databaseLists = lists.val();
      const firebaseLists: FirebaseLists = databaseLists ?? {};

      const parsedLists = Object.entries(firebaseLists).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          description: value.description,
          itens: value.itens,
          owner: value.owner,
          shared: value.shared,
        };
      });

      setLists(parsedLists);
    });

    return () => {
      listsRef.off("value");
    };
  }, []);

  return { lists };
}
