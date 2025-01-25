import Button from '../UI/Button.tsx';

export interface WeekTableCellProps {
  data: {
    lunch: boolean;
    breakfast: boolean;
    benefit: boolean;
    active: boolean;
  };
  onClick: (payment: { lunch: boolean; breakfast: boolean }) => void;
}

export default function WeekTableCell({ data, onClick }: WeekTableCellProps) {
  if (!data.active) {
    return <td className="mx-2 w-full h-full"></td>;
  }

  const handleClick = (key: 'lunch' | 'breakfast'): void => {
    if (key === 'breakfast') {
      onClick({
        lunch: data.lunch,
        breakfast: !data.breakfast,
      });
    } else if (key === 'lunch') {
      onClick({
        breakfast: data.breakfast,
        lunch: !data.lunch,
      });
    }
  };

  const checkedBreakfastClass = `w-full my-1 min-h-6 py-1 ${data.benefit ? 'btn-checked-benefit-dish' : 'btn-checked-dish'} block`;

  return (
    <td className="mx-2">
      <Button
        onClick={() => handleClick('breakfast')}
        className={data.breakfast ? `${checkedBreakfastClass}` : 'w-full my-1 min-h-6 py-1 btn-passed-dish block'}
      >
        Breakfast
      </Button>
      <Button
        onClick={() => handleClick('lunch')}
        className={`w-full my-1 min-h-6 py-1 ${data.lunch ? 'btn-checked-dish' : 'btn-passed-dish'} block`}
      >
        Lunch
      </Button>
    </td>
  );
}
