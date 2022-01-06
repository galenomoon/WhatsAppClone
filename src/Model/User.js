//======== MODEL | MANIPULAÇÃO, CONSULTA, ARMAZENAMENTO, ALTERAÇÃO DOS DADOS =================

import { Firebase } from "./../util/Firebase";
import { Model } from "./Model";

export class User extends Model {

    constructor(id) { //3) Recebendo como ID o EMAIL

        super(); //4) Chamaremos o Super dessa classe, sua extensão, a classe Model em Model.js

        if (id) this.getById(id) //9) Se algo foi passado no ID, então execute getById()
    }

    get name() { return this._data.name }
    set name(value) { this._data.name = value }

    get email() { return this._data.email }
    set email(value) { this._data.email = value }

    get photo() { return this._data.photo }
    set photo(value) { this._data.photo = value }

    get chatId() { return this._data.chatId }
    set chatId(value) { this._data.chatId = value }

    getById(id) { //10) Recebe ID email

        return new Promise((s, f) => {

            console.log("getById:" + id)

            //11) Chama o findByEmail(id = {email}) 
            User.findByEmail(id).onSnapshot(doc => {
                // 13) Pegue o documento dessa coleção, e caso consiga
                this.fromJSON(doc.data()) //Pegue os dados recebidos do firebase e passe-os pelo método fromJSON
                s(doc)


            })
        })
    }

    save() {

        // console.log(User.findByEmail(this.email).set(this.toJSON()))
        return User.findByEmail(this.email).set(this.toJSON())


    }

    static getRef() { //Cria a Coleção /users

        //PASTA "RAÍZ" USERS | Todos os documentos e dados relacionados aos usuários
        return Firebase.db().collection('/users')

    }

    //Puxar contato pela referencia id
    static getContactsRef(id) {

        //retorna o metodo getRef
        return User.getRef()
            .doc(id)
            .collection('/contacts');
    }

    static findByEmail(email) {

        console.log("findByEmail:" + email)

        // @/users/doc
        return User.getRef().doc(email) //12)Documento específico dentro da minha coleção User (Documento esse representado cada um por um email logado, cada email é um documento)
            //Cria um documento baseado no email do usuário logado

    }

    addContact(contact) {

        return User.getContactsRef(this.email)
            .doc(btoa(contact.email))
            .set(contact.toJSON())
    }

    getContacts(filter = '') {

        return new Promise((s, f) => {

            User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs => {

                let contacts = [];

                docs.forEach(doc => {

                    let data = doc.data()
                    data.id = doc.id
                    contacts.push(data)
                })

                this.trigger('contactschange', docs)

                s(contacts)
            })
        })
    }
}