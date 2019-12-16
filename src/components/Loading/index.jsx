import React, { useState } from 'react';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';


const loadCSS = css`
    display: block;
    margin: 20px auto;
    color:  #424242;
`;

const Loading = () => {
    const [loading] = useState(true);
    return (
        <div>
            <RingLoader
                css={loadCSS}
                sizeUnit={"px"}
                size={250}
                loading={loading}
            />
        </div>
    )
}

export default Loading;
