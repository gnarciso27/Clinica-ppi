
import { Component } from '@angular/core';
import { Consultas } from './consultas/consultas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Consultas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
