import React from 'react'
import { ClipLoader } from 'react-spinners'

const override ={
    display:"block", 
    borderColor:"white" 

}

const SmallSpinner = () => {
  
  return (
    <div>
        <ClipLoader
         cssOverride={override}
        size={30}
        aria-label='Loader Spinner'
        data-testid="Loader" />
    </div>
  )
}

export default SmallSpinner