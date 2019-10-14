import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
    providedIn: 'root'
})
export class HttpRequestHandlerService {

    constructor(private httpClient: HttpClient,
                private cookieService: CookieService) { }

    private handleError<T>() {
        return (error: HttpErrorResponse): Observable<T> => {
            throw error;
        };
    }

    public delete<T>(url: string, parameters?: HttpParams): Observable<HttpResponse<T>> {
        return  this.httpClient.delete<T>(url,
            { observe: 'response', params: parameters, headers: this.getHttpOptions() }).pipe(
                catchError(this.handleError<T>())) as Observable<HttpResponse<T>>;
    }

    public get<T>(url: string, parameters?: HttpParams): Observable<HttpResponse<T>> {
        return  this.httpClient.get<T>(url, { observe: 'response', params: parameters, headers: this.getHttpOptions() }).pipe(
            catchError(this.handleError<T>())
        ) as Observable<HttpResponse<T>>;
    }

    public getItem<T>(url: string, id: number | string, path?: string): Observable<HttpResponse<T>> {
        const apiUrl: string = path ? `${url}${id}/${path}` : `${url}${id}/`;
        return  this.httpClient.get<T>(apiUrl, { observe: 'response', headers: this.getHttpOptions() }).pipe(
            catchError(this.handleError<T>())
        ) as Observable<HttpResponse<T>>;
    }

    public post<Tin, Tout>(url: string, data: Tin, parameters?: HttpParams, headers?: HttpHeaders): Observable<HttpResponse<Tout>> {
        return  this.httpClient.post<Tout>(url, data, { observe: 'response', params: parameters, headers: this.getHttpOptions(headers) })
            .pipe(catchError(this.handleError<Tout>())) as Observable<HttpResponse<Tout>>;
    }

    public put<Tin, Tout>(url: string, data: Tin, parameters?: HttpParams, headers?: HttpHeaders): Observable<HttpResponse<Tout>> {
        return  this.httpClient.put<Tout>(url, data, { observe: 'response', params: parameters, headers: this.getHttpOptions(headers) })
            .pipe(catchError(this.handleError<Tout>())) as Observable<HttpResponse<Tout>>;
    }

    public putItem<Tin, Tout>(url: string, id: number | string, data: Tin, parameters?: HttpParams, headers?: HttpHeaders)
        : Observable<HttpResponse<Tout>> {
        const apiUrl = `${url}${id}/`;
        return  this.httpClient.put<Tout>(apiUrl, data, { observe: 'response', params: parameters, headers: this.getHttpOptions(headers) })
            .pipe(catchError(this.handleError<Tout>())) as Observable<HttpResponse<Tout>>;
    }

    private getHttpOptions(headers?: HttpHeaders) {
        let csrf = this.cookieService.get('csrftoken');
        if (typeof(csrf) === 'undefined') {
            csrf = '';
        }
        if (headers) {
            headers.append('X-CSRFToken', csrf);
            return headers;
        } else {
            return new HttpHeaders({
                    'content-Type': 'application/json',
                    'X-CSRFToken': csrf
            });
        }
    }
}
