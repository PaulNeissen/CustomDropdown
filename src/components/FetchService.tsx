import { useState, useEffect } from "react";
import "./FetchService.css"

interface Props {
  url: string;
  onFetch: (data: []) => void;
}

const FetchService = ({url, onFetch}: Props) => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Collect data and handle response state
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(fetchData => {
        onFetch(fetchData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Handle loading time
  if (loading)
    return <div><i className="fa fa-spinner fa-spin fetch-icon"></i>Loading</div>;

  // Display error message
  if (error) 
    return <div className="fetch-error">Error while fetching data</div>;

  return <></>;
  
}

export default FetchService;