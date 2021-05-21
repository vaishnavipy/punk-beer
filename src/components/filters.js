import React, { useContext, useState } from "react"
import { useEffect } from "react/cjs/react.development";
import {siteContext} from "../siteContext"

function Filters(){

    return(
    <div className="filters-container">
        <Filter name="Alcohol Vol (ABV):" values ={ ["All","S","M","L"] } active="All" fname="ABV"/>
        <Filter name= "Hopiness (IBU):" values ={ ["All","S","M","L"]} active="All" fname="hops"/>
        <Filter name= "Page : "  values ={ ["left","right"]} active="" fname="page"/>
    </div>)
}


function Filter({name,values,active,fname}){


    const [activeFilter,setActiveFilter] = useState(active);

    const {page,goToPreviousPage,goToNextPage,filterBeer} = useContext(siteContext)

    function changeFilter(value){
        setActiveFilter(value)
    }

    function changePage(value){
        if(value === "left"){
            goToPreviousPage()
        }else{
            goToNextPage()
        }
    }

    useEffect(()=>{
        if(fname != "page"){
            filterBeer(fname,activeFilter)        
        }
    },[activeFilter])

    return(
         <div className="filter" key={name}>
            {fname === "page" ? <p className="filter-name">{name}{page}</p> : <p className="filter-name">{name}</p>}
            <div className="filter-values">
                {fname === "page" ? 
                
                values.map((value,i) => {
                    return(
                    <span key={value} className={page < 2 && value == "left" ? "inactive-page" : "filter-icon"} onClick={()=>{changePage(value)}}>{value}</span>)
                }) 
                :
                values.map((value,i) => {
                    return(
                    <span key={value} className={activeFilter === value ? "active-filter" : "filter-icon"} onClick={()=>{changeFilter(value)}}>{value}</span>)
                })

                }
            </div>
        </div>)
}
export default Filters;