import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container';

export default function Home() {

    const [redirectFlag, setRedirectFlag] = useState(null);

    const renderRedirect = () => {
        if(redirectFlag){
            return <Redirect to={`/${redirectFlag}`} />
        }
    }

    return (
        <Container maxWidth='sm' style={styles.container}>
            <p style={styles.text}>
                Trabalho: Linguagens Formais e Teoria da Computação 
            </p>
            {renderRedirect()}
            <div style={styles.menu}>
                <Button style={styles.button} onClick={() => setRedirectFlag('regex')}>Expressões regulares</Button>
                <Button style={styles.button} onClick={() => setRedirectFlag('gramatica')}>Gramáticas</Button>
                <Button style={styles.button} onClick={() => setRedirectFlag('autofin')}>Autômatos finitos</Button>
            </div>
            <p style={styles.text}>
                Desenvolvido por: Giovanna Carreira Marinho e Guilherme Molina de Olyveira
            </p>
        </Container>
    )
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    menu: {
        height: '70%',
        width: '50%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column'
    },
    text: {
        fontSize: '15px',
        textAlign: 'center'
    },
    button: {
        fontSize: '20px',
        fontStyle: 'none'
    }
}