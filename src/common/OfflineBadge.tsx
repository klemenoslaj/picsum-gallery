import { FunctionComponent } from 'react';
import { SlashIcon } from './icons';
import useOnline from './useOnline';

const OfflineBadge: FunctionComponent = () => {
  const online = useOnline();

  if (online) {
    return null;
  }

  return (
    <div className="fixed z-50 bottom-4 right-4 flex gap-2 items-center bg-red-400 py-2 px-4 rounded-lg text-white pointer-events-none">
      <SlashIcon className="h-4 w-4" /> Offline
    </div>
  );
};

export default OfflineBadge;
