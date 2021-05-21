import React, { useContext, useEffect, useState } from "react"
import {siteContext} from "../siteContext"

function Beers(){

    const [beerArrOriginal,setBeerArrOriginal] = useState([])

    const [beerArrFiltered,setBeerArrFiltered] = useState([])

    const {page,filter} = useContext(siteContext)


    useEffect(()=>{
        fetch(`https://api.punkapi.com/v2/beers?page=${page}`)
        .then(response => response.json())
        .then(data => setBeerArrOriginal(data))
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{

        fetch(`https://api.punkapi.com/v2/beers?page=${page}`)
        .then(response => response.json())
        .then(data => setBeerArrOriginal(data))
        .catch(err => console.log(err))

    },[page]) 

    useEffect(()=>{
        setBeerArrFiltered(beerArrOriginal)
    },[beerArrOriginal])

    useEffect(()=>{
    
        const {ABV} = filter
        if(ABV !== "All"){
            setBeerArrFiltered(beerArrOriginal.filter(beers => {
                if(ABV === "S"){
                    return beers.abv > 0 && beers.abv < 4
                }else if(ABV === "M"){
                    return beers.abv >= 4  && beers.abv <7
                }else{
                    return beers.abv >= 7
                }

            } ))
        }else{
            setBeerArrFiltered(beerArrOriginal);
        }
    },[filter.ABV])

    useEffect(()=>{
    
        const {hops} = filter;
        if(hops !== "All"){
            setBeerArrFiltered(beerArrOriginal.filter(beers => {
                if(hops === "S"){
                    return beers.hops > 0 && beers.hops < 30
                }else if(hops === "M"){
                    return beers.hops >= 40  && beers.hops <70
                }else{
                    return beers.hops >= 70
                }
            }))
        }{
                setBeerArrFiltered(beerArrOriginal)
        }
    },[filter.hops])

    const all_beers = beerArrFiltered.map((beer,i) => {
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
      
        <div className="beer-details">
            <h1>{beer.name}</h1>
            <p><em>{beer.tagline}</em></p>
            <hr className="line"/>
            <p>{beer.description}</p>
            <p><em>Pairings : {(beer.food_pairing).join(",")}</em></p>
        </div>
    </div>)
}

export default Beers;