let { contas, saques, depositos, transferencias} = require('../bancodedados')
const {format} = require('date-fns')

const depositar = (req,res)=>{
    const {numero_conta, valor} = req.body

    if(!numero_conta){
        return res.status(400).json({mensagem:"O numero da conta é obrigatorio."})
    }
    if( !valor){
        return res.status(400).json({mensagem:"Digite um  valor."})
    }
    const contaEncontrada = contas.find(conta => Number(conta.numero) === Number(numero_conta) )

    if(!contaEncontrada){
        return res.status(404).json({mensagem:" Conta não encontrada"})
    }
    if(valor <= 0){
        return res.status(400).json({mensagem: "O valor nao pode ser menor ou igual a 0"})
    }

        contaEncontrada.saldo += valor

        const registro = {
            data: format(new Date, 'yyyy-MM-dd HH:mm:ss') ,
            numero_conta,
            valor
        }
        depositos.push(registro)

            return res.status(201).send()
}

const sacar = (req,res)=>{
    const {numero_conta, valor, senha} = req.body

    if(!numero_conta){
        return res.status(400).json({mensagem:"O numero da conta é obrigatorio."})
    }
    if( !valor){
        return res.status(400).json({mensagem:"Digite um  valor."})
    }
    if( !senha){
        return res.status(400).json({mensagem:"Digite sua senha."})
    }
    const contaEncontrada = contas.find(conta => Number(conta.numero) === Number(numero_conta) )

    if(!contaEncontrada){
        return res.status(404).json({mensagem:" Conta não encontrada"})
    }

    if(contaEncontrada.usuario.senha !== senha){
        return res.status(400).json({mensagem:"Senha invalida"})
    }
    if(contaEncontrada.saldo < valor){
        return res.status(400).json({mensagem: "Saldo insuficiente"})
    }

        contaEncontrada.saldo -= valor

        const registro = {
            data: format(new Date, 'yyyy-MM-dd HH:mm:ss') ,
            numero_conta,
            valor
        }
        saques.push(registro)

            return res.status(201).send()
}

const transferir = (req,res)=> {
    const {numero_conta_origem,numero_conta_destino, valor, senha} = req.body

   
    if( !valor){
        return res.status(400).json({mensagem:"Digite um  valor."})
    }
    if( !senha){
        return res.status(400).json({mensagem:"Digite sua senha."})
    }
    if(!numero_conta_origem){
        return res.status(400).json({mensagem:"Insira a conta de origem."})
    }
    if( !numero_conta_destino){
        return res.status(400).json({mensagem:"Insira a conta de destino."})
    }



    const contaEncontradaOrigem = contas.find(conta => Number(conta.numero) === Number(numero_conta_origem) )

    if(!contaEncontradaOrigem){
        return res.status(404).json({mensagem:" Conta de origem não encontrada"})
    }

    const contaEncontradadestino = contas.find(conta => Number(conta.numero) === Number(numero_conta_destino) )

    if(!contaEncontradadestino){
        return res.status(404).json({mensagem:" Conta de destino não encontrada"})
    }

    if(contaEncontradaOrigem.usuario.senha !== senha){
        return res.status(400).json({mensagem:"Senha invalida"})
    }


if(contaEncontradaOrigem.saldo < valor){
    return res.status(400).json({mensagem: "Saldo insuficiente"})
}

    contaEncontradaOrigem.saldo -= valor
    contaEncontradadestino.saldo += valor


    const registro = {
        data: format(new Date, 'yyyy-MM-dd HH:mm:ss') ,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
         transferencias.push(registro)

        return res.status(201).send()




}


module.exports={

    depositar,
    sacar,
    transferir
}