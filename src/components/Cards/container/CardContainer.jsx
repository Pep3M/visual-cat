import { Box } from '@material-ui/core';
import React from 'react';
import { neumorphismDivContainer, neumorphismDivItem } from '../../../styles/GlobalStyles';

const CardContainer = () => {
    return (
        <Box sx={{
            ...neumorphismDivContainer,
            margin: '20px',
            padding: 20,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }}>
            <Box sx={{
                ...neumorphismDivItem,
                width: 150,
                height: 200,
                margin: 10,
            }}/>
            <Box sx={{
                ...neumorphismDivItem,
                width: 150,
                height: 200,
                margin: 10,
            }}/>
            <Box sx={{
                ...neumorphismDivItem,
                width: 150,
                height: 200,
                margin: 10,
            }}/>
            <Box sx={{
                ...neumorphismDivItem,
                width: 150,
                height: 200,
                margin: 10,
            }}/>
        </Box>
    );
}

export default CardContainer;
