
import inquirer from 'inquirer';
import 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué Desea Hacer?',
        choices: [
            {
                value: 1,
                name: `${'1'.cyan}. buscar ciudad `
            },
            {
                value: 2,
                name: `${'2'.cyan}. historial`
            },
            
            {
                value: 0,
                name: `${'0'.cyan}. salir`
            },
            
            
        ]
    }
]

const inquirerMenu = async() =>{

    console.clear();
            console.log('======================'.green);
            console.log(' Seleccione Una Opcion '.white);
            console.log('======================\n'.green);
            const {opcion} = await inquirer.prompt(preguntas);

            return opcion;
        }

        const listarLugares = async ( lugares =[] ) => {

            const choices = lugares.map ((lugar,i) => {

                const idx = `${i+1}.`.green;

                return {
                    value: lugar.id,
                    name: `${idx} ${lugar.nombre}`
                }
            });

            choices.unshift({
                value: '0',
                name: '0.'.green + 'cancelar'
            });

            const preguntas = [
                {
                    type: 'list',
                    name: 'id',
                    message: 'seleccione lugar:',
                    choices
                }
            ]

            const { id } = await inquirer.prompt(preguntas);
            return id;

        }







        const pausa = async() => {
            const question = [
                {
                    type: 'input',
                    name: 'enter',
                    message: ` Presione ${ ' enter'.green} para continuar`
                }
            ];
                console.log('\n');
                await inquirer.prompt(question);
        }

        const leerInput = async(message) =>{
            const question = [
            {
                type: 'input',
                name: 'desc',
                message,
                validate(value){
                    if( value.length === 0 ){
                        return 'por favor ingrese un valor'
                    }
                    return true;
                }

            }
        ];

            const {desc} = await inquirer.prompt(question);
            return desc;
        }




export  {

    inquirerMenu,
    pausa,
    leerInput,
    listarLugares
};

