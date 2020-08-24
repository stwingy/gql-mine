import React from 'react'
import useInterval from './useInterval'

function TitleSpinner() {
 
   const [spinLeft,setSpinLeft] = React.useState(true)
   useInterval(spinF,30000)
  let seeSpinners=true
    function spinF (){
        setSpinLeft(!spinLeft)
    }
   

    
    return (
        <div className="title-holder">
        <p><span>I`m John,</span></p>
        <p>a web developer.</p>
    { seeSpinners &&<><div className ={ `react-img-left ${spinLeft && "spin"}`}><img src="/images/logo192.png" alt=""/></div>
     <div className ={ `react-img-right ${!spinLeft && "spin"}`}><img src="/images/logo192.png" alt=""/></div></>}
    </div>
    )
}

export default TitleSpinner
