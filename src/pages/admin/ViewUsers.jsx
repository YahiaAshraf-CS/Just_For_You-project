import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaTrash, FaUserShield } from "react-icons/fa";//the delete icon



function ViewUsers() {
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [users, setUsers] = useState([]);

     const api = "http://127.0.0.1:5000/api/admin/users";
     const get_users = async () => {
         const response = await fetch(`${api}`);
         const data = await response.json();
       if (data.status === "success") {
         setUsers(data.users);
       }
       else {
         console.error(data.message);
       }
  };

  const delete_user = async (user_id) => {
    const response = await fetch(`${api}/${user_id}`, {
      method: "DELETE",
    });
    if (user_id === currentUser.id) {
        alert("You cannot delete yourself");
        return;
    }
    if (response.ok) {
      get_users();
    }
    else {
       const error = await response.json();
      console.error("Failed to delete user : "+error.message);
    }

  };
  const makeAdmin= async (user_id) => {
    const response = await fetch(`${api}/${user_id}`, {
      method: "POST",
    });
    if (response.ok) {
      get_users();
    }
    else {
      console.error("Failed to make admin");
    }
  };

    useEffect(() => {
        get_users();
    }, []);
  

    //to make the admin see all the users

    return (
        <>
            <h1 className="text-2xl md:text-4xl text-center mt-10 md:mt-20 lg:mt-50 text-pink-600">View Users</h1>
            <div className="flex flex-col w-full gap-6 justify-center items-center mt-4 md:mt-10 mb-10 px-4">
                <div className="overflow-x-auto w-full">
                    <table className="table-auto min-w-full border-0 rounded-2xl bg-pink-200 border-pink-400">
                    <thead className="border-0 rounded-2xl border-pink-400 w-[100%]">
                        <tr>
                            <th className=" text-center text-md  md:text-lg lg:text-2xl border-pink-700">ID</th>
                            <th className=" text-center text-md  md:text-lg lg:text-2xl border-pink-700">First Name</th>
                            <th className=" text-center text-md  md:text-lg lg:text-2xl border-pink-700">Last Name</th>
                            <th className=" text-center text-md  md:text-lg lg:text-2xl border-pink-700">Email</th>
                            <th className=" text-center text-md  md:text-lg lg:text-2xl border-pink-700"> Delete</th>
                            <th className=" text-center text-md  md:text-lg lg:text-2xl border-pink-700"> is Admin</th>

                            <th className="hidden md:table-cell text-center text-md md:text-lg lg:text-2xl border-pink-700">Makes Admin</th>
                        </tr>
                    </thead>
                    <tbody className="border-0 rounded-2xl border-pink-400">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border-4 text-md text-center  md:text-lg lg:text-2xl border-pink-400">{user.id}</td>
                                <td className="border-4 text-md text-center  md:text-lg lg:text-2xl border-pink-400">{user.firstName}</td>
                                <td className="border-4 text-md text-center  md:text-lg lg:text-2xl border-pink-400">{user.lastName}</td>
                                <td className="border-4 text-md text-center  md:text-lg lg:text-2xl border-pink-400">{user.email}</td>
                                <td className="border-4 text-md text-center  md:text-lg lg:text-2xl flex items-center justify-center  border-pink-400">
                                    <button
                                        className="bg-red-500 gap-2.5  shadow-md shadow-red-400 hover:shadow-xl hover:shadow-red-700  hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out text-white font-bold m-3 flex justify-center items-center py-2 px-4 rounded-2xl"
                                        onClick={() => delete_user(user.id)}>
                                        {" "}
                                        <FaTrash />
                                        Delete
                                    </button>
                                </td>
                                <td className="border-4 text-md text-center  md:text-lg lg:text-2xl border-pink-400">{user.is_admin ? "yes" : "no"}</td>
                                <td className=" md:table-cell border-4 text-center  text-md md:text-lg lg:text-2xl flex items-center justify-center border-pink-400">
                                    <button
                                        className="bg-green-400 gap-2.5  shadow-md text-sm md:text-lg lg:text-2xl shadow-green-300 hover:shadow-xl hover:shadow-green-500 cursor-pointer transition duration-300 ease-in-out hover:bg-green-700 text-white font-bold  flex justify-center items-center py-2 px-4 rounded-2xl"
                                        onClick={() => makeAdmin(user.id)}>
                                        {" "}
                                        <FaUserShield className='' />
                                        Make Admin
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    );
}

export default ViewUsers
