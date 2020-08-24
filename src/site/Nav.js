import React from 'react'
import './Nav.css'
function Nav() {
    const [navClass,setNavClass]=React.useState("")
 let scrollPos = 0;
 let newScrollPos
// adding scroll event
// window.addEventListener('scroll', function() {
  
// 	// detects new state and compares it with the new one
//     if (document.body.getBoundingClientRect().top > scrollPos) 
//     {setNavClass('')}
// 	else {setNavClass('up');
// }
// scrollPos = document.body.getBoundingClientRect().top;
// console.log(scrollPos)
// });
let newValue
let oldValue
window.addEventListener('scroll', function(e){

    // Get the new Value
    newValue = window.pageYOffset;

    //Subtract the two and conclude
    if(oldValue - newValue < 0){
        setNavClass('up')
    } else if(oldValue - newValue > 0){
        setNavClass('')
    }

    // Update the old value
    oldValue = newValue;
});
    return (
        <nav className ={navClass}>
        <div className="img-holder">
<img src="images/boy.png" alt="boy logo"/>
        </div>
        <div className="nav-links">
            <a href="/"><span>H</span>ome</a>
            <a href="/projects.html"><span>P</span>rojects</a>
            <a href="/Stuff"><span>S</span>tuff</a>
        </div>
    </nav>
    )
}

export default Nav
