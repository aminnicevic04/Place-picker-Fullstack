import { useState, useEffect } from "react";
import Error from "./Error.jsx";
import Places from "./Places.jsx";
// Places = localStorage.getItem();

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setisFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setisFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();
        if (!response.ok) {
          throw Error("failed to fetch places");
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
      }
      setisFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingtText="fetching place data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
