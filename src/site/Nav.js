import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
function Nav() {
	const [ navClass, setNavClass ] = React.useState('');
	let scrollPos = 0;
	let newScrollPos;
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
	let newValue;
	let oldValue;
	window.addEventListener('scroll', function(e) {
		// Get the new Value
		newValue = window.pageYOffset;

		//Subtract the two and conclude
		if (oldValue - newValue < 0) {
			setNavClass('up');
		} else if (oldValue - newValue > 0) {
			setNavClass('');
		}

		// Update the old value
		oldValue = newValue;
	});
	return (
		<nav className={navClass}>
			<div className="img-holder">
				<img src="images/boy.png" alt="boy logo" />
			</div>
			<div className="nav-links">
				<Link to="/">
					<span>H</span>ome
				</Link>
				<Link to="/post">
					<span>P</span>ost
				</Link>
				<Link to="/posts">
					<span>P</span>osts
				</Link>
				<Link to="/sign">
					<span>S</span>ignup
				</Link>

				<Link to="/protected">
					<span>P</span>rotectd
				</Link>
			</div>
		</nav>
	);
}

export default Nav;
