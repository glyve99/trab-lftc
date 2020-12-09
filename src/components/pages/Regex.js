import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/Icon';

import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function Regex() {
    const [userInput, setUserInput] = useState('');
    const [correct, setCorrect] = useState(false);
    const [inputs, setInputs] = useState([1]);

    const validate = e => {
        const regex = new RegExp(userInput);
        const string = e.target.value;        
        console.log(regex);
        
        if(regex.exec(string)){
             setCorrect(true);
        } else {
             setCorrect(false);
        }
    }

    return (
        <Container maxWidth='sm' style={styles.container}>
            <header style={styles.header}>
                <Link to="/">
                    <IconButton style={{padding: '0px', margin: '0px'}}><ArrowBackIcon/></IconButton>
                </Link>
                
                <p style={styles.text}>Expressão regular</p>
            </header>

            <div style={styles.main}>
                <input type="text" onChange={(e) => setUserInput(e.target.value)} style={{
                            borderSize: "2px", 
                            borderColor: "black",
                            borderStyle: "solid",
                            borderRadius: "5px",
                            height: "50px",
                            width: "200px",
                            outline: "0"
                         }} 
                />
            </div>
            <div style={styles.main}>
                    {inputs.map(input => (
                        <div style={styles.item}>
                            <input type="text" onChange={(e) => validate(e)} style={{
                                borderSize: "2px", 
                                borderColor: correct? "ForestGreen" : "FireBrick",
                                borderStyle: "solid",
                                borderRadius: "5px",
                                height: "50px",
                                width: "200px",
                                outline: "0"
                            }}
                            />
                        </div>
                    ))}
            </div>

            <div style={styles.footer}>
                <IconButton onClick={() => {
                    if(inputs.length < 10)
                        setInputs([...inputs, 1])
                    }}> <AddOutlinedIcon/> </IconButton >

                <IconButton onClick={() => {
                    if(inputs.length > 1)
                        setInputs(inputs.slice(0, inputs.length-1))
                    }}> <RemoveOutlinedIcon/> </IconButton >
            </div>    
        </Container>
    )
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
        
    },
    text: {
        fontSize: '25px',
        padding: '0px',
        margin: '0px',
        textAlign: 'center'
    },
    header:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: '10px'
    },
    main: {
        padding: '0 0 30px 0',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    item: {
        padding: '0 0 5px 0'
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
}