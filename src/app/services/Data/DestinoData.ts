// destino-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DestinoData {
    flightsCreated = false;
    hotelsCreated = false;

    private selectecId = new BehaviorSubject<string>("");
    private selectecAmerica = new BehaviorSubject<string>("");
    private selectecEuropa = new BehaviorSubject<string>("");




    selelectedId$ = this.selectecId.asObservable();
    selectedAmerica$ = this.selectecAmerica.asObservable();
    selectedEuropa$ = this.selectecEuropa.asObservable();


    setSelectedId(id: string): void {
        this.selectecId.next(id);
    }

    
    setSelectedAmerica(america: string): void{
        this.selectecAmerica.next(america)
    }


    setSelectedEuropa(europa: string): void {
        this.selectecEuropa.next(europa);
    }

}