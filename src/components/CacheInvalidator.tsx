import { useQueryClient } from '@tanstack/react-query';

const CacheInvalidator = () => {
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ['games'] });
    queryClient.invalidateQueries({ queryKey: ['dealDetails'] });
  };

  return (
    <div className="m-2">
      <button className="btn btn-outline-warning" onClick={handleClick}>
        Refresh Data
      </button>
    </div>
  );
};

export default CacheInvalidator;
