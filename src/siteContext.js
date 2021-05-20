import React from "react"
import { useState } from "react/cjs/react.development";

const siteContext  = React.createContext("");

function SiteContextProvider({children}){

    const [page,setPage] = useState(1)

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

    return(
    <siteContext.Provider value={{page,goToPreviousPage,goToNextPage}}>
        {children}
    </siteContext.Provider>)

}

export {SiteContextProvider,siteContext}