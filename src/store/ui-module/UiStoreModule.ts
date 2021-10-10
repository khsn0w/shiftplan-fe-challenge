import {ErrorWrapper} from "@/models/store/UiStoreModel";
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
// this module will globally manage global spinner and errors
@Module
class UiStoreModule extends VuexModule{
    // state
    public loading= true;
    public error: ErrorWrapper = {
        show: false,
        message: ''
    };

    @Mutation
    public showError(payload: ErrorWrapper): void{
        this.error = payload;
    }
    @Mutation
    public setLoadingStatus(loading: boolean): void{
        this.loading = loading;
    }

}

export default UiStoreModule;
