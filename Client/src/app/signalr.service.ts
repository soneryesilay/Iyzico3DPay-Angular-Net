import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: signalR.HubConnection | any
  constructor() { }

  startConnection=()=>{
    this.hubConnection= new signalR.HubConnectionBuilder().withUrl("https://localhost:7032/payment-hub").build();
    this.hubConnection.start().then(()=>console.log("Connection started")).catch((err:any)=>console.log(err));
  }

  registerTransactionId(id:string){
    this.hubConnection.invoke("RegisterTransaction", id);
  }
  paymentResult = (updateStatus:any) => {
    this.hubConnection.on("Receive", (res:any)=>{
     updateStatus(res); 
    })
  }
}
