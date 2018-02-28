import { Component } from '@angular/core';
import { NavParams, LoadingController, Events } from 'ionic-angular';
import { Imagem } from '../../model/Imagem';
import { ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'imagemview.html',
})

export class ImagemView {
    private imagem:Imagem;
    private timestamp:number;
    private loading;
    private index:number;

    constructor(private params: NavParams, private viewCtrl: ViewController, private loadingCtrl: LoadingController, private events: Events){
        this.loading = this.loadingCtrl.create();
        this.loading.present();

        this.timestamp = new Date().getTime();

        this.imagem = this.params.get('imagem');
        this.index = this.params.get('index');
    }

    public removerImagem(){
        this.events.publish('excluirImagem', this.index);
    }

    public abrirCamera(){
        this.events.publish('alterarImagem', this.imagem);
    }

    public fechar(){
        this.viewCtrl.dismiss();
    }

    public carregada(){
        if(this.loading != null){
            this.loading.dismiss();
        }
    }
}