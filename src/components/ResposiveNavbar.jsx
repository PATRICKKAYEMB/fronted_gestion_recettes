import React from 'react'

const ResposiveNavbar = () => {
  return (
    <>
     <div className='flex justify-between items-center w-full px-[5%] py-3 border-b-2 '>
        <div>Noumipri</div>
        <ul className='flex items-center justify-center gap-5'>
            <li>👋 Salut, {username} !</li>

            <li className='text-blue-600 text-xl font-semibold'>
                <NavLink to="/ajouter_recette">
                  ajouter recette
                </NavLink>
            </li>

            
                <li className='text-blue-600 text-xl font-semibold'>
                     <NavLink to="/voir_recettes">voir recette </NavLink>
                </li>
                <li className='text-blue-600 text-xl font-semibold'>
                     <NavLink to="/revenue">revenue </NavLink>
                </li>
            <div className='flex items-center justify-center gap-4'> 
                  <li className='text-blue-600 text-xl font-semibold cursor-pointer'  onClick={logout}>logout</li>
                  <LogOut/>
                  <LogOutIcon/>
                  <LucideLogOut/>
            </div>
            
        </ul>
    </div>
    </>
  )
}

export default ResposiveNavbar