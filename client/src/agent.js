const fetchposts = async ()=>{
    const fetched = await fetch('/api/search');
    const fetchedjson = await fetched.json();
    return fetchedjson;
}

export default {
  fetchposts
};
