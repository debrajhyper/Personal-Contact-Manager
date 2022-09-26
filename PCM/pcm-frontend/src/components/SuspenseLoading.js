import React from 'react';

import UseAnimations from 'react-useanimations';
import loadingIco from 'react-useanimations/lib/loading';

const SuspenseLoading = () => {
    return (
        <section className='loader'>
            <UseAnimations animation={loadingIco} strokeColor='white' size={60} />
        </section>
    )
}

export default SuspenseLoading