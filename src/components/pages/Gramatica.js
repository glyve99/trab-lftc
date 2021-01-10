import React, { useState } from 'react';
import Container from '@material-ui/core/Container/Container';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { ArrowDownwardOutlined } from '@material-ui/icons';

const GrammarInput = ({ leftSide, rightSide }) => {

    const [inputs, setInputs] = useState([leftSide, rightSide]);

    return (
        <TableRow style={{ borderBottom: '2px solid black', height: '80px' }}>
            <TableCell style={{ borderRight: '1px solid black', width: '10%' }}>
                <input 
                    value={inputs[0]}
                    style={{ backgroundColor: '#DFDBDB', border: 0, outline: 'none', width: '100%', fontSize: 20, textAlign: 'center' }}
                    onChange={e => setInputs([ e.target.value.toUpperCase(), inputs[1] ])}
                    maxLength={1}
                />
            </TableCell>
            <TableCell style={{ borderRight: '1px solid black', width: '10%' }}>
                >
            </TableCell>
            <TableCell style={{ width: '80%' }}>
                <input 
                    value={inputs[1]}
                    style={{ backgroundColor: '#DFDBDB', border: 0, outline: 'none', width: '100%', fontSize: 20 }}
                    onChange={e => setInputs([ inputs[0], e.target.value ])}
                />
            </TableCell>
        </TableRow>
    )

}

const StringInput = ({ validate }) => {
    const [value, setValue] = useState('');

    return (
        <TextField
            variant='outlined'
            label='Input:' 
            value={value}
            onChange={e => setValue(e.target.value)}
            style={{ width: '50%', }}
            color={validate(value) ? 'primary' : 'secondary'}
        />
    )
}

export default function Gramatica() {

    const [grammarInputs, setGrammarInputs] = useState([
        { leftSide: 'S', rightSide: 'a | bc | baaA' },
        { leftSide: 'A', rightSide: 'aA | bB' },
        { leftSide: 'B', rightSide: 'c' },
        { leftSide: '', rightSide: '' }
    ]);
    const [stringInputs, setStringInputs] = useState(1);

    const validate = str => {
        const arr = grammarInputs.map(input => {
            const temp = { ...input };
            temp.rightSide = temp.rightSide.replace(/\s+/g, '').split('|');
            return temp;
        });
        const res = [];
        console.log(arr);
        let type = '';
        arr.forEach(row => {
            row.rightSide.forEach(rule => {
                if(rule.replace(/[^A-Z]/g, '').length > 1){
                    res.push('Invalid');
                } else {
                    for(let i=0; i<rule.length; i++){
                        if(rule[i] === rule[i].toUpperCase() && i === 0){
                            res.push('Left');
                            break;
                        }
                        if(rule[i] === rule[i].toUpperCase() && i === rule.length - 1){
                            res.push('Right');
                            break;
                        }
                    }
                }
            })
        });
        if(res.filter(s => s === 'Left').length === 0){
            type = 'Right';
        } else if(res.filter(s => s === 'Right').length === 0){
            type = 'Left';
        } else {
            type = 'Invalid';
        };

        if(type === 'Right'){
            arr[0].rightSide.forEach(rule => {
                if(matchD(str, rule, arr)){
                    console.log('oi');
                    return true;
                };
            });
            return false;
        } else if(type === 'Left'){
            arr[0].rightSide.forEach(rule => {
                if(matchE(str, rule, arr)){
                    return true;
                };
            });
            return false;
        } else {
            return false;
        }

    };

    const matchD = (str, rule, arr) => {
        if(rule.length - 1 > str.length) return false;
        const nextRule = rule[rule.length - 1];
        console.log(rule === str);
        if(nextRule === nextRule.toLowerCase()) return rule === str;
        const rules = arr.find(row => row.leftSide === nextRule);
        if(!rules) return false;
        rules.rightSide.forEach(r => {
            if(matchD(str, rule.replace(nextRule, r), arr)){
                return true;
            }
        });
    };

    const matchE = (str, rule, arr) => {
        if(rule.length - 1 > str.length) return false;
        const nextRule = rule[0];
        if(nextRule === nextRule.toLowerCase()) return rule === str;
        const rules = arr.find(row => row.leftSide === nextRule);
        if(!rules) return false;
        rules.rightSide.forEach(r => {
            if(matchE(str, rule.replace(nextRule, r), arr)){
                return true;
            }
        })
    }

    const renderInputs = () => {
        let arr = [];
        for(let i=0; i<stringInputs; i++){
            arr.push(<StringInput validate={validate} />);
        }
        return arr;
    }
    return (
        <Container maxWidth='lg' style={styles.container}>
            <div style={{ ...styles.innerContainer }}>
                <button
                    onClick={() => setGrammarInputs([ ...grammarInputs, { leftSide: '', rightSide: '' } ])}
                >add more</button>
                <TableContainer style={{ height: '75%', width: '75%' }}>
                    <Table style={styles.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    LHS
                                </TableCell>
                                <TableCell>

                                </TableCell>
                                <TableCell>
                                    RHS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {grammarInputs.map(input => (
                                <GrammarInput leftSide={input.leftSide} rightSide={input.rightSide} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={styles.innerContainer}>
                <div style={{ height: '75%', width: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {renderInputs()}
                </div>
                <button
                    onClick={() => {
                        if(stringInputs < 10){
                            setStringInputs(stringInputs + 2);
                        }
                    }}
                >add more</button>
            </div>
        </Container>
    )
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex'
    },
    innerContainer: {
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    table: {
        height: '100%',
        width: '100%',
        backgroundColor: '#DFDBDB',
        borderRadius: 5
    },
    td: {
        height: '100%',
        borderBottom: '1px solid black'
    },
    grammarInput: {
        height: '25%',
        width: '50%',
        border: 0,
        backgroundColor: '#DFDBDB',
        outline: 'none'
    }
}