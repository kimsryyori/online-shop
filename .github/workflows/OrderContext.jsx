import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

import {
  db
} from "../firebase/firebase";

import {
  useAuth
} from "./AuthContext";


const OrderContext = createContext();


export function OrderProvider({ children }) {

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);


  // Load user's orders
  useEffect(() => {

    if (!user) {

      setOrders([]);

      return;

    }

    const ordersRef =
      collection(db, "orders");

    const q = query(
      ordersRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );


    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {

        const orderList =
          snapshot.docs.map((doc) => ({

            id: doc.id,

            ...doc.data()

          }));

        setOrders(orderList);

      }
    );


    return unsubscribe;

  }, [user]);


  // Add order
  const addOrder = async (order) => {

    if (!user) {

      throw new Error(
        "You must login first."
      );

    }


    const newOrder = {

      userId: user.uid,

      customer: order.customer,

      payment: order.payment,

      items: order.items,

      total: order.total,

      status: "Pending",

      createdAt: serverTimestamp()

    };


    const docRef = await addDoc(
      collection(db, "orders"),
      newOrder
    );


    return {
      id: docRef.id,
      ...newOrder
    };

  };


  return (

    <OrderContext.Provider
      value={{
        orders,
        addOrder
      }}
    >

      {children}

    </OrderContext.Provider>

  );

}


export function useOrders() {

  return useContext(OrderContext);

}