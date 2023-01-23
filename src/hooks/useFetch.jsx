function useFetch() {
  const makeFetch = async () => {
    try {
      const responseApi = await fetch('https://swapi.dev/api/planets');
      const responseJson = await responseApi.json();
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  };
  return { makeFetch };
}

export default useFetch;
