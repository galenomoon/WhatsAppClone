// ========== CONEXÃO FIREBASE [VERSÃO 4.13.0] =========== 

const firebase = require('firebase')
require('firebase/firestore')

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyCVvEeowOhCP12js2zNqlI2mkzmdiL0Cbg",
            authDomain: "whatsappcloneclear.firebaseapp.com",
            projectId: "whatsappcloneclear",
            storageBucket: "gs://whatsappcloneclear.appspot.com",
            messagingSenderId: "337400933991",
            appId: "1:337400933991:web:6785c1e1f956cd92d1eec2",
            measurementId: "G-K5B58D3Q0G"
        }

        this.init()
    }

    init() {

        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config);

            firebase.firestore().settings({ //Evita conflitos Firebase
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }
    }

    static db() { //Banco de Dados - Firestore

        return firebase.firestore()

    }

    static hd() { //hd do firestorage

        return firebase.storage()
    }

    initAuth() { //Autenticação de Login pelo Google, Facebook e afins

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider(); //LOGIN COM O GOOGLE

            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken;
                let user = result.user
                    //TOKEN | Camada protetora contra a possibilidade de burlar uma conta, o token é um código enorme, e aqui estamos verificando esse token 
                s({ user, token })

            }).catch(err => {
                f(err)
            })
        })
    }
}