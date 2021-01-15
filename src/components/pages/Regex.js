import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button/Button';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default function Regex() {
    const [userInput, setUserInput] = useState('');
    const [inputs, setInputs] = useState([1]);

    const validate = e => {
        const regex = new RegExp(userInput);
        const string = e.target.value;        
                
        if(regex.exec(string)){
             e.target.style.borderColor = "ForestGreen";
        } else {
             e.target.style.borderColor = "FireBrick";
        }
    }

    return (
        <Container maxWidth='sm' style={styles.container}>
            <header style={styles.header}>
                <Link style={styles.button} to="/" width="20px" height="40px">
                    <Tooltip title="Voltar"><Button style={styles.button}><ArrowBackIcon color="action"/></Button></Tooltip>
                </Link>
                
                <p style={styles.text}>Expressão regular</p>
            </header>

            <div style={styles.main}>
                <input type="text" onChange={(e) => setUserInput(e.target.value)} style={styles.input}/>
            </div>

            <Divider color="inherit" style={{ padding: '0.5px', width: '95%', alignSelf: 'center' }} />

            <div style={styles.main}>
                {inputs.map(() => (
                    <div style={styles.item}>
                        <input type="text" placeholder="String" onChange={(e) => validate(e)} onClick={(e) => {validate(e); e.target.placeholder = "";}} style={styles.input}/>
                    </div>
                ))}
            </div>

            <div style={styles.footer}>
                <Tooltip title="Adicionar">
                    <Button style={styles.button} onClick={() => {
                        if(inputs.length < 10)
                            setInputs([...inputs, 1])
                        }} > <AddOutlinedIcon color="action"/> </Button >
                </Tooltip>
                <Tooltip title="Remover">
                    <Button style={styles.button} onClick={() => {
                        if(inputs.length > 1)
                            setInputs(inputs.slice(0, inputs.length-1))
                        }} > <RemoveOutlinedIcon color="action" /> </Button >
                </Tooltip>
            </div>

            <div style={styles.helper}>            
                <HtmlTooltip placement="top"
                    title={
                    <React.Fragment>
                        <Typography  color="inherit">Expressão regular</Typography>
                        {'Insira a expressão regular:'} <br/>
                        <b>{'  ^'}</b> {' iniciar a expressão regular'} <br/>
                        <b>{'  $'}</b> {' termina a expressão regular'} <br/>
                        <b>{'  *'}</b> {' zero ou mais repetições'} <br/>
                        <b>{'  +'}</b> {' uma ou mais repetições'} <br/>
                        <b>{'  ?'}</b> {' zero ou uma repetição'} <br/>
                        <b>{'  |'}</b> {' união'} <br/>
                        <b>{'  {x}'}</b> {' x repetições'} <br/>
                        <b>{'  {x, y}'}</b> {' entre x e y repetições'} <br/><br/>
                        {'Acrescente as strings para testar.'}<br/>
                        {'Elas serão validadas quando são clicadas.'}                           
                    </React.Fragment>
                    }>
                    <HelpOutlineIcon color="action" />
                </HtmlTooltip>
            </div>    
        </Container>
    )
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 420,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
        borderWidth: "3px", 
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: "5px",
        height: "50px",
        width: "250px",
        outline: "0",
        fontSize: "20px"
     },
    button: {
        borderRadius: '5px',
        height: '30px',
        width: '20px',
        transitionDuration: '0.5s',
        marginRight: '10px'
    },
    text: {
        fontSize: '30px',
        textAlign: 'center',
        margin: '0'
    },
    header:
    {
        paddingBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    main: {
        paddingBottom: '20px',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    item: {
        padding: '5px',
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    helper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: '10px'
    }
}