import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, LoadingController, App } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { Transfer } from '@ionic-native/transfer';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage, LoginPage,DocumentacaoHomePage, OperacaoPage, LsePage, AcompanhamentoPage, RelatorioPage, RelatorioDetalhesPage,
        SimuladorPage, SimuladorDetalhePage,GarantiaIncluirPage,GarantiaPage, AcompanhamentoDetalhesPage, SelecionarClientePage,
        PropostaPage, FiltroOperacaoPage, FiltroAcompanhamentoPage, DocumentacaoPage,
        AcompanhamentoDocumentoPage, DesempenhoPage, MensagemPage, MensagemDetalhePage, SelecionarClienteSimuladorPage, AcompanhamentoRegistrarPage } from './paginas';
import { Cabecalho, Menu, CpfCnpjPipe, Rodape, TelefonePipe, Documento, ImagemView } from './componentes';
import { MensagemServicoProvider } from '../providers/mensagem.servico';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MascaraDirective } from '../directives/mascara/mascara';
import { KeyboardAttachDirective } from '../directives/keyboard/keyboard-attach.directive';
import { OrderModule } from 'ngx-order-pipe';
import { httpFactory } from "../interceptor/http.factory";
import { Network } from '@ionic-native/network';
import { ConexaoServicoProvider } from '../providers/conexao.servico';
import { MicrocreditoErrorHandler } from '../componentes/microcreditoErrorHandler';
import { DocumentoServico } from '../providers/documento-servico/documento-servico';
import { Keyboard } from '@ionic-native/keyboard';
import { MaxLengthDirective } from '../directives/max-length/max-length';
import { PageGeneric } from '../pages/gerenic/pageGeneric';
import { ExpandableComponent } from '../components/expandable/expandable';
import { EstudoPage } from '../pages/estudo/estudo';
import { EstudoEnquadramento } from '../componentes/estudo/estudo-enquadramento';
import { EstudoDadosCliente } from '../componentes/estudo/estudo-dadosCliente';

@NgModule({
  declarations: [
    MyApp,
    Cabecalho,
    Menu,
    HomePage,
    LoginPage,
    OperacaoPage,
    LsePage,
    AcompanhamentoPage,
    RelatorioPage,
    RelatorioDetalhesPage,
    GarantiaPage,
    DocumentacaoHomePage,
    GarantiaIncluirPage,    
    SimuladorPage,
    SimuladorDetalhePage,
    SelecionarClienteSimuladorPage,
    AcompanhamentoDetalhesPage,
    SelecionarClientePage,
    PropostaPage,
    Documento,
    FiltroOperacaoPage,
    FiltroAcompanhamentoPage,
    AcompanhamentoDocumentoPage,
    MascaraDirective,
    KeyboardAttachDirective,
    CpfCnpjPipe,
    DesempenhoPage,
    Rodape,
    MensagemPage,
    MensagemDetalhePage,
    TelefonePipe,
    DocumentacaoPage,
    ImagemView,
    AcompanhamentoRegistrarPage,
    MaxLengthDirective,
    ExpandableComponent,
    EstudoPage,
    EstudoEnquadramento,
    EstudoDadosCliente,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    OrderModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top', backButtonText: ''}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    OperacaoPage,
    AcompanhamentoPage,
    LsePage,
    RelatorioPage,
    RelatorioDetalhesPage,
    GarantiaPage,
    GarantiaIncluirPage, 
    DocumentacaoHomePage,  
    SimuladorPage,
    SimuladorDetalhePage,
    SelecionarClienteSimuladorPage,
    AcompanhamentoDetalhesPage,
    AcompanhamentoDocumentoPage,
    SelecionarClientePage,
    PropostaPage,
    Documento,
    FiltroOperacaoPage,
    FiltroAcompanhamentoPage,
    DesempenhoPage,
    MensagemPage,
    MensagemDetalhePage,
    DocumentacaoPage,
    ImagemView,
    AcompanhamentoRegistrarPage,
    EstudoPage,
    EstudoEnquadramento,
    EstudoDadosCliente
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Transfer,
    MensagemServicoProvider,
    PhotoViewer,
    Network,
    Keyboard,
    {provide: ErrorHandler, useClass: MicrocreditoErrorHandler, deps: [App, MensagemServicoProvider]},
    {provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, LoadingController, ConexaoServicoProvider]},
    {provide: LOCALE_ID, useValue:'pt-BR'},
    {provide: LOCALE_ID, useValue: "pt-BR"},
    ConexaoServicoProvider,
    DocumentoServico,
    PageGeneric
  ]
})
export class AppModule {}
