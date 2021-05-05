import {Observable, of} from 'rxjs';

export abstract class AbstractMockObservableService {
    protected _observable: Observable<any>;
    protected _fakeContent: any;
    protected _fakeError: any;

    set error(err) {
        this._fakeError = err;
    }

    set content(data) {
        this._fakeContent = data;
    }

    get subscription(): Observable<any> {
        return this._observable;
    }

    subscribe(next: Function, error?: Function, complete?: Function): Observable<any> {
        this._observable = new Observable();

        if (next && this._fakeContent && !this._fakeError) {
            next(this._fakeContent);
        }
        if (error && this._fakeError) {
            error(this._fakeError);
        }
        if (complete) {
            complete();
        }
        return this._observable;
    }
}
