import toastr from 'toastr'


toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function mostrarMensagem(titulo,mensagem,tipo){
    Command: toastr[tipo](mensagem, titulo)
}

export function mensagemErro(mensagem){
    mostrarMensagem('Erro',mensagem,'error')
}

export function mensagemOk(mensagem){
    mostrarMensagem('OK',mensagem,'success')
}


export function mensagemAlerta(mensagem){
    mostrarMensagem('Alerta',mensagem,'warning')
}