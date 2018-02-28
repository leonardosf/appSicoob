import { Component, Input } from '@angular/core';
import { Imagem } from '../../model/Imagem';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ModalController, Platform, Events, ActionSheetController } from 'ionic-angular';
import { ImagemView } from './imagemview';
import {ParamPath, Paths} from '../../app/paths';
import { Http } from '@angular/http';
import { MensagemServicoProvider } from '../../providers/mensagem.servico';
import { DocumentoServico } from '../../providers/documento-servico/documento-servico';

@Component({
    selector: 'documento',
    templateUrl: 'documento.html',
})

export class Documento {
    @Input()
    private documentos:Array<Imagem>;

    private readonly maxImagens:number = 6;
    private quality:number;
    private modal:any;
    private sourceTypeImage:any;

    constructor(private camera: Camera, private photo:PhotoViewer, public modalCtrl: ModalController,
        private http: Http,  private mensagem: MensagemServicoProvider, private plt: Platform, private events: Events,
        private documentoServico:DocumentoServico, public actionSheetCtrl: ActionSheetController){

       if(this.plt.is('ios')){
            this.quality = 45;
        }else{
            this.quality = 70;
        }
    }


    private configurarImagem(imagem:Imagem){
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Adicionar Imagem',
            buttons: [
              {
                text: 'Tirar Foto',                
                handler: () => {                
                  this.sourceTypeImage = this.camera.PictureSourceType.CAMERA;
                  console.log("tirar foto");
                  var options: CameraOptions = {
                    quality: this.quality,
                    targetWidth: 1024,
                    destinationType: this.camera.DestinationType.FILE_URI,
                    encodingType: this.camera.EncodingType.JPEG,
                    mediaType: this.camera.MediaType.PICTURE,
                    cameraDirection: this.camera.Direction.BACK,
                    correctOrientation: true,
                    sourceType: this.sourceTypeImage
                }
        
                this.camera.getPicture(options).then((imagemURL) => {
                    imagem.novaImagem(true);
                    let criarNovo = !imagem.caminho;
        
                    imagem.caminho = imagemURL;
                    if(criarNovo){
                        this.novaImagem();
                    }
        
                    imagem.source = null;
        
                    this.fecharImageView();
                });
                }
              },{
                text: 'Buscar na Galeria',
                handler: () => {
                  this.sourceTypeImage = this.camera.PictureSourceType.PHOTOLIBRARY;
                  var options: CameraOptions = {
                    quality: this.quality,
                    targetWidth: 1024,
                    destinationType: this.camera.DestinationType.FILE_URI,
                    encodingType: this.camera.EncodingType.JPEG,
                    mediaType: this.camera.MediaType.PICTURE,
                    cameraDirection: this.camera.Direction.BACK,
                    correctOrientation: true,
                    sourceType: this.sourceTypeImage
                }
        
                this.camera.getPicture(options).then((imagemURL) => {
                    imagem.novaImagem(true);
                    let criarNovo = !imagem.caminho;
        
                    imagem.caminho = imagemURL;
                    if(criarNovo){
                        this.novaImagem();
                    }
        
                    imagem.source = null;
        
                    this.fecharImageView();
                });
                }
              },{
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          actionSheet.present();
    }
    

    public abrirCamera(imagem:Imagem){
        this.configurarImagem(imagem);
      
    }


    private novaImagem(){
        if(this.documentos.length >= this.maxImagens){
            return;
        }

        let ultimaImagem:Imagem = this.documentos[this.documentos.length-1];
        if(ultimaImagem.caminho == null){
            return;
        }

        this.documentos.push(Imagem.getNovaImagem());
    }

    public abrirImagem(imagem:Imagem, index:number){
        this.desregistrarEventos();
        this.registrarEventos();

        this.documentoServico.carregar(imagem);

        this.modal = this.modalCtrl.create(ImagemView, { imagem: imagem, index: index }, {cssClass: 'modal-imagem'});
        this.modal.present();
    }

    public removerImagem(index:number){
        let imagem:Imagem = this.documentos[index];

        if(imagem.idImagem == null){
            this.documentos.splice(index, 1);
            this.novaImagem();
            this.fecharImageView();
            return;
        }

        let param:ParamPath = ParamPath.parametro('idImagem', imagem.idImagem.toString());
        this.http.delete(Paths.getURL(Paths.IMAGENS, param)).map(res => res.json()).subscribe(
            (dados) => {
                this.documentos.splice(index, 1);
                this.novaImagem();
                this.fecharImageView();
            },
            (error) => {
                this.mensagem.mensagemAlerta('Atenção', 'A imagem não pode ser excluida!');
            }
        );
    }

    private desregistrarEventos(){
        this.events.unsubscribe('alterarImagem');
        this.events.unsubscribe('excluirImagem');
    }

    private fecharImageView(){
        if(this.modal != null){
            this.desregistrarEventos();
            this.modal.dismiss();
        }
    }

    private registrarEventos(){
        this.events.subscribe('excluirImagem', (index) => {
            this.removerImagem(index);
        });
        this.events.subscribe('alterarImagem', (imagem) => {
            this.abrirCamera(imagem);
        });
    }
}
