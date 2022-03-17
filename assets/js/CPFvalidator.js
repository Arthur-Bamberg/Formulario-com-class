class CPF {//Classe para verificar se o CPF é válido
    constructor(value) {//Constructor da classe
        Object.defineProperty(this, 'cleanedCPF', {
            get: () => {
                return value !== undefined ? value.replace(/\D+/g, '') : value;//Tira o que não for número caso seja diferente de vazio
            }
        });
    }

    test() {
        if (typeof this.cleanedCPF === 'undefined' || this.cleanedCPF.length !== 11 || this.sequencial()) return false; //Caso o valor seja vazio ou de tamanho diferente do esperado
        
        const slicedCPF = this.cleanedCPF.slice(0, -2); //Tira os primeiros 9 dígitos para executar o cálculo do décimo

        const firstDigit = this.calculate(slicedCPF); //Calcula o penúltimo dígito com os 9 anteriores
        const secondDigit = this.calculate(slicedCPF + firstDigit); //Calcula o último dígito com os 10 anteriores (9 puros, 1 calculado)

        const testedCPF = slicedCPF + firstDigit + secondDigit; //Gera um CPF testado (correto)

        if (this.cleanedCPF === testedCPF) return true; //Se for igual retorna verdadeiro

        return false; //Caso não seja igual retorna falso
    }

    calculate(parcialCPF) {
        const arrayOfCPF = Array.from(parcialCPF); //Cria um vetor com os números

        const sum = arrayOfCPF.reduce((accumulator, value, index, baseArray) => {
            accumulator += value * (baseArray.length + 1 - index);
            return accumulator;
        }, 0);

        return 11 - (sum % 11) > 9 ? 0 : 11 - (sum % 11); //11 - (o resto da soma de onze), e caso o resultado seja maior que 9 então é 0
    }

    sequencial() {
        return this.cleanedCPF[0].repeat(11) === this.cleanedCPF; //Primeiro dígito repetido em relação ao CPF informado
    }
}