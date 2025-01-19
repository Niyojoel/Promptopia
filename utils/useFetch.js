
export const fetchPosts = async (endPoint="GET", method, payload={}) => {

  try {
    if (method === "GET") {
      const response = await fetch(endPoint);
      return response;
    }

    if (method === "POST" || method === "PATCH") {
      const response = await fetch(endPoint, {
        method,
        body: JSON.stringify(payload),
      });      
      return response;  
    }

    if (method === "DELETE") {
      const response = await fetch(endPoint, {
        method,
      });

      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
