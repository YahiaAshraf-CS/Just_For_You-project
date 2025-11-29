import React from 'react'
import Footer from "../../layout/Footer";
import ButtonLight from "../../components/buttons/ButtonLight";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";


function LoginPage() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    

    const handleLogin =async (e) => {
      setLoading(true);
      e.preventDefault();
      setError("");
        setTimeout(async () => {
         
     
            try {
                
                const res = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
                const data = await res.json();

                
                if (data.length === 0) {
                    setError("Invalid email or password");
                    setLoading(false);
                    return;
                }

                
                localStorage.setItem("currentUser", JSON.stringify(data[0]));

               
                navigate("/product");
                setLoading(false);
            } catch {
                setError("Something went wrong");
                setLoading(false);
            }
        }, 1000);
    };

  return (
      <div className="bg-red-100 w-full md:h-screen lg:h-screen xl:h-full sm:h-full   border-2 flex items-start justify-center md:justify-between lg:justify-between xl:justify-center">
          <main className=" w-full h-full border-2  flex items-center gap-12 justify-center md:justify-between lg:justify-between xl:justify-center flex-col">
              <div className="logo w-[80%] mt-12 md:w-[70%] lg:w-[50%] xl:w-[50%] h-fit px-12 py-4   rounded-3xl shadow-xl shadow-pink-400 ">
                  {" "}
                  <h1 className=" text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center text-pink-600 m-auto ">LoginPage</h1>
                  <p className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-center text-pink-600 pt-9 ">Welcome Home</p>
              </div>
              <form
                  onSubmit={handleLogin}
                  action=""
                  className="flex flex-col border-2  border-pink-700  shadow-2xl shadow-pink-400 h-fill w-[80%] md:w-[70%] lg:w-[50%] xl:w-[50%] rounded-3xl px-6 py-6 items-center justify-center gap-10">
                  <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter your email"
                      className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                  />

                  <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Enter your password"
                      className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                  />
                  <div className="btns w-full gap-6  h-fit flex items-center justify-center flex-col">
                      <button
                          type="submit"
                          className="w-[100%] rounded-2xl cursor-pointer hover:shadow-2xl hover:shadow-pink-400 px-4 py-2 text-2xl text-white border-[var(--color-prinky)] bg-[var(--color-prinky)] hover:bg-transparent transition duration-300 ease-in-out hover:shadow-2xl hover:text-[var(--color-prinky)] border-2 flex items-center justify-center">
                          {loading ?  <p> loading <ClipLoader  color='#fff' size={22} /> </p>   : "Login"}
                      </button>
                      <ButtonLight className="bg-[var(--color-creamy)] hover:shadow-2xl hover:shadow-amber-400 text-2xl w-[100%] px-4 py-2 h-[50px] text-[var(--color-prinky)] rounded-2xl  px-6 py-2 rounded transition duration-300 ease-in-out border-2 border-[var(--color-creamy)] hover:border-2 hover:border-amber-400 cursor-pointer hover:bg-transparent flex items-center justify-center hover:text-amber-400">
                          Back to Home
                      </ButtonLight>
                      {error && <p className="mt-4 text-center text-sm text-gray-700">❌❌ {error} ❌❌ </p>}
                  </div>
              </form>

              <Footer></Footer>
          </main>
      </div>
  );
}

export default LoginPage

