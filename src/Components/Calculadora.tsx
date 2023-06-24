import React from "react";
import '../Stylesheets/Calculadora.sass'

function Calculadora() {

    const displayValorAnterior = document.getElementById('valor-anterior');
    const displayValorActual = document.getElementById('valor-actual');
    const botonesNumeros = document.querySelectorAll('.numero');
    const botonesOperadores = document.querySelectorAll('.operador');

    botonesNumeros.forEach(boton => {
        boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
    });

    botonesOperadores.forEach((boton) => {
        if (boton instanceof HTMLButtonElement) {
            boton.addEventListener('click', () => display.computar(boton.value));
        }
    });

    const display = {

        calculadora: {
            sumar(num1: number, num2: number) {
                return num1 + num2;
            },

            restar(num1: number, num2: number) {
                return num1 - num2;
            },

            dividir(num1: number, num2: number) {
                return num1 / num2;
            },

            multiplicar(num1: number, num2: number) {
                return num1 * num2;
            }
        },

        signos: {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-',
        },

        tipoOperacion: '',
        valorActual: '',
        valorAnterior: '',

        borrar() {
            this.valorActual = this.valorActual.toString().slice(0, -1)
            this.imprimirValores();
        },

        borrarTodo() {
            this.valorActual = '';
            this.valorAnterior = '';
            this.tipoOperacion = '';
            this.imprimirValores();
        },

        computar(operador: string) {
            if (this.tipoOperacion !== 'igual') { this.calcular() }
            this.tipoOperacion = operador;

            this.valorAnterior = this.valorActual || this.valorAnterior;

            this.valorActual = '';
            this.imprimirValores();
        },

        agregarNumero(numero: string) {
            if (numero == '.' && this.valorActual.includes('.')) return
            this.valorActual += numero;
            this.imprimirValores();
        },

        displayValorActual: displayValorActual,
        displayValorAnterior: displayValorAnterior,

        imprimirValores() {
            if (this.displayValorActual == null || this.displayValorAnterior == null) return
            this.displayValorActual.textContent = this.valorActual;
            this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion as keyof typeof this.signos] || ''}`;
        },

        calcular() {
            const valorAnterior = parseFloat(this.valorAnterior);
            const valorActual = parseFloat(this.valorActual);
            if (isNaN(valorActual) || isNaN(valorAnterior)) return
            this.valorActual = this.calculadora[this.tipoOperacion as keyof typeof this.signos](valorAnterior, valorActual).toString();
        }
    }

    display.displayValorActual = displayValorActual;
    display.displayValorAnterior = displayValorAnterior;








    return (
        <div className="background">
            <div className="calculadora">
                <div className="display">
                    <div id="valor-anterior" className="valor"></div>
                    <div id="valor-actual" className="valor"></div>
                </div>
                <div className="botones">
                    <button onClick={() => display.borrarTodo()} className="doble margin borrarTodo">C</button>
                    <button onClick={() => display.borrar()} className="margin">←</button>
                    <button className="operador operadorBg" value="'dividir'">%</button>
                    <br />

                    <button className="numero margin">7</button>
                    <button className="numero margin">8</button>
                    <button className="numero margin">9</button>
                    <button className="operador operadorBg" value="'multiplicar'">x</button>
                    <br />

                    <button className="numero margin">4</button>
                    <button className="numero margin">5</button>
                    <button className="numero margin">6</button>
                    <button className="operador operadorBg" value="'restar'">-</button>
                    <br />

                    <button className="numero margin">1</button>
                    <button className="numero margin">2</button>
                    <button className="numero margin">3</button>
                    <button className="operador operadorBg" value="'sumar'">+</button>
                    <br />

                    <button className="numero doble margin">0</button>
                    <button className="numero margin">.</button>
                    <button className="operador" value="'igual'">=</button>
                </div >
            </div >
        </div >
    );
}

export default Calculadora;