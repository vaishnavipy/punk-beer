import React from "react"
import { useState } from "react/cjs/react.development";

const siteContext  = React.createContext("");

function SiteContextProvider({children}){

    const [page,setPage] = useState(1);

    const [filter,setFilter] = useState({ABV:"All",hops:"All"});

    function goToNextPage(){
        setPage(prevPage => prevPage+1)
    }

    function goToPreviousPage(){
        setPage(prevPage => {
            if(prevPage>1){
                return prevPage-1
            }else{
                return prevPage
            }
        })
    }

    function filterBeer(fname,value){
        setFilter(prevState => ({...prevState,[fname] :value } ) )
    }

    return(
    <siteContext.Provider value={{page,goToPreviousPage,goToNextPage,filterBeer,filter}}>
        {children}
    </siteContext.Provider>)

}

export {SiteContextProvider,siteContext}