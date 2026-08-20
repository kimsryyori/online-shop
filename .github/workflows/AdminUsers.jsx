import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";


function AdminUsers() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadUsers = async () => {

      try {

        const snapshot =
          await getDocs(
            collection(db, "users")
          );


        const userList =
          snapshot.docs.map((document) => ({

            id: document.id,

            ...document.data()

          }));


        setUsers(userList);

      } catch (error) {

        console.error(
          "Error loading users:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadUsers();

  }, []);


  if (loading) {

    return (
      <div className="admin-page">

        <h2>
          Loading users...
        </h2>

      </div>
    );

  }


  return (

    <div className="admin-page">

      <h1>
        User Management 👥
      </h1>

      <p>
        View registered customers
      </p>


      <div className="admin-users">

        {users.map((user) => (

          <div
            className="admin-user"
            key={user.id}
          >

            <div className="user-avatar">
              👤
            </div>


            <div>

              <h3>
                {user.name}
              </h3>

              <p>
                {user.email}
              </p>

              <span>
                Role: {user.role}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default AdminUsers;