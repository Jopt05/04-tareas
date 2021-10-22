const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

require("colors");

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) {
        // Retorna un arreglo de tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case "1":
                const desc = await leerInput("Descripción: ");
                tareas.crearTarea( desc );
                break;
        
            case "2":
                console.log( tareas.listadoCompleto() );
                break;

            case "3":
                console.log( tareas.listarPendientesCompletadas(true) );
                break;

            case "4":
                console.log( tareas.listarPendientesCompletadas(false) );
                break;

            case "5":
                const ids = await mostrarListadoChecklist( tareas.getListadoArr );
                tareas.toggleCompletadas(ids);
                break;

            case "6":
                const id = await listadoTareasBorrar( tareas.getListadoArr );
                if ( id !== "0" ) {
                    const ok = await confirmar("¿Estás seguro?");
                    ( ok ) ? tareas.borrarTarea(id) : '';
                    console.log("Hecho".green)
                }
                break;
        }

       guardarDB( tareas.getListadoArr ); 

        await pausa();
        
    } while( opt !== "0" );

}

main();