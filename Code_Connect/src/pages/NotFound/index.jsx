import React from 'react';
import { Link } from 'react-router';
import styles from './notFound.module.css';

import banner404 from './image-404.png';
import Typography from '../../components/Typography';
import { Button } from '../../components/Button';

export function NotFound() {
  return (
    <>
      <div className={styles.container}>
        <Typography variant='h1' color='--offwhite'>
          Oops! Página não encontrada
        </Typography>
        <img src={banner404} alt='Página 404' className={styles.image} />
        <Typography variant='body1' color='--offwhite'>
          Parece que você se perdeu no caminho... A página que você está
          procurando não existe ou foi movida. Mas não se preocupe, você pode
          voltar para o início e continuar explorando!
        </Typography>
        <Button>Ver informações</Button>
        <Link to='/' className={styles.link}>
          <Typography
            variant='body1'
            color='--offwhite'
            className={styles.linkText}
          >
            Voltar para o início
          </Typography>
        </Link>
      </div>
    </>
  );
}
