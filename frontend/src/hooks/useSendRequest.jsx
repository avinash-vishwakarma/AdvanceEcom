import axios from "axios";
import React, { useCallback, useState } from "react";

const useSendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setReseponse] = useState(null);

  const request = useCallback((config) => {
    setIsLoading(true);
    axios(config)
      .then((response) => {
        setReseponse(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return [request, isLoading, response, error];
};

export default useSendRequest;
