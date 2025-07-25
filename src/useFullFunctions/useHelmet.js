import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Salinaka - eCommerce React App';
    }
  }, [title]);
};

export default useDocumentTitle;

// ToDo: 1. need to add document, 2. etc as per react Helmet

{/** 
const EditProfile = () => {
  useDocumentTitle('Edit Account | Salinaka'); // use at Top of component

  return(
   <h1>Hello World!</h1>
  )
} 
*/}
