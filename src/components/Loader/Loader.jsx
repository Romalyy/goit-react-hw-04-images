import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from 'react-loader-spinner';
import s from './loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
     <BallTriangle color="#84C3BE" height={80} width={80} />
    </div>
  );
};

export default Loader;