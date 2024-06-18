import { Component, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { IngredienteElement } from 'src/app/modules/ingrediente/ingrediente/ingrediente.component';
import { IngredienteService } from 'src/app/modules/shared/services/ingrediente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  private ingredienteService = inject(IngredienteService);
  
  chartBar: any;

  ngOnInit(): void { 
    this.obtenerIngredientes();
  }

  obtenerIngredientes(): void {
    this.ingredienteService.buscarTodos().subscribe(
      (data: any) => {
        this.processIngredienteResponse(data);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }

  processIngredienteResponse(resp: any) {
    const nombreIngrediente: String[] = [];
    const cantidadIngrediente: number[] = [];

    if (resp.metadata[0].code === '00') {
      let ingredienteList = resp.ingredienteResponse.ingredientes;

      ingredienteList.forEach((element: IngredienteElement) => {
        nombreIngrediente.push(element.nombre),
        cantidadIngrediente.push(element.cantidad)
      });

      //grafico de barras
      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data: {
          labels: nombreIngrediente,
          datasets: [
            {label: 'Ingredientes', data: cantidadIngrediente}
          ]
        }
      });

    } else {
      console.log('error: ');
    }
  }

}


