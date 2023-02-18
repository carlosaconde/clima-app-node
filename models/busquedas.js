import fs from'fs';

import axios from 'axios';


class Busquedas {

    historial = [];

    dbPath = './db/database.json';

    constructor() {

        this.leerDB();
        //TODO leer DB si existe

    }

    get historialCapitalizado() {

        return this.historial.map(lugar=>{

            let palabras = lugar.split(' ');
            palabras = palabras.map(p=>p[0].toUpperCase()+p.substring(1));

            return palabras.join(' ');
        });
    }

    async ciudad ( lugar = ''){
        try {
             //peticion http

        const instance = axios.create({
            baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: {
                'access_token' : process.env.MAPBOX_KEY,
                'limit': 5,
                'language': 'es'
           
            
            }
        });

        const resp = await instance.get();
        
        // console.log(resp.data.features);
        return resp.data.features.map(lugar =>({
                id: lugar.id,
            nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
        }));
   
         // retornar los lugars
        } catch (error) {
            return [];
        }
        
    }

        async climaLugar(lat,lon){

            try {
                const instance = axios.create({
                    baseURL: `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&`,    
                    params: {
                        lat,
                        lon,
                        appid: process.env.OPENWHEATHER_KEY,
                        units: 'metric',
                        lang:'es'
                      }
                      
                })

                const res = await instance.get();
                const{weather,main} = res.data;

            
                return  {
                    desc: weather[0].description,
                    min: main.temp_min,
                    max: main.temp_max,
                    temp: main.temp
                }



            } catch (error) {
                return [];
            }

        }

        agregarHistorial( lugar='') {
            if( this.historial.includes( lugar.toLocaleLowerCase())) {
                return;
            }
            //prevenir duplicado

            this.historial.unshift(lugar);
            //grabar en DB

            this.guardarDB();

        }

        guardarDB(){

            const payload={
                historial: this.historial
            };

            fs.writeFileSync(this.dbPath, JSON.stringify(payload));
        }

        leerDB(){
            if(fs.existsSync(this.dbPath))return;

            const info = fs.readFileSync( this.dbPath, {encoding: 'utf-8'});
            const data = JSON.parse(info);

            this.historial=data.historial;
            //debe de existir...
            //const info readfile

        }

}



export {
    Busquedas
}