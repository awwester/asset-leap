import React from 'react';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog } from '@fortawesome/free-solid-svg-icons';

import Loading from 'components/Loading';
import './style.scss';

export default ({ text='Loading' }) => {
  /* Display a full screen showing the user the app or section is loading. */

  return (
    <div className="loading-container text-center p-5">
      <FontAwesomeIcon icon={faFrog} className="icon" />
      <Fade duration={500}><h4 className="my-4">{text}</h4></Fade>
      <Loading style={{ width: 50, height: 50 }} className="m-5" />
    </div>
  );
}
