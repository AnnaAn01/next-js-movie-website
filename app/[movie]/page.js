// import Image from "next/image";

// export default async function MovieDetail({ params }) {
//   const { movie } = params;
//   const imagePath = "https://image.tmdb.org/t/p/original";
//   //   the movie comes from what we named our [] folder - [movie]
//   const data = await fetch(
//     `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
//     //   { next: { revalidate: 0 } } makes it fetch the data every time when you go to the page
//     // otherwise it caches it and next time you click on the same page it will load from the cached data
//     // we can add a certain amount of seconds, eg. 60seconds, and it will start refetching the data after 60seconds
//     //, { next: { revalidate: 60 } }
//   );
//   const res = await data.json();
//   return (
//     <div>
//       <div>
//         <h2 className="text-2xl">{res.title}</h2>
//         <h2 className="text-lg">Release date: {res.release_date}</h2>
//         <h2 className="text-lg">Runtime: {res.runtime} minutes</h2>
//         <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md text-white">
//           {res.status}
//         </h2>
//         <Image
//           className="my-12 w-full"
//           src={imagePath + res.backdrop_path}
//           width={1000}
//           height={1000}
//           priority
//         />
//         <p>{res.overview}</p>
//       </div>
//     </div>
//   );
// }

// Serving them statically by fetching them beforehand
import Image from "next/image";

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return res.results.map((movie) => ({
    movie: toString(movie.id),
  }));
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  //   the movie comes from what we named our [] folder - [movie]
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
    //   { next: { revalidate: 0 } } makes it fetch the data every time when you go to the page
    // otherwise it caches it and next time you click on the same page it will load from the cached data
    // we can add a certain amount of seconds, eg. 60seconds, and it will start refetching the data after 60seconds
    //, { next: { revalidate: 60 } }
  );
  const res = await data.json();
  return (
    <div>
      <div>
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">Release date: {res.release_date}</h2>
        <h2 className="text-lg">Runtime: {res.runtime} minutes</h2>
        <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md text-white">
          {res.status}
        </h2>
        <Image
          className="my-12 w-full"
          src={imagePath + res.backdrop_path}
          width={1000}
          height={1000}
          priority
        />
        <p>{res.overview}</p>
      </div>
    </div>
  );
}
