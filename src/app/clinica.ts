
import { Injectable } from '@angular/core';
import { Consulta } from './consulta';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  private consultas: Consulta[] = [];

  constructor() {
    const dadosSalvos = sessionStorage.getItem('consultas');

    if (dadosSalvos) {
      this.consultas = JSON.parse(dadosSalvos);
    } else {
      this.consultas = [
        { nomePaciente: 'Ana Silva', preco: 150, data: '2026-10-10' },
        { nomePaciente: 'Pedro Santos', preco: 200, data: '2026-10-11' },
        { nomePaciente: 'Maria Oliveira', preco: 180, data: '2026-10-12' },
        { nomePaciente: 'João Costa', preco: 120, data: '2026-10-13' }
      ];

      this.salvarSessao();
    }
  }

  private salvarSessao(): void {
    sessionStorage.setItem(
      'consultas',
      JSON.stringify(this.consultas)
    );
  }

  adicionarConsulta(consulta: Consulta): void {
    this.consultas.push(consulta);
    this.salvarSessao();
  }

  listarConsultas(): Consulta[] {
    return [...this.consultas];
  }

  calcularTotal(): number {
    return this.consultas.reduce(
      (total, consulta) => total + consulta.preco,
      0
    );
  }
}
