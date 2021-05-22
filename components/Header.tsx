import styles from './Header.module.css';

const Header = () => {
  return (
    <header className="pt-0 pb-6 border-b border-gray-700 text-blue-300">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className={styles.heading}>
          <a href="/">Peter Mekhaeil</a>
        </h1>
      </div>
    </header>
  );
};

export default Header;
