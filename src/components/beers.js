import React, { useContext, useEffect, useState } from "react"
import {siteContext} from "../siteContext"

function Beers(){

    const [beerArr,setBeerArr] = useState([])

    const {page} = useContext(siteContext)


    useEffect(()=>{
        fetch(`https://api.punkapi.com/v2/beers?page=${page}`)
        .then(response => response.json())
        .then(data => setBeerArr(data))
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{

        fetch(`https://api.punkapi.com/v2/beers?page=${page}`)
        .then(response => response.json())
        .then(data => setBeerArr(data))
        .catch(err => console.log(err))

    },[page]) 

    const beers = beerArr.map((beer,i) => {
        return(
        <div className="beer-card" key={beer.id}>
            <div className="beer-img-div"><img src={beer.image_url}/></div>
            <h2>{beer.name}</h2>
            <div className="beer-card-flex">
                <p>ABV : {beer.abv}%</p>
                <p>IBU : {beer.ibu}</p>
            </div>
        </div>)
    })

    return(
    <div className="all-beers-container">
        {beers}
    </div>)
}

export default Beers;