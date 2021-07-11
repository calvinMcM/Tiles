import * as React from "react"

export const Conditional: React.FC<{condition: boolean}> = props =>{
    if(props.condition){
        return <>{props.children}</>
    }
    return <React.Fragment/>
}