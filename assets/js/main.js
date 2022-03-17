(() => {
    class validadeForm {//Classe que valida todo o formulário
        constructor() {
            this.form = document.querySelector('form');//Faz a referência do form
            this.action();//Chama a "ação"
        }

        action() {
            this.form.addEventListener('submit', e => {//Cria um evento quando o form for submetido
                this.handleSubmit(e);//Chama a função para lidar com o submit
            });
        }

        handleSubmit(e) {//Função para lidar com o submit
            e.preventDefault();//Tira o "padrão" do submit
            const validInput = this.isInputValid();//Valida os inputs
            const validPassword = this.isPasswordValid();//Valida as senhas

            if (validInput && validPassword) {//Caso os dois acima sejam verdadeiros
                alert('Enviando formulário...');//Informa
                this.form.submit();//Dá o submit
            }
        }

        isInputValid() {//Valida os inputs
            let valid = true;//Variável de validação (true se for, false se não)

            for (let textError of this.form.querySelectorAll('.textError')) {//For para remover todos os avisos de erros
                textError.remove();//Remove os avisos
            }

            for (let input of this.form.querySelectorAll('.validate')) {//For que passa por todos os inputs
                if (!input.value) {//Caso seja vazio
                    const nameOfInput = input.previousElementSibling.innerText.replace(':', '') !== 'CPF'//Caso não seja o de CPF
                        ? input.previousElementSibling.innerText.replace(':', '').toLowerCase()//Deixar as letras minúsculas e tirar o ":"
                        : input.previousElementSibling.innerText.replace(':', '');//Somente tirar o ":"
                    this.createError(input, `O campo <strong>${nameOfInput}</strong> não pode estar em branco!`);//Chama a ação de erro

                    valid = false;//Caso ocorra é inválido
                }

                if (input.classList.contains('CPF')) {//Caso seja o CPF
                    if(!this.validateCPF(input)){//Se o CPF não for válido
                        valid = false;//Resulta como inválido
                    }
                }

                if (input.classList.contains('user')) {//Caso seja usuário
                    if(!this.validateUser(input)){//Se o usuário não for válido
                        valid = false;//Resulta como inválido
                    }
                }
            }

            return valid;//Retorna se é válido
        }

        createError(input, message) {//Função de aviso de erro
            const div = document.createElement('div');//Cria div
            div.innerHTML = message;//Coloca o conteúdo da div como parâmetro "message"
            div.classList.add('textError');//Adicioan a classe "textError"
            input.insertAdjacentElement('afterEnd', div);//Adiciona depois que acabar o input
        }

        validateCPF(input) {//Função de validação do CPF
            const validCPF = new CPF(input.value);//Cria um objeto na classe de validação do CPF

            if(!validCPF.test()){//Caso o teste resulte em falso(inválido)
                this.createError(input, 'CPF inválido!');//Cria aviso de erro
                return false;//Retorna como inválido
            }

            return true;//Retorna como válido
        }

        validateUser(input) {//Função de validação do usuário
            let valid = true;//Variável de validação

            if(input.value.length < 3 || input.value.length > 12){//Caso não esteja no tamanhop esperado
                this.createError(input, 'Usuário deve ter entre 3 e 12 caracteres!');//Cria aviso de erro
                valid = false;//Retorna como inválido
            }

            if(!input.value.match(/^[a-zA-Z0-9]+$/g)){//Testa caso tenha algo que seja diferente de números ou letras
                this.createError(input, 'Usuário deve ter somente letras e/ou números!');//Cria aviso de erro
                valid = false;//Retorna como inválido
            }

            return valid;//Retorna se é válido
        }

        isPasswordValid() {//Função de validação da senha
            let valid = true;//Variável de validação

            const password = this.form.querySelector('#password');//Se refere a senha
            const repetedPassword = this.form.querySelector('#repetedPassword');//Se referea senha repetida

            if(password.value.length < 6 ||password.value.length > 12){//Caso esteja fora do tamanho esperado
                this.createError(password, 'Senha deve ter entre 6 e 12 caracteres!');//Cria aviso de erro

                valid = false;//Retorna como inválido
            }

            if(password.value !== repetedPassword.value){//Caso a senha e a senha repetida forem diferentes
                this.createError(password, 'Senha e a senha repetida devem ser iguais!');//Cria aviso de erro para senha
                this.createError(repetedPassword, 'Senha e a senha repetida devem ser iguais!');//Cria aviso de erro para a senha repetida
                
                valid = false;//Retorna como inválido
            }

            return valid;//Retorna se é válido
        }
    }

    const validate = new validadeForm();//Chama a classe de validação do formulário
})();