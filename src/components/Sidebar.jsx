import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, ChefHat, Eye, DollarSign, Wallet, PlusCircle, FileText, ArrowDownCircleIcon, ArrowBigDown, ArrowDown, ArrowLeft, ArrowRightIcon, LayoutDashboard } from 'lucide-react';
import { FaDirections } from 'react-icons/fa';

const Sidebar = ({ toggle, setToggle }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLinkClick = () => {
    setToggle(false); // Ferme le sidebar après avoir cliqué
  };

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  }

  return (
    <div className={`fixed relative  bg-white h-[80vh] transition-all duration-300 ease-in-out ${toggle ? "w-60" : "w-0"} overflow-hidden`}>
      {/* attention ici plus de hidden md:block pour mobile */}
      <ul className="mt-10 space-y-4 ">
        
        {/* RECETTE */}
        <li>
          <li className=' mt-4 mb-4 flex hover:bg-blue-950 text-left items-center px-4 py-2 text-blue-500 font-bold hover:text-white mt-8'>
            <LayoutDashboard className='mr-3'/>
            <NavLink to="/Dashbord" onClick={handleToggle} className=" text-left">DashBord</NavLink>
          </li>
          <button onClick={() => handleToggle('recette')} className="flex relative text-blue-500 font-bold hover:text-white items-center w-full px-4 py-2 text-left hover:bg-blue-950">
            <ChefHat className="mr-3" /> Recette {openMenu==="recette"?<ArrowDown className='absolute right-[20px]' />:<ArrowRightIcon className='absolute right-[20px]' />}
          </button>
          <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${openMenu === 'recette' ? "max-h-40" : "max-h-0"}`}>
            <NavLink to="/ajouter_recette" onClick={handleLinkClick} className="md:pl-[70px] py-2 hover:bg-blue-950 hover:text-white">Ajoute Recette</NavLink>
            <NavLink to="/voir_recettes" onClick={handleLinkClick} className=" md:pl-[70px] py-2 hover:bg-blue-950 hover:text-white">Voir Recette</NavLink>
            <NavLink to="/revenue" onClick={handleLinkClick} className="md:pl-[70px] py-2 hover:bg-blue-950 hover:text-white">Revenue</NavLink>
          </div>
        </li>

        {/* DEPENSE */}
        <li>
          <button onClick={() => handleToggle('depense')} className="flex relative hover:bg-blue-950 items-center w-full px-4 py-2 text-left text-blue-500 font-bold hover:text-white">
            <DollarSign className="mr-3" /> Dépenses {openMenu==="depense"?<ArrowDown className='absolute right-[20px]' />:<ArrowRightIcon className='absolute right-[20px]' />}  
          </button>
          <div className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${openMenu === 'depense' ? "max-h-40" : "max-h-0"}`}>
            <NavLink to="/ajouter_depense" onClick={handleLinkClick} className="md:pl-[70px] py-2  hover:bg-blue-950 hover:text-white">Ajoute Dépense</NavLink>
            <NavLink to="/voir_depense" onClick={handleLinkClick} className="md:pl-[70px] py-2  hover:bg-blue-950 hover:text-white">Voir Dépense</NavLink>
          </div>
        </li>

        {/* LOGOUT */}
        <li className='absolute bottom-[40px] '>
          <button onClick={logout} className="flex items-center w-full font-bold px-4 py-2 text-left  hover:bg-blue-950 hover:text-white text-blue-500">
            <LogOut className="mr-3  hover:bg-blue-950 hover:text-white text-blue-500" /> Se deconnecter
          </button>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
