import React, { useState } from "react";
import BusinessResults from "./BusinessResults";
import { gql, useQuery } from "@apollo/client";

const BUSINESS_DETAILS_FRAGMENT = gql`
  fragment businessDetails on Business {
    businessId
    name
    address
    categories {
      name
    }
    isStarred @client
  }
`

const GET_BUSINESSES_QUERY = gql`
  query BusinessesByCategory($selectedCategory: String!) {
    businesses (
      where: { categories_SOME: { name_CONTAINS: $selectedCategory } }
    ){
      ...businessDetails
    }
  }

  ${BUSINESS_DETAILS_FRAGMENT}
`;  
  
function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  // обновление через интервал
  // const { loading, error, data, refetch } = useQuery(GET_BUSINESSES_QUERY, {
  //   variables: { selectedCategory },    
  //   pollInterval: 500    
  // });

  // обновление путем повторной выборки
  const { loading, error, data, refetch} = useQuery(
    GET_BUSINESSES_QUERY,
    {
      variables: {selectedCategory},
    }
  )

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Business Search</h1>
      <form>
        <label>Select Business Category:
          <select 
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">All</option>
            <option value="Library">Library</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Car Wash">Car Wash</option>
          </select>
        </label>
        {/* обновление через интервал */}
        {/* <input type="submit" value="Submit" /> */}
        {/* обновление путем повторной выборки, при шелчке */}
        <input type="button" value="Refetch" onClick={() => refetch()} />
      </form>
      <BusinessResults businesses={data.businesses} />
    </div>
  );
}

export default App;
