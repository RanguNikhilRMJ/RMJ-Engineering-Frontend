
import React, { useEffect } from 'react';
interface PageTitleProps {
  title: string;
}
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  useEffect(() => {
    document.title = title;
    return () => {
        document.title = 'Digital Campus';
    };
  }, [title]);

  return null; 
};
export default PageTitle;