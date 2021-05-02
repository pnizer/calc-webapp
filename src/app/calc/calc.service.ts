import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const calcServiceUrl = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  constructor(private http: HttpClient) {
  }

  getASum(x: number, y: number): Observable<number> {
    return this.http.post<GetASumResponse>(
      `${calcServiceUrl}/sum`, <GetASumRequest>{
        x, y
      }).pipe(map(response => response.result))
  }

  getAProduct(a: number): Observable<number> {
    return this.http.post<GetAProductResponse>(
      `${calcServiceUrl}/product`, <GetAProductRequest>{
        a
      }).pipe(map(response => response.result))
  }

  getAPower(s: number): Observable<number> {
    return this.http.post<GetAPowerResponse>(
      `${calcServiceUrl}/power`, <GetAPowerRequest>{
        s
      }).pipe(map(response => response.result))
  }
}

interface GetASumRequest {
  x: number
  y: number
}

interface GetASumResponse {
  result: number
}

interface GetAProductRequest {
  a: number
}

interface GetAProductResponse {
  result: number
}

interface GetAPowerRequest {
  s: number
}

interface GetAPowerResponse {
  result: number
}
