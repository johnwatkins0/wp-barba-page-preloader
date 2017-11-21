import WPBarba from './WPBarba';

const initBarba = (props) => {
  const wpBarba = new WPBarba(props);
  wpBarba.run();
};

export default initBarba;
