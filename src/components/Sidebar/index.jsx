import React from "react";
import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import LogoS from '../../assets/images/logo-s.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const Sidebar = () => {
  return (  
<>
   <div className='nav-bar'>
     <Link className='logo' to='/'>
       <img src={LogoS} alt="logo" />   
       
     </Link>
     <nav>
       <NavLink exact='true' activeclassname='active' to='/'>
         <FontAwesomeIcon icon ={faHome} color ='#4d4d4e'/>
       </NavLink>
       <NavLink exact='true' activeclassname='active' className='about-link' to='/about'>
         <FontAwesomeIcon icon ={faUser} color ='#4d4d4e'/>
       </NavLink>
       <NavLink exact='true' activeclassname='active' className='contact-link' to='/contact'>
         <FontAwesomeIcon icon ={faEnvelope} color ='#4d4d4e'/>
       </NavLink>
     </nav>
     <ul>
       <li>
         <a target ='_blank' rel='noreferrer' href ='https://www.linkedin.com/rsalinaszambrano'>
           <FontAwesomeIcon icon={faLinkedin}/>
           </a>
       </li>
       <li>
          <a
            href="https://github.com/ricardo-javier"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li>
          <a
            href="http://www.instagram.com/ricardo.javier"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram}/>
          </a>
        </li>
        <li>
          <a href="https://wa.me/13052162077" rel="noreferrer" target="_blank">
            <FontAwesomeIcon icon={faWhatsapp}/>
          </a>
        </li>
     </ul>
   </div>
</>

  );
}
 
export default Sidebar;