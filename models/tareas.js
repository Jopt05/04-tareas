const Tarea = require("./tarea");

// _listado:
//     { "uuid-1232-1231: { id:12, desc: asd, completadoEn: 123123 }" }

class Tareas {

    _listado = {};

    get getListadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( (key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        } )

    }

    crearTarea( desc = "" ) {
        
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        this.getListadoArr.forEach( (tarea, i) => {

            const idx = `${ i + 1 }`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? "Completado".green
                            : "Pendiente".red;
            console.log(`${ idx } ${ desc } :: ${estado}`);
            
        } )

    };

    listarPendientesCompletadas( completadas = true ) {

        let contador = 0;
        this.getListadoArr.forEach( (tarea, i) => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? "Completado".green
                            : "Pendiente".red;
            if ( completadas ) {
                if ( completadoEn ) {
                    console.log(`${ contador.toString().green } ${ desc } :: ${estado} ${ completadoEn.green }`);
                }
            } else {
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ contador.toString().green } ${ desc } :: ${estado}`);
                }
            }
            
        } )

    }

    toggleCompletadas( ids = [] ) {
        
        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        } );

        this.getListadoArr.forEach( tarea => {

            if ( ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        } )

    };

}

module.exports = Tareas;