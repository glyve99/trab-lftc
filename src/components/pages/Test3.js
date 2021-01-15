import React, { useState } from 'react';
import { Graph } from 'react-d3-graph';
import Button from '@material-ui/core/Button/Button';
import Delete from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

export default function Test3() {

    const [nodes, setNodes] = useState([
        { id: 'q0', symbolType: 'diamond' },
        { id: 'q1', color: 'red' },
    ]);
    const [transitions, setTransitions] = useState([
        { source: 'q0', target: 'q0', label: 'a' },
        { source: 'q1', target: 'q1', label: 'b' },
    ]);
    const [transitionInput, setTransitionInput] = useState({ source: '', target: '', label: 'λ' });
    const [stringInput, setStringInput] = useState('');
    const [deleteMode, setDeleteMode] = useState(false);

    const myConfig = {
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        directed: true,
        maxZoom: 7,
        width: 1200,
        node: {
          color: "lightgreen",
          size: 120,
          highlightStrokeColor: "blue",
          labelPosition: 'top'
        },
        link: {
          highlightColor: "lightblue",
          renderLabel: true
        },
      };

    const onClickNode = nodeId => {
        if(deleteMode){
            setTransitions(transitions.filter(t => t.source !== nodeId && t.target !== nodeId));
            setNodes(nodes.filter(node => node.id !== nodeId));
        } else {
            setNodes(nodes.map(node => {
                if(node.id === nodeId){
                    if(node.color === 'red') node.color = 'lightgreen';
                    else node.color = 'red';
                };
                return node;
            }))
        }
    };
      
    const onClickLink = (source, target) => {
        if(deleteMode) setTransitions(transitions.filter(t => t.source !== source || t.target !== target));
        else setTransitionInput({ source, target, label: transitions.find(t => t.source === source && t.target === target).label });
    };

    const validate = str => {
        let charCode = 65;
        const tempTransitions = [...transitions];
        let tempNodes = [ ...nodes ];
        tempNodes = tempNodes.map(node => {
            const newValue = String.fromCharCode(charCode);
            tempTransitions.map(tr => {
                if(tr.source === node.id) tr.source = newValue;
                if(tr.target === node.id) tr.target = newValue;
            });
            node.id = newValue;
            let type = [];
            if(node.symbolType === 'diamond') type.push('initial');
            if(node.color === 'red') type.push('final');
            node.type = type;
            charCode += 1;
            return node;
        });
        let grammar = [];
        for(let i=0 ; i<transitions.length ; i++){
            let initial = transitions[i].source;
            let final = transitions[i].target;
            let value = transitions[i].label;

            let rules = grammar.find(row => row.leftSide === initial); 

            if(!rules){
                if(value === 'λ') grammar.push({leftSide: initial, rightSide: [final]});
                else grammar.push({leftSide: initial, rightSide: [value + final]});
            }
            else {
                if(value === 'λ') rules.rightSide.push(final);
                else rules.rightSide.push(value + final);
            };
        };
        console.log(grammar);
        for(let i=0 ; i<nodes.length ; i++){
            let initial = nodes[i].id;
            let type = nodes[i].type.find(row => row === 'final');
            if(type){ //Se é final
                let rules = grammar.find(row => row.leftSide === initial);

                if(!rules) //Se não tem
                    grammar.push({leftSide: initial, rightSide: ['λ']});
                else //Se tem
                    rules.rightSide.push('λ');
            }
        }
        for(let i=0 ; i<nodes.length ; i++){
            let initial = nodes[i].id;
            let type = nodes[i].type.find(row => row === 'initial');

            if(type){
                let rules = grammar.find(row => row.leftSide === initial); //Verificando se existe regra com aquele simbolo
                grammar = grammar.filter(item => item !== rules);
                grammar.unshift(rules);
            };
        };
        for(let rule of grammar[0].rightSide){
            if(matchD(str, rule, grammar)){
                return true;
            };
        }
        return false;
    }

    const matchD = (str, rule, arr) => {
        console.log('Rule: ', rule);
        if(rule.length - 1 > str.length) return false;
    
        const nextRule = rule[rule.length - 1];
        console.log('  Next rule: ', nextRule);
    
        //Verificando caractere vazio
        if(nextRule === 'λ' && (rule.slice(0, rule.length - 1) === str && rule.slice(0, rule.length - 1).length === str.length)) return true;
        
        if(nextRule === nextRule.toLowerCase()) return rule === str;
        
        const rules = arr.find(row => row.leftSide === nextRule);
        console.log('  Rules: ', rules.rightSide);
    
        if(!rules) return false;
        for(let r of rules.rightSide)
        {
            if(matchD(str, rule.replace(nextRule, r), arr)){
                return true;
            }
        }
    };
    
    return (
        <div style={{ height: '100vh' }}>
            <div style={{ height: '15%', backgroundColor: 'purple', display: 'flex', justifyContent: 'space-between', padding: '0 2.5% 0 2.5%', alignItems: 'center' }}>
                <div>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setNodes([ ...nodes, { id: `q${parseInt(nodes[nodes.length - 1].id[1]) + 1}` }])}
                    >Add node</Button>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <input
                            value={transitionInput.source}
                            onChange={e => setTransitionInput({ ...transitionInput, source: e.target.value })}
                        />
                        <input 
                            value={transitionInput.target}
                            onChange={e => setTransitionInput({ ...transitionInput, target: e.target.value })}
                        />
                        <input 
                            value={transitionInput.label}
                            onChange={e => setTransitionInput({ ...transitionInput, label: e.target.value })}
                        />
                    </div>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => {
                            const tr = transitions.find(t => t.source === transitionInput.source && t.target === transitionInput.target);
                            if(tr){
                                if(tr.label !== transitionInput.label){
                                    tr.label = transitionInput.label
                                    setTransitions([ ...transitions.filter(t => t.source !== tr.source || t.target !== tr.target), tr]);
                                }
                            } else setTransitions([ ...transitions, transitionInput ]);
                            setTransitionInput({ source: '', target: '', label: 'λ' });
                        }}
                    >Submit</Button>
                </div>
                <div>
                    <Button
                        variant='contained'
                        color={deleteMode ? 'secondary' : 'default'}
                        onClick={() => setDeleteMode(!deleteMode)}
                    >
                        <Delete />
                    </Button>
                </div>
                <div>
                    <TextField 
                        variant='outlined'
                        label='Input:'
                        value={stringInput}
                        onChange={e => setStringInput(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        onClick={() => {
                            if(validate(stringInput)) alert('Success');
                            else alert('Failure');
                        }}
                    >Validate</Button>
                </div>
            </div>
            <div style={{ height: '85%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Graph 
                    id='graph-id'
                    data={{
                        nodes: nodes,
                        links: transitions
                    }}
                    config={myConfig}
                    onClickNode={onClickNode}
                    onClickLink={onClickLink}
                />
            </div>
        </div>
    )
}