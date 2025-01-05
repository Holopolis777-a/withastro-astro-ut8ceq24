import { useLocation } from 'react-router-dom';

export function useActiveItem() {
  const location = useLocation();

  return (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
}