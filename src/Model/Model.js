import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent {

    constructor() { //5) Executará após o SUPER da classe User o construtor de Model

        super(); //6) Chamaremos o Super dessa classe, sua extensão, a classe ClassEvent em ClassEvent.js
        this._data = {}; //8) Cria-se a variavel data
    }

    fromJSON(json) {
        this._data = Object.assign(this._data, json) //14) passe o json e junto com o que já existir no meu objeto e guarde dentro de data
        this.trigger('datachange', this.toJSON()) //15) E avise a quem quiser ouvir que hà novos dados aqui
            //Quem está ouvindo?:  WHATSAPPCONTROLLER.js:29| this._user.on("datachange", data => { 
    }

    toJSON() {
        return this._data
    }
}