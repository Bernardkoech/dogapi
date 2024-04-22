import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SingleDog = () => {
  const [dog, setDog] = useState([]);
  const { name } = useParams();

  const fetchSingleDogData = async () => {
    try {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/search?q=${name}`
      );
      setDog(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSingleDogData();
  }, [name]);
  return (
    <>
      <section className="max-w-5xl mx-auto flex items-center justify-center h-screen">
        {dog.map((item) => (
          <div key={item.id} className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
            <article>
              <img
                src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                alt={item.name}
              />
            </article>
            <article>
              <h1 className="text-3xl font-bold  mb-8 lg:text-5xl">{item.name}</h1>
              {item.description && <p className="text-slate-400 mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed">{item.description}</p>}
              <ul className="text-sm text-slate-600 leading-loose lg:text-base lg:leading-relaxed">
                <li><span className="font-bold text-slate-700">Bred for :</span> {item.bred_for}</li>
                <li><span className="font-bold text-slate-700">Lifespan :</span>{item.life_span}</li>
                <li><span className="font-bold text-slate-700">Country of origin :</span>{item.origin} <><small>{item.country_code}</small></></li>
                <li><span className="font-bold text-slate-700">Temperament :</span> {item.temperament}</li>
                <li><span className="font-bold text-slate-700">Breed group :</span> {item.breed_group}</li>
              </ul>

              <Link to="/" className="inline-block bg-slate-200 py-2 px-6 rounded mt-8  hover:bg-slate-800 hover:text-white transition-all duration-200">&larr; Back</Link>
            </article>
          </div>
        ))}
      </section>
    </>
  );
};

export default SingleDog;
