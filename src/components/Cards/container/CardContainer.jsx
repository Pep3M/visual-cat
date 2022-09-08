import { Box } from '@material-ui/core';
import React from 'react';
import { neumorphismDivContainer } from '../../../styles/GlobalStyles';
import ItemCard from '../molecules/ItemCard/ItemCard';

const CardContainer = () => {
    return (
        <Box sx={{
            ...neumorphismDivContainer,
            margin: 20,
            padding: 10,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }}>
            <ItemCard title={'Titulo'} />
            <ItemCard title={'Titulo'} />
            <ItemCard title={'Titulo'} />
            
        </Box>
    );
}

export default CardContainer;
