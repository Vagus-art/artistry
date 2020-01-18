const fetchposts = async ()=>{
    const fetched = await fetch('http://localhost:3000/api/search');
    const fetchedjson = await fetched.json();
    return fetchedjson.results;
}

export default {
  fetchposts
};
