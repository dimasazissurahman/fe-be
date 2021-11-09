import React from 'react';
import ReactLoading from 'react-loading';
import styles from './loadingPage.module.css';

const Loading = ({ type, color }) => (
    <div className={styles['container']}>
        <ReactLoading type={"spinningBubbles"} color={"black"} height={'50%'} width={'50%'} />
        <h1>Loading Page</h1>
    </div>
);

export default Loading;