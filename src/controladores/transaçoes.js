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

module.exports={

    depositar,
}