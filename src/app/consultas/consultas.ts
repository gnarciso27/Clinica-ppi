
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { Consulta } from '../consulta';
import { ClinicaService } from '../clinica';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css'
})
export class Consultas implements OnInit {

  formulario: FormGroup;
  consultas: Consulta[] = [];
  total = 0;

  constructor(
    private fb: FormBuilder,
    private clinicaService: ClinicaService
  ) {
    this.formulario = this.fb.group({
      nomePaciente: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.atualizarLista();
  }

  cadastrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const consulta: Consulta = {
      nomePaciente: this.formulario.value.nomePaciente,
      preco: Number(this.formulario.value.preco),
      data: this.formulario.value.data
    };

    this.clinicaService.adicionarConsulta(consulta);

    this.formulario.reset({
      nomePaciente: '',
      preco: 0,
      data: ''
    });

    this.atualizarLista();
  }

  atualizarLista(): void {
    this.consultas = this.clinicaService.listarConsultas();
    this.total = this.clinicaService.calcularTotal();
  }
}
