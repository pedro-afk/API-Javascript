const multer = require('multer');
const path = require ('path');
module.exports = {
    //como o multer vai armazenar as imagens
    storage: multer.diskStorage({
        //pasta onde sera salvo os arquivos
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //nome do arquivo
        //extensao (jpg,png etc)
        //data de salvamento
        filename: (req, file, cb)=>{
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
}