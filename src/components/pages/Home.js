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
            {renderRedirect()}
            <div style={styles.menu}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '15px 0 15px 0'}}>
                    <Button onClick={() => setRedirectFlag('regex')}>Expressões regulares</Button>
                    <Button>Gramáticas</Button>
                    <Button onClick={() => setRedirectFlag('autofin')}>Autômatos finitos</Button>
                </div>
            </div>
        </Container>
    )
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        height: '75%',
        width: '50%',
        backgroundColor: 'pink',
        borderRadius: '5%'
    }
}