import { HttpInterceptor } from "./http.interceptor";
export function httpFactory(xhrBackend, requestOptions, loadingController, conexaoServicoProvider) {
    return new HttpInterceptor(xhrBackend, requestOptions, loadingController, conexaoServicoProvider);
}
//# sourceMappingURL=http.factory.js.map