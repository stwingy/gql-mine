import React from 'react'
import './Home.css'
import TitleSpinner from './TitleSpinner'
function Home() {
//   let spinVar = true
//     const mq = window.matchMedia('(max-width: 520px)');
//     let myT;
//    let myArray =[]
//     function clearAll(){
//         for(let i=0;i<myArray.length;i++){
//             clearInterval(myArray[i])
           
//         }
//     }
// function startInterval() {
   
// 	myT = setInterval(() => {
//         clearAll()
//         myArray =myArray.slice()
//         myArray.push(myT)
//        if(spinVar !==null){
           
//            spinVar =!spinVar

//        }
//      console.log(myArray)
// 	}, 10000);
// }
// function WidthChange(mq) {
// 	if (mq.matches) {
// 		spinVar = null
// 		clearAll()
// 	} else {
// 		startInterval();
// 	}
// }

// if (matchMedia) {
// 	const mq = window.matchMedia('(max-width: 520px)');
// 	mq.addListener(WidthChange);
// 	WidthChange(mq);
// }

// if(!myT)startInterval()
    return (
        <div>
        <TitleSpinner  />
    <div className="background-holder"></div>
    <div className="hello">
        <div className="little-boy">
            <img src="/images/boy.png" alt="boy logo"/>
        </div>
            <p className="p-hello">Hello.</p>
            <div className ="hello-p"><p>I'm a web designer / developer based in Toronto, Canada. I have a passion for web design and love to create for web and mobile devices.</p></div>
        
    </div>
    <h2 className = "what-do" >What I can do.</h2>
<div className="develope">
    <div className = 'dev-img'><img src="/images/boy.png" alt=""/></div>
   
    <div className = 'dev-img1'><img src="/images/smartphone.png" alt=""/></div>
    <div className ='dev'>
        <h3>Develop what you need.</h3>
        <p>I'm a developer, so I know how to create your
        website to run across devices using the latest
         technologies available.
       </p>
   </div>
</div>
<div className="design">
    <div className = 'des'>
        <h3>Designed how you want.</h3>
        <p>I like to keep it simple. My goals are to 
        focus on typography, content and conveying
         the message that you want to send.
        </p>
    </div>
    <div className = 'des-img1'><img src="/images/devices.png" alt=""/></div>
   
    <div className = 'des-img'><img src="/images/boy.png" alt=""/></div>
</div>

<h2>I will help.</h2>
<div className = "available"><p>Currently available for freelance work.</p></div>
<div className = "available1"><p>If you have a project that you want to get started, think you need my help with something or just fancy saying hey, then get in touch.</p></div>
<button className= "contactBtn">Contact Me</button>  
        </div>
    )
}

export default Home
