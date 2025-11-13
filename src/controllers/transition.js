import React from 'react'
import { motion } from "framer-motion";




export const Crs =({index,children})=> {
    //one by one coming Animation or Stagger effect 
    return(
        <motion.div
             key={index}
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: index * 0.4 }} // Stagger effect
           >
             {children}
                 </motion.div>
    )
}

const transition = ({ children }) => {
    
     
    return (
        <>
          
    <motion.div 
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
        duration: 0.4, ease: "easeInOut" 
        
    }}
    exit= {{
        opacity: 0, scale: 0.9,transition :{ duration: 0.3, ease: "easeInOut" }
    }}
    >
        {children}
    </motion.div>

    </>
)
 
}

export default transition;