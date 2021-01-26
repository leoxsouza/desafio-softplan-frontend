export class ValidatorUtil {

    public static isValidCpf(valor: string) {
        valor = valor.toString().replace(/[^\d]+/g, '');

        return this.validaCpf(valor);
    }

    private static validaCpf(valor: string) {
        if (valor == '00000000000' ||
            valor == '11111111111' ||
            valor == '22222222222' ||
            valor == '33333333333' ||
            valor == '44444444444' ||
            valor == '55555555555' ||
            valor == '66666666666' ||
            valor == '77777777777' ||
            valor == '88888888888' ||
            valor == '99999999999') {
            return false;
        }

        let digitos = valor.substr(0, 9);
        let novo_cpf = this.calcDigitosPosicoes(digitos);
        let cpf_croped = this.calcDigitosPosicoes(novo_cpf, 11);

        return cpf_croped === valor;
    }


    private static calcDigitosPosicoes(digitos: any, posicoes = 10, soma_digitos = 0) {
        for (let i = 0; i < digitos.length; i++) {
            soma_digitos = soma_digitos + (digitos[i] * posicoes);
            posicoes--;

            if (posicoes < 2) {
                posicoes = 9;
            }
        }

        soma_digitos = soma_digitos % 11;

        if (soma_digitos < 2) {
            soma_digitos = 0;
        } else {
            soma_digitos = 11 - soma_digitos;
        }

        return digitos + soma_digitos;
    }

}