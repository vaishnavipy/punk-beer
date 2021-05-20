import React, { useContext, useState } from "react"
import {siteContext} from "../siteContext"

function Filters(){

    return(
    <div className="filters-container">
        <Filter name="Alcohol Vol (ABV):" values ={ ["All","S","M","L"] } active="All"/>
        <Filter name= "Hopiness (IBU):" values ={ ["All","S","M","L"]} active="All"/>
        <Filter name= "Page : "  values ={ ["left","right"]} active=""/>
    </div>)
}


function Filter({name,values,active}){


    const [activeFilter,setActiveFilter] = useState(active);

    const {page,goToPreviousPage,goToNextPage} = useContext(siteContext)

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

    return(
         <div className="filter" key={name}>
            {name === "Page : " ? <p className="filter-name">{name}{page}</p> : <p className="filter-name">{name}</p>}
            <div className="filter-values">
                {name === "Page : " ? 
                
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