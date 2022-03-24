import express, {Request, Response } from 'express'
const app = express()
import bodyParser from 'body-parser'
const cors = require('cors')
var db = require('./database')

app.use(cors({
	origin: 'https://somentehostsautorizadosaqui'
}))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//atente que isto não é boa pratica, usando aqui apenas temporariamente
process.on('uncaughtException', function(err) {
	console.log(err)
})

app.post("/addArquivo", (req: Request, res: Response) => {
	const inputArquivo = {
		'nome': req.body.arquivo
	}
	db.query('INSERT INTO arquivo SET ?', inputArquivo, function(err:string){
		if (err) throw err + ' Erro ao adicionar o arquivo...'
	})

	db.query('SELECT last_insert_id() as arquivo_id', function(err:string, result: string){
		if (err) throw err + ' Erro ao tentar capturar o id do arquivo...'

		let data = JSON.parse(JSON.stringify(result))
		const dados = JSON.parse(req.body.dados)
		for (let i in dados) {
			
			let inputDetalhe = {
				'arquivo_id': data[0].arquivo_id,
				'telefone':  dados[i].numero,
				'mensagem': dados[i].mensagem,
				'valido': dados[i].valido  
			}

				db.query('INSERT INTO detalhe SET ?', inputDetalhe, function(err: string){
					if (err) throw err +' Erro ao adicionar linha detalhe do arquivo..'
				})
    	 }

		})

	res.send('Aquivo recebido..')

})

app.listen(process.env.PORT, function() {
    console.log(`Rodando legal na porta ${process.env.PORT} !`)
})