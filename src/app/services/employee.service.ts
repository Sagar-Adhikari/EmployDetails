import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders, } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(name: string, salary: string, age: string): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = environment.api + 'create';
    return this.http.post(url, { name, salary, age }, { headers: header })
      .pipe(
        catchError(this.handleError))

  }
  public getEmployee(id: string): Observable<any> {
    const url = environment.api + `employee/${id}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getEmployeeList(): Observable<any> {
    const url = environment.api + `employees`;
    return this.http.get(url, {}).pipe(catchError(this.handleError));
  }
  public editEmployee(id: string, name: string, salary: number, age: number): Observable<any> {
    const header = new HttpHeaders({ 'ContentType': 'application/json' });
    const url = environment.api + `update`;
    return this.http.put(url, {id, name, salary, age }, { headers: header })
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteEmployee(id: string): Observable<any> {
    const url = environment.api + `delete/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log("service handle error: ", error);
    if (error.error) {
      return throwError({ status: error.status, message: error.error.message });
    } else {
      return throwError({
        status: 500,
        success: false,
        message: `Backend returned code ${error.status} body was: ${error.message}`,
      });
    }
  }
}
