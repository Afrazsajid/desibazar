import React from 'react'

const   SearchPage = async({searchParams} : {
    searchParams :{
    query:string;
  }}) => {
 
const {query } = await searchParams
    return (
    <div>SearchFor {query}ghg</div>
  )
}

export default SearchPage