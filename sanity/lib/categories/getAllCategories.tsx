import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";


export const getAllCategories = async ()=> 
{
    const ALL_CATEGORYIES_QUERY =defineQuery(`
        *[_type == "category"]
 | order(title asc)
        `);

        try{
            const categories=await sanityFetch({
                query:ALL_CATEGORYIES_QUERY,
            });

            return categories.data || []
        }catch (error) {
            console.error("ERROR IN FETCHING CATEGORIES")
            return []
        }

}

