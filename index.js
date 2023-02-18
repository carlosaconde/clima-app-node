import * as dotenv from 'dotenv';
dotenv.config()



import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";


// console.log(process.env.MAPBOX_KEY);
const main = async ( ) => {

    const busquedas = new Busquedas();

    let opt;

        do{

            opt = await inquirerMenu();

                switch (opt) {
                    case 1:
                        //mostrar mensaje
                        const terminoDeBusqueda = await leerInput('Ciudad: ');
                       //buscar los lugar
                        const lugares=await busquedas.ciudad(terminoDeBusqueda);
                        //seleccionar el lugar
                        const idSelect = await listarLugares(lugares);
                        if(idSelect ==='0') continue;
                        //guardar en DB
                        


                        const lugarSel = lugares.find(l => l.id === idSelect);
                        
                        
                        busquedas.agregarHistorial(lugarSel.nombre)
                        
                        
                        const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                        


                        

                        // clima del lugar

                        // mostrar resultados

                        console.log('clima de la ciudad \n'.bgGreen);
                        console.log('Ciudad:', lugarSel.nombre );
                        console.log('Lat:', lugarSel.lat );
                        console.log('long', lugarSel.lng);
                        console.log('temp', clima.temp);
                        console.log('temp max',clima.max );
                        console.log('temp min', clima.min);
                        console.log('como esta el clima:', clima.desc );
                        break;
                    case 2:
                        busquedas.historialCapitalizado.forEach((lugar,i)=>{
                            const idx = `${i+1}.`.green
                            console.log(`${idx} ${lugar}`);
                        })
                        break;
                        
                    case 0:
                        
                        break;
                    default:
                        break;
                }

            console.log({opt});

            if ( opt!== 0) await pausa();
        } while (opt!==0)
    
}

main();