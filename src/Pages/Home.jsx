import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [dogs, setDogs] = useState([]);
  const [text, setText] = useState("");

  const fetchDogData = async () => {
    try {
      let url = "https://api.thedogapi.com/v1/breeds";
      if (text) {
        url += `/search?q=${text}`;
      }
      const response = await axios.get(url);
      setDogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDogData();
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      {!dogs ? (
        <h1 className="flex items-center justify-center text-slate-800 text-center px-5 text-3xl h-screen font-bold uppercase">
          Loading .....
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-6xl mx-auto">
            <div className="text-center ">
              <Link to="/">
                <h1 className="flex items-center justify-center text-slate-800 text-center px-5 text-3xl  font-bold lg:text-5xl">
                  The Dog App
                </h1>
              </Link>
              <p className="my-8">
                This application is powered by{" "}
                <a
                  href="https://thedogapi.com"
                  className="text-indigo-600 underline active:text-orange-500"
                >
                  The Dog API
                </a>
              </p>

              <form
                className="max-w-xl mx-auto flex items-center justify-between"
                autoComplete="off"
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search for dog breed..."
                  className="py-2 px-4 rounded shadow w-full"
                  value={text}
                  onChange={handleChange}
                />
              </form>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-10 lg:my-20">
              {dogs.map((dog) => (
                <Link
                  key={dog.id}
                  to={`/${dog.name}`}
                  className=" p-4 rounded shadow hover:bg-slate-200"
                >
                  <article>
                    {dog.reference_image_id && (
                      <img
                        src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                        alt={dog.name}
                        loading="lazy"
                        className="rounded md:h-72 w-full object-cover"
                      />
                    )}
                    <h3 className="text-lg font-bold mt-4 mb-1">{dog.name}</h3>
                    <p className="text-slate-600">Bred for: {dog.bred_for}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
