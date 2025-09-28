const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { processFile } = require('./functions/processFileTxt');
const { formatResponse } = require('./functions/formatResponse');
const { applyFilters } = require('./functions/applyFilters');
const app = express();
const file = multer({ dest: 'files/' });

app.use(express.json());

app.post('/processFile', file.single('file'), (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).json({ error: 'Arquivo não foi enviado!' });
        }
        
        const filePath = path.join(__dirname, req.file.path);

        fs.readFile(filePath, 'utf8', (err, data) => {            

            if (err) {
                return res.status(500).json({ error: 'Erro ao ler o arquivo' });
            }

            if (!data || data.trim().length === 0) {
                return res.status(400).json({ error: 'Arquivo inválido: vazio' });
            }
            
            try {
                let dados = processFile(data);

                dados = applyFilters(dados, req.query);

                const retorno = formatResponse(dados);

                res.json(retorno);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            } finally {                
                fs.unlink(filePath, err => {
                if (err) console.error('Erro ao excluir arquivo temporário.', err);
                });
            }
        });
    }
    catch(error){
        res.status(500).json({error : 'Erro no processamento do arquivo!'})
    }
    
});

module.exports = app;