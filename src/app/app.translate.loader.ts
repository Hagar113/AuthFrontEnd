import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";

export class CustomTranslateLoader implements TranslateLoader{
    constructor(private http:HttpClient){}
    getTranslation(lang: string): Observable<any> {
        return this.http.get(`/assets/il18n/${lang}.json`)
    }
}
export function createTranslateLoader(http:HttpClient){
    return new CustomTranslateLoader(http)
}