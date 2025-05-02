import { LogOut, LogOutIcon, LucideLogOut, MenuIcon } from 'lucide-react'

import { FaHamburger } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = ({username,toggle,SetToggle}) => {
const navigate = useNavigate()
  function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    navigate("/")
    
  }
  const maj = username ? username.charAt(0).toUpperCase() : "";

 const nom =username? username.toUpperCase():""

  return (
    <div className='flex z-20 justify-between items-center w-full px-[5%] py-3 border-b-2  '>
       <div className='flex items-center gap-5'>
       <MenuIcon onClick={() => SetToggle(!toggle)} className="cursor-pointer" size={40} />
  <span className='font-bold md:text-xl text-base'>Noumi-<span className='text-blue-500'>Tech</span></span>
  
</div>
        <ul className='max-md:hidden items-center justify-center gap-5 flex '>
          <div>

          </div>
            <li className='flex items-center justify-center gap-4'>{
               
            } 
            
              <div>Salut <span className='ml-2 font-bold'>{nom}</span> </div>  !</li>

           
            
        </ul>

        
        <li className=' items-center justify-center gap-4 max-md:flex hidden '>{
                 
            } 
            
              <div> salut <span className='font-bold'>{nom}</span> </div>  !</li>
    </div>
  )
}

export default Navbar