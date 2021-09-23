import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { Phrase } from '../models/Phrase';


export const ping = (req: Request, res: Response) => {
  res.json({pong: true});
}

export const random = (req: Request, res: Response) => {
  let nRand: number = Math.floor( Math.random() * 10 );
  res.json({number: nRand});
}

export const nome = (req: Request, res: Response) => {
  let nome: string = req.params.nome;
  res.json({nome: `Você enviou o nome ${nome}`});
}

export const createPhrase = async (req: Request, res: Response) => {
  // Receber dados enviados
  //console.log(req.body);
  let { author, txt } = req.body;

  let newPhrase = await Phrase.create({ author, txt });

  res.status(201);
  res.json({ id: newPhrase.id, author, txt  });
}

export const listPhrases = async (req: Request, res: Response) => {
  let list = await Phrase.findAll();

  res.json({ list });
}

export const getPhrase = async (req: Request, res: Response) => {
  let { id } = req.params;

  let phrase = await Phrase.findByPk(id);
  if(phrase) {
    res.json({ phrase });
  } else {
    res.json({ error: 'Frase não encontrada!' });
  }

  res.json({  });
}

export const updatePhrase = async (req: Request, res: Response) => {
  let { id } = req.params;// Pega a frase
  let { author, txt } = req.body;// Pega autor e frase

  let phrase = await Phrase.findByPk(id);// Frase epecifica
  if(phrase) {
    phrase.author = author;// Recebe novo author
    phrase.txt = txt;// Recebe novo texto
    await phrase.save();// Salva 

    res.json({ phrase });// Retorna Novas informações
  } else {
    res.json({ error: 'Frase não encontrada!' });
  }
}

export const deletePhrase = async (req: Request, res: Response) => {
  let { id } = req.params;// Pega a frase 
  await Phrase.destroy({ where: { id } });
  res.json({});
}

export const randomPhrase = async (req: Request, res: Response) => {
  let phrase = await Phrase.findOne({
    order: [
      Sequelize.fn('RANDOM')// Pega frase aleatoria
    ]
  });
  if(phrase) {
    res.json({ phrase });// Retorna a frase encontrada
  } else {
    res.json({ error: 'Não há frases cadastradas!' });
  }
  
}