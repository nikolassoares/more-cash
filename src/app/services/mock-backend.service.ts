// mock-backend.service.ts

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Data } from '../intefaces/data.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MockBackendService implements HttpInterceptor {

    private dataItems: Data[] = [];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.endsWith('/api/endpoint/read')) {
            return of(new HttpResponse({ status: 200, body: this.dataItems }));
        }

        if (req.url.endsWith('/api/endpoint/calculate')) {
            const data = req.body;

            const percentage = data.value * (data.fees / 100);
            data.id = uuidv4();
            data.value = parseFloat(data.value);
            data.total = parseFloat(data.value) + percentage;
            data.valueInstalment = (data.total / data.instalments);

            return of(new HttpResponse({ status: 200, body: data }));
        }

        if (req.url.endsWith('/api/endpoint/create')) {
            this.dataItems.push(req.body);
            return of(new HttpResponse({ status: 200, body: req.body }));
        }

        return next.handle(req);
    }
}
