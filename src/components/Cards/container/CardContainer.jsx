import { Box } from '@material-ui/core';
import React from 'react';
import { neumorphismDivContainer } from '../../../styles/GlobalStyles';

const CardContainer = () => {
    return (
        <Box sx={{
            ...neumorphismDivContainer,
            width: '96%',
            height: 200,
        }}>
            
        </Box>
    );
}

export default CardContainer;
