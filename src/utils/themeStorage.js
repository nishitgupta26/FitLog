export const getInitialTheme = () => {
    return localStorage.getItem('theme') === 'dark';
  };
  
  export const saveTheme = (isDarkMode) => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };
  