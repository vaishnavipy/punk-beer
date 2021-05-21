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

    const all_beers = beerArr.map((beer,i) => {
        return(<BeerCard beer={beer} />)
    })

    return(
    <div className="all-beers-container">
        {all_beers}
    </div>)
}

function BeerCard({beer}){

    const [hover,setHover] = useState(false) 

    return(
    <div className="beer-card" key={beer.id} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>

        <div className="beer-card-content">
            <div className="beer-img-div"><img src={beer.image_url}/></div>
            <h2>{beer.name}</h2>
            <div className="beer-card-flex">
                <p>ABV : {beer.abv}%</p>
                <p>IBU : {beer.ibu}</p>
            </div>
        </div>
       {hover && 
        <div className="beer-details">
            <h1>{beer.name}</h1>
            <p><em>{beer.tagline}</em></p>
            <hr className="line"/>
            <p>{beer.description}</p>
            <p><em>Pairings : {(beer.food_pairing).join(",")}</em></p>
        </div>}
    </div>)
}

export default Beers;