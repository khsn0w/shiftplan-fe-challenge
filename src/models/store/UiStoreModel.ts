export class UiStoreModel {
    loading: boolean;
    error: ErrorWrapper;
}

export class ErrorWrapper {
    show: boolean;
    message?: string;
}
