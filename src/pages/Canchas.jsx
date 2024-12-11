import React from 'react'

import Libre from '../components/Libre'
import Ocupado from '../components/Ocupado'

function Canchas() {
  return (
        

        <div id="detailed-pricing" className="w-full overflow-x-auto ">
            <div className="overflow-hidden min-w-max">
                <div className="grid grid-cols-10 px-0.5 py-4 text-lg font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200  dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <div className="flex items-center w-16">Horarios</div>
                    <div className="columna" >12-13</div>
                    <div className="w-12"  >13-14</div>
                    <div className="w-16"  >14-15</div>
                    <div className="w-16"  >15-16</div>
                    <div className="w-16"  >16-17</div>
                    <div className="w-16"  >17-18</div>
                    <div className="w-16"  >18-19</div>
                    <div className="w-16"  >19-20</div>
                    <div className="w-16"  >20-21</div>                   
                </div>

                <div className="grid grid-cols-10 px-2 py-5 text-lg text-gray-700 border-b border-gray-200 gap-x-4 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-gray-400 ">
                    Cancha 1
                    {/* (<a href="#" class="text-blue-600 hover:underline">view all</a>) */}
                    </div>
                        <Libre />
                        <Libre />
                        <Libre />
                        <Ocupado />  
                        <Ocupado />   
                        <Libre />   
                        <Libre />   
                        <Ocupado />  
                        <Libre />  
                </div>

                <div className="grid grid-cols-10 px-2 py-5 text-lg text-gray-700 border-b border-gray-200 gap-x-4 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-gray-400 ">
                    Cancha 2
                    {/* (<a href="#" class="text-blue-600 hover:underline">view all</a>) */}
                    </div>
                        <Libre />
                        <Libre />
                        <Libre />
                        <Ocupado />  
                        <Ocupado />   
                        <Libre />   
                        <Libre />  
                        <Ocupado />  
                        <Ocupado />    
                </div>

                <div className="grid grid-cols-10 px-2 py-5 text-lg text-gray-700 border-b border-gray-200 gap-x-4 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-gray-400 ">
                    Cancha 3
                    {/* (<a href="#" class="text-blue-600 hover:underline">view all</a>) */}
                    </div>
                        <Libre />
                        <Libre />
                        <Libre />
                        <Ocupado />  
                        <Ocupado />   
                        <Libre />   
                        <Libre />   
                        <Ocupado />  
                        <Libre />  
                </div>

                <div className="grid grid-cols-10 px-2 py-5 text-lg text-gray-700 border-b border-gray-200 gap-x-4 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-gray-400 ">
                    Cancha 4
                    {/* (<a href="#" class="text-blue-600 hover:underline">view all</a>) */}
                    </div>
                        <Libre />
                        <Libre />
                        <Libre />
                        <Ocupado />  
                        <Ocupado />   
                        <Libre />   
                        <Libre />   
                        <Ocupado />  
                        <Libre />  
                </div>

                <div className="grid grid-cols-10 px-2 py-5 text-lg text-gray-700 border-b border-gray-200 gap-x-4 dark:border-gray-700">
                    <div className="text-gray-500 dark:text-gray-400 ">
                    Cancha 5
                    {/* (<a href="#" class="text-blue-600 hover:underline">view all</a>) */}
                    </div>
                        <Libre />
                        <Libre />
                        <Libre />
                        <Ocupado />  
                        <Ocupado />   
                        <Libre />   
                        <Libre />   
                        <Ocupado />  
                        <Libre />  
                </div>






               

               

            </div>
        </div>

  )
}

export default Canchas
