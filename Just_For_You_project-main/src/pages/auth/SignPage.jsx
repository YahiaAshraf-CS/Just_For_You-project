import React from 'react'
import ButtonPink from "../../components/buttons/ButtonPink";
import ButtonLight from "../../components/buttons/ButtonLight";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";





function SignPage() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
      firstName: "",
      lastName: "",
      number: "",
      email: "",
      password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleSign = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(async () => {

      try {


        const postRes = await fetch("http://127.0.0.1:5000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        const postData = await postRes.json();

        if (!postRes.ok) {
          setError(postData.message || "Signup failed");
          setLoading(false);
          return;
        }

        localStorage.setItem("currentUser", JSON.stringify(newUser));

        navigate("/product");
      } catch (err) {
        console.error("SignUp error:", err);
        setError("Something went wrong. Make sure the backend is running on port 5000.");
      } finally {
        setLoading(false);
      }
    }, 1000);
      
  };
   return (
       <div className="bg-red-100 w-full md:h-screen lg:h-screen xl:h-full sm:h-full   border-2 flex items-start justify-center md:justify-between lg:justify-between xl:justify-center">
           <main className=" w-full h-full border-2  flex items-center gap-12 justify-center md:justify-between lg:justify-between xl:justify-center flex-col">
               <div className="logo w-[95%] mt-12 md:w-[70%] lg:w-[50%] xl:w-[50%] h-fit px-12 py-4   rounded-3xl shadow-xl shadow-pink-400 ">
                   {" "}
                   <h1 className=" text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center text-pink-600 m-auto ">SignUp</h1>
                   <p className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-center text-pink-600 pt-9 ">Hello there</p>
               </div>
               <form
                   onSubmit={handleSign}
                   action=""
                   className="flex flex-col border-2  border-pink-700  shadow-2xl shadow-pink-400 h-fill w-[95%] md:w-[70%] lg:w-[50%] xl:w-[50%] rounded-3xl px-6 py-6 items-center justify-center gap-10">
                   <div className="flex items-center justify-center gap-4 w-full">
                       <input
                           value={newUser.firstName}
                           onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                           type="text"
                           required
                           className=" outline-0 border-2 focus:placeholder-pink-700 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                           placeholder="First Name"
                       />
                       <input
                           type="text"
                           value={newUser.lastName}
                           onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                           required
                           className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                           placeholder=" Last Name"
                       />
                   </div>
                   <input
                       type="text"
                       value={newUser.number}
                       onChange={(e) => setNewUser({ ...newUser, number: e.target.value })}
                       required
                       placeholder="Enter your Number"
                       className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                   />
                   <input
                       type="email"
                       value={newUser.email}
                       onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                       required
                       placeholder="Enter your email"
                       className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                   />

                   <input
                       type="password"
                       value={newUser.password}
                       onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                       required
                       placeholder="Enter your password"
                       className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                   />
                   <div className="btns w-full gap-6  h-fit flex items-center justify-center flex-col">
                       <button
                           type="submit"
                           className=" bg-[var(--color-prinky)] text-white px-6 py-2 rounded-2xl w-[100%] transition duration-300 ease-in-out border-2 border-[var(--color-prinky)] cursor-pointer text-2xl hover:bg-transparent flex items-center justify-center  h-[45px] mt-1 hover:shadow-2xl hover:shadow-pink-500 hover:text-[var(--color-prinky)]">
                           {loading ? (
                               <p>
                                   {" "}
                                   loading <ClipLoader color="#fff" size={20} />
                               </p>
                           ) : (
                               "Sign Up"
                           )}
                       </button>

                       <ButtonLight className="bg-[var(--color-creamy)] text-2xl w-[100%] px-4 py-2 h-[45px] text-[var(--color-prinky)] rounded-2xl  px-6 py-2 rounded transition duration-300 ease-in-out border-2 border-[var(--color-creamy)] hover:border-2 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400 cursor-pointer hover:bg-transparent flex items-center justify-center hover:text-amber-400">
                           Back to Home
                       </ButtonLight>
                   </div>
                   {error && <p className="text-red-600">❌❌ {error} ❌❌</p>}
               </form>
               <Footer></Footer>
           </main>
       </div>
   );
}

export default SignPage