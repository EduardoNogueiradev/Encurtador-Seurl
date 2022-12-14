var express = require('express');
var router = express.Router();
const Link = require('../models/link');

/* gerador de codigos */
function generateCode(){
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* criar nova url */
router.post('/new', async (req, res, next) =>{
    const url = req.body.url;
    const code = generateCode();
  
    const resultado = await Link.create({
      url,
      code
    });

    res.render('create', resultado.dataValues);  
})

router.get('/:code', async (req, res, next) =>{
  const code = req.params.code;
  
  const resultado = await Link.findOne({where: {code} });
  if(!resultado) return res.sendStatus(404);
  
  resultado.hits++; 
  await resultado.save();
  
  /* Rendireciona para a página encurtada */
  /* res.render('redirect', resultado.dataValues); */

  /* Redenriza a página com anúncios e com o link */
  res.render('link', resultado.dataValues)
})

router.get('/:code/stats', async (req, res, next) =>{
  const code = req.params.code;
  const resultado = await Link.findOne({where: {code} });
  if(!resultado) return res.sendStatus(404);
  res.render('stats', resultado.dataValues);
})

router.get('/:code/testemeu', async (req, res, next) =>{
  const code = req.params.code;
  const resultado = await Link.findOne({where: {code} });
  if(!resultado) return res.sendStatus(404);
  res.render('teste', resultado.dataValues);
})

module.exports = router;

